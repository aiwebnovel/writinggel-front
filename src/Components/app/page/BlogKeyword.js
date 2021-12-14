import { Box, Grid, ResponsiveContext } from "grommet";
import { Close, Add, LinkDown, Search } from "grommet-icons";
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
import TagManager from 'react-gtm-module';
import ServiceLayout from "../Layout";
import Loading from "../../Loading";

const BlogKeyword = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isSider, SetSider] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [isOpen, SetOpen] = useState(false);
  const [keyword, SetKeyword] = useState("");
  const [keywordOutput, SetOutput] = useState([]);

  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [CountModal, SetCountModal] = useState(false);

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

  const handleState = (e) => {
    SetKeyword(e.target.value);
  };

  const resetData = () => {
    SetKeyword("");
    SetOutput("");
  };

  const Requestkeywords = async () => {
    if (localStorage.getItem("token") !== null) {
      if (count === 0 && isBill === false) {
        SetCountModal(true);
      } else {
        let blogKeyword = keyword;

        if (blogKeyword === " " || blogKeyword === "") {
          toast.error(`키워드를 입력해 주세요!`);
          return;
        }
        SetLoading(true);
        await axios
          .get(`${configUrl.SERVER_URL}/keyword/${blogKeyword}`, {
            headers: { authentication: localStorage.getItem("token") },
          })
          .then(async (response) => {
            //console.log(response.data.list);
            SetOutput(response.data.list);
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
              localStorage.removeItem("token");
            }

            if (error.response.status === 500) {
              toast.error(
                `적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!`
              );
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

  const SaveContent = async () => {
    console.log(keywordOutput);
    let stringKeyword = String(keywordOutput);

    if (keywordOutput) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: stringKeyword,
          category: "블로그 키워드",
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
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/app/bloger/keyword',
        pageTitle: '블로그 키워드',
      },
    });

  },[])

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: localStorage.getItem("token") },
        })
        .then((res) => {
         
          let count = res.data.membership_count;
          SetCount(count);
          SetBill(res.data.isBill);
        });
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
                <OuterClick
                  onOuterClick={() => {
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
                  onOuterClick={() => {
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
              gridArea='main'
              justify='center'
              align='center'
              className='KeywordMainBox'
            >
              <BoxKeyword fill align='center' className='BlogWrap'>
                <div className='KeyContainer'>
                  <div className='keywordHeader'>
                    <Close className='close' onClick={resetData} />
                    <LinkDown className='download' onClick={SaveContent} />
                    <span style={{ fontWeight: "600" }}>블로그 키워드</span>
                  </div>

                  <div className='keywordDiv'>
                    <input
                      type='text'
                      name='keyword'
                      placeholder='블로그에 필요한 키워드를 입력해주세요!'
                      value={keyword}
                      onChange={(e) => handleState(e)}
                      className='keywordInput'
                    />
                    <button
                      type='submit'
                      className='KeywordButtonStyle'
                      onClick={Requestkeywords}
                    >
                      <Search />
                    </button>
                  </div>

                  <div className='resultBox'>
                    {keywordOutput && (
                      <Grid
                        columns={
                          size !== "small"
                            ? { count: 5, size: "auto" }
                            : { count: 3, size: "auto" }
                        }
                        gap='small'
                      >
                        {keywordOutput.map((data, i) => {
                          return (
                            <button
                              className='keywordResult'
                              key={`key${i}`}
                              value={data}
                            >
                              {data}
                            </button>
                          );
                        })}
                      </Grid>
                    )}
                  </div>
                </div>
              </BoxKeyword>
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

export default BlogKeyword;

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

const BoxKeyword = styled(Box)`
  justify-content: center;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`;
