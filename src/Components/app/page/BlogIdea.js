import { Box, Grid, ResponsiveContext } from "grommet";
import { Copy, Close, Add, Download } from "grommet-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import * as configUrl from "../../../config";
import { OuterClick } from "react-outer-click";
import ScrollToTop from "../../../routes/ScrollToTop";
import Modal from "../../SmallModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import TagManager from 'react-gtm-module';


const BlogIdea = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isSider, SetSider] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [isOpen, SetOpen] = useState(false);
  const [Copied, SetCopy] = useState(false);
  const [input, SetInput] = useState("");

  const [output, SetOutput] = useState({
    outputKorean: "",
    outputEnglish: "",
  });

  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [CountModal, SetCountModal] = useState(false);

  const { outputKorean, outputEnglish } = output;

  const HandleSmallModals = () => {
    SetCountModal(!CountModal);
  };

  const handleSider = () => {
    SetOpen(false);
    SetSider(!isSider);
  };

  const handleOpen = () => {
    SetSider(false);
    SetOpen(!isOpen);
  };

  const onCopied = () => {
    if (outputKorean === "") {
      toast.warn("복사할 내용이 없어요!😭");
    } else {
      SetCopy(true);
      toast.success("Copied!");
    }
  };

  const SaveContent = async () => {
    //console.log(outputKorean);
    if (outputKorean) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: sessionStorage.getItem("token") },
        data: {
          story: outputKorean,
          category: "블로그 아이디어",
        },
      };

      await axios(config)
        .then(async (response) => {
          //console.log('성공?', response.data)
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("보관함이 꽉 찼습니다!");
          }
          if (error.response.status === 500) {
            toast.error("새로고침 혹은 다시 로그인 해주세요! 같은 메세지가 반복될 시 메일로 문의해주세요!");
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
    if (sessionStorage.getItem("token") !== null) {
      if (count === 0 && isBill === false) {
        SetCountModal(true);
      } else {
        let story = input;

        const date = new Date();
        let time = sessionStorage.getItem("time");

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
        sessionStorage.setItem("time", date);

        if (story === " " || story === "") {
          toast.warn(`키워드를 입력해 주세요!`);
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
              headers: { authentication: sessionStorage.getItem("token") },
            }
          )
          .then(async (response) => {
            //console.log(response.data);
            let resK = [];
            let resE = [];

            for (let i = 0; i < response.data.length; i++) {
              await resK.push(response.data[i][0]);
              await resE.push(response.data[i][1]);

              if (response.data[0][0] === "") {
                toast.error(
                  "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
                );
              } else {
                SetOutput({
                  ...output,
                  outputKorean: resK,
                  outputEnglish: resE,
                });
              }

              if (response.data[2] >= 2) {
                toast.error(`결과물에 유해한 내용이 들어가 버렸어요. 😭 `);
              }
            }
          })
          .catch((error) => {
            //console.log(error);
            if (error.response.status === 403) {
              toast.info(
                "무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!",
                {
                  icon: "⚠️",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                }
              );
            }
            if (error.response.status === 412) {
              toast.info(`🙅‍♀️ 로그인이 필요합니다!`, {
                style: { backgroundColor: "#fff", color: "#000" },
                progressStyle: { backgroundColor: "#7D4CDB" },
              });
              sessionStorage.removeItem("token");
            }
            if (error.response.status === 429) {
              toast.error("요청이 너무 많습니다! 잠시 후에 다시 시도해주세요!");
            }
            if (error.response.status === 500) {
              toast.error("새로고침 혹은 다시 로그인 해주세요! 같은 메세지가 반복될 시 메일로 문의해주세요!");
            }
          })
          .finally(() => {
            SetLoading(false);
          });
      }
    } else {
      toast.info(`🙅‍♀️ 로그인이 필요합니다!`, {
        style: { backgroundColor: "#fff", color: "#000" },
        progressStyle: { backgroundColor: "#7D4CDB" },
      });
    }
  };

  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/app/bloger/idea',
        pageTitle: '블로그 아이디어',
      },
    });

  },[])


  useEffect(() => {
    const loginCheck = sessionStorage.getItem("token");
    const provider = sessionStorage.getItem('provider');

    if (loginCheck !== null) {
      // if(provider === 'google.com' || provider === 'facebook.com'){
        axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: sessionStorage.getItem("token") },
        })
        .then((res) => {
         // console.log(res)
          let count = res.data.membership_count;
          SetCount(count);
          SetBill(res.data.isBill);
        });
      //}


    } else {
      History.push("/service/bloger");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <>
      <ServiceLayout>
        <ScrollToTop />
        {isLoading && <Loading />}
        <Box
          className='ServiceContainer'
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
                <OuterClick
                  onOuterClick={(event) => {
                    //event.preventDefault();
                    //console.log("Clicked outside");
                    SetSider(false);
                  }}
                >
                  <div className='CloseSiderBtn' onClick={handleSider}>
                    <Close />
                  </div>
                  <Box align='center' gap='large'>
                    <div className='SiderBox'>
                      <MenuItem to='/app/bloger/idea'>블로그 아이디어</MenuItem>
                      <MenuItem to='/app/bloger/name'>블로그 개요</MenuItem>
                      <MenuItem to='/app/bloger/title'>블로그 제목</MenuItem>
                      <MenuItem to='/app/bloger/intro'>블로그 도입부</MenuItem>
                      <MenuItem to='/app/bloger/keyword'>
                        블로그 키워드
                      </MenuItem>
                      <MenuItem to='/app/bloger/follow'>
                        블로그 이어쓰기
                      </MenuItem>
                    </div>
                  </Box>
                </OuterClick>
              </Box>
            ) : (
              <Box gridArea='sidebar' className='isSiderFalse'>
                <div className='SiderBtn' onClick={handleSider}>
                  <Add size='small' />
                  <span>열기</span>
                </div>
                <div className='OpenBtn' onClick={handleOpen}>
                  <span>📌 필독</span>
                </div>
              </Box>
            )}

            {isOpen && (
              <Box
                gridArea='sidebar'
                className='sideContainer'
                gap={size !== "small" && "medium"}
              >
                <OuterClick
                  onOuterClick={(event) => {
                    //event.preventDefault();
                    //console.log("Clicked outside");
                    SetOpen(false);
                  }}
                >
                  <div className='CloseSiderBtn' onClick={handleOpen}>
                    <Close />
                  </div>
                  <Box className='guide-Accordion'>
                    <div className='guide-PanelHeader'>Q. How to Use?</div>

                    <div className='guide-PanelContent '>
                      <h4>💫 팅젤이와 함께 글 쓰는 TING!</h4>
                      <div>
                        <img src='/tinggle.png' alt='tingting' />
                        <div>
                          <p>1. 원하는 키워드나 글을 입력해주세요!</p>
                          <p style={{ color: "gray" }}>
                            ❗️ +열기 버튼이 있는 경우는 눌러서 빈 칸을
                            채워주세요!(블로그 제외)
                          </p>
                          <p>
                            2. write 버튼을 누르면 팅젤이가 여러분의 글 위에
                            아이디어💡를 얹어줄거에요!
                          </p>
                          <p>3. 팅젤이가 얹어준 아이디어를 활용해봐요!</p>
                        </div>
                      </div>
                    </div>
                  </Box>
                </OuterClick>
              </Box>
            )}

            <Box
              fill
              gridArea='main'
              justify='center'
              align='center'
              className='blogMainBox'
            >
              <Box fill align='center' className='BlogWrap'>
                <h3 style={{ fontWeight: "600" }}>블로그 아이디어</h3>
                <div className='BlogIdeaBox'>
                  <input
                    type='text'
                    name='idea'
                    placeholder='블로그 키워드를 하나 입력해주세요! ex) 글쓰기 방법'
                    value={input}
                    onChange={(e) => handleChange(e)}
                  />
                  <button onClick={requestcontents}>Write</button>
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
            </Box>
          </Grid>
        </Box>
      </ServiceLayout>
      <Modal
        onClick={HandleSmallModals}
        open={CountModal}
        close={HandleSmallModals}
      >
        <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleSmallModals}>취소</button>
          <Link to='/signIn'>
            <button>멤버십 가입하기</button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default BlogIdea;

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
