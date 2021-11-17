import { Box, Grid, ResponsiveContext } from "grommet";
import { Copy, Close, Add, Download, FormDown } from "grommet-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import * as configUrl from "../../../config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import ServiceLayout from "../Layout";
import Loading from "../../Loading";

const BlogIdea = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isSider, SetSider] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [isOpen, SetOpen] = useState(true);
  const [Copied, SetCopy] = useState(false);
  const [input, SetInput] = useState("");

  const [output, SetOutput] = useState({
    outputKorean: "",
    outputEnglish: "",
  });

  const { outputKorean, outputEnglish } = output;

  const handleSider = () => {
    SetSider(!isSider);
  };

  const HandleToggle = () => {
    SetOpen(!isOpen);
  }

  const onCopied = () => {
    if (outputKorean === "") {
      toast.warn("복사할 내용이 없어요!😭");
    } else {
      SetCopy(true);
      toast.success("Copied!");
    }
  };

  const SaveContent = async () => {
    console.log(outputKorean);
    if (outputKorean) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: outputKorean,
          category: "블로그 글쓰기",
        },
      };

      await axios(config)
        .then(async (response) => {
          //console.log('성공?', response.data)
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);

          if (error.response.status === 500) {
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  const handleChange = (e) => {
    SetInput(e.target.value);
  };

  const requestcontents = async () => {
    if (localStorage.getItem("token") !== null) {
      let story = input;

      const date = new Date();
      let time = localStorage.getItem("time");

      if (time !== undefined && time !== null && time !== "") {
        const timeD = -(Date.parse(time) - date.getTime());
        //console.log(timeD);
        if (timeD < 6500) {
          toast.error(
            `${7 - Math.ceil(timeD / 1000)}초 이후에 다시 시도해 주세요`
          );
          return;
        }
      }
      localStorage.setItem("time", date);

      if (story === " " || story === "") {
        toast.error(`키워드를 입력해 주세요!`);
        return;
      }
      SetLoading(true);
      await axios
        .post(
          `${configUrl.SERVER_URL}/blog/idea`,
          {
            story: story,
          },
          {
            headers: { authentication: localStorage.getItem("token") },
          }
        )
        .then(async (response) => {
          let resK = [];
          let resE = [];

          if (response.data[2] >= 2) {
            toast.error(
              `결과물에 유해한 내용이 포함되어 있어서 표시할 수 없습니다. 입력하신 내용을 수정해서 다시 입력해보세요!`
            );
          }
          for (let i = 0; i < response.data.length; i++) {
            await resK.push(response.data[i][0]);
            await resE.push(response.data[i][1]);
          }

          SetOutput({
            ...output,
            outputKorean: resK,
            outputEnglish: resE,
          });
          console.log(output);
          SetLoading(false);
        })
        .catch((error) => {
          //console.log(error);
          if (error.response.status === 412) {
            this.setState({ loading: false });
            toast.info(`🙅‍♀️ 로그인이 필요합니다!`, {
              style: { backgroundColor: "#fff", color: "#000" },
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
            localStorage.removeItem("token");
          } else {
            if (error.response.status === 403) {
              this.setState({ loading: false });
              toast.error(`토큰이 부족합니다!`);
            }
          }
        });
    } else {
      toast.info(`🙅‍♀️ 로그인이 필요합니다!`, {
        style: { backgroundColor: "#fff", color: "#000" },
        progressStyle: { backgroundColor: "#7D4CDB" },
      });
    }
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <ServiceLayout>
      {isLoading && <Loading />}
      <Box
        className='ServiceContainerVh'
        justify='center'
        align='center'
        background='#f9f9f9'
      >
        <Grid
          fill
          rows={size !== "small" ? ["auto", "flex"] : ["auto", "auto"]}
          columns={size !== "small" ? ["auto", "flex"] : ["auto"]}
          areas={
            size !== "small"
              ? [
                  { name: "sidebar", start: [0, 0], end: [0, 1] },
                  { name: "main", start: [1, 0], end: [1, 1] },
                ]
              : [
                  { name: "sidebar", start: [0, 0], end: [0, 0] },
                  { name: "main", start: [0, 1], end: [0, 1] },
                ]
          }
        >
          {isSider ? (
            <Box gridArea='sidebar' className='sideContainer' gap='medium'>
              <SiderBtn onClick={handleSider}>
                <Close />
              </SiderBtn>
              <Box align='center' gap='large'>
                <div className='SiderBox'>
                  <MenuItem to='/app/bloger/idea'>블로그 아이디어</MenuItem>
                  <MenuItem to='/app/bloger/name'>블로그 개요</MenuItem>
                  <MenuItem to='/app/bloger/title'>블로그 제목</MenuItem>
                  <MenuItem to='/app/bloger/intro'>블로그 도입부</MenuItem>
                  <MenuItem to='/app/bloger/keyword'>블로그 키워드</MenuItem>
                  <MenuItem to='/app/bloger/follow'>블로그 이어쓰기</MenuItem>
                </div>
              </Box>
            </Box>
          ) : (
            <Box gridArea='sidebar' className='isSiderFalse' gap='medium'>
              <SiderBtn onClick={handleSider}>
                <Add size='small' />
                <span>열기</span>
              </SiderBtn>
            </Box>
          )}

          <Box gridArea='main' justify='center' align='center' className='mainBox'>
            <div className="guide-Accordion">
              <div className="guide-PanelHeader" onClick={HandleToggle}>💫 팅젤이와 함께 글 쓰는 TING! (필독) <FormDown/></div>
              {isOpen ? (<div className='guide-PanelContent'>
                <p> 계정 삭제 시, 멤버십 가입 내역도 삭제됩니다. 멤버십에
                    가입하여 서비스를 이용하는 중에 계정 삭제(탈퇴)를 하면 더
                    이상 이용이 불가합니다. 신중한 결정 부탁드립니다.
                </p>
              </div>):(<div className='guide-PanelContent'><p>설명을 다시 보고 싶다면 클릭해주세요!</p></div>)}
              
            </div>
          {/* <Accordion className='guide-Accordion' multiple>
              <AccordionPanel
                label='💫 팅젤이와 함께 글 쓰는 TING! (필독)'
                className='guide-AccoPanel'
              >
                <div className='guide-PanelContent'>
                  <p>
                    1. 
                  </p>

                  <p>
                    계정 삭제 시, 멤버십 가입 내역도 삭제됩니다. 멤버십에
                    가입하여 서비스를 이용하는 중에 계정 삭제(탈퇴)를 하면 더
                    이상 이용이 불가합니다. 신중한 결정 부탁드립니다.
                  </p>
                </div>
              </AccordionPanel>
            </Accordion> */}
        
            <div className="BlogIdeaBox">
                <input
                  type='text'
                  name='idea'
                  placeholder='블로그 키워드를 하나 입력해주세요! ex) 글쓰기 방법'
                  value={input}
                  onChange={(e) => handleChange(e)}
                />
                <button onClick={requestcontents}>
                  Write
                </button>
            </div>
            <div className='mainOutputBox'>
              <div className='blogOutputKo'>{outputKorean[0]}</div>
              <div className='blogOutputEn'>{outputEnglish[0]}</div>
            </div>
         
            <Icons>
              <CopyToClipboard text={outputKorean[0]} onCopy={onCopied}>
                <Copy style={{ cursor: "pointer" }} />
              </CopyToClipboard>
              <Download onClick={SaveContent} />
            </Icons>
          </Box>
        </Grid>
      </Box>
    </ServiceLayout>
  );
};

export default BlogIdea;

const SiderBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 10px;
  cursor: pointer;
  color: #444;
  font-size: 13x;
  font-weight: 600;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 10px;
  cursor: pointer;
  font-size: 17px;
  transition: all 200ms ease-in-out;

  &:hover,
  &:focus {
    background-color: #f9f9f9;
    font-weight: 600;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    
}
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  > svg {
    background-color: #444;
    fill: #fff;
    stroke: #fff;
    padding: 2px;
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
