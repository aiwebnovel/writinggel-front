import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../../../routes/ScrollToTop";
import Modal from "../../SmallModal";

import { Box, ResponsiveContext } from "grommet";
import { Download, Cycle } from "grommet-icons";

import * as configUrl from "../../../config";
import TagManager from 'react-gtm-module';
import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import styled from "styled-components";
import axios from "axios";

const Firstsentence = () => {
  //const size = useContext(ResponsiveContext);
  const History = useHistory();
  const [isOutput, SetOutput] = useState(false);
  const [OutputContent, SetOutputContent] = useState({
    KorOutput: "",
    EngOutput: "",
  });
  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [isLoading, SetLoading] = useState(false);
  const { KorOutput, EngOutput } = OutputContent;
  const [isOpen, SetOpen] = useState(false);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const FirstsentenceAxios = async () => {
    if (count === 0 && isBill === false) {
      SetOpen(true);
    } else {
      SetLoading(true);
      if (OutputContent !== "") {
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/writinggel/firstsentence`,
          headers: { authentication: sessionStorage.getItem("token") },
        };

        await axios(config)
          .then(async (response) => {
            //  console.log(response.data);
            //  console.log(response.data[0].split('\n\n'));

            if (response.data[0] === "") {
              toast.error(
                "결과물에 유해한 내용이 들어가 버렸어요.😭 재시도 해주세요!"
              );
            } else {
              let splitKor = response.data[0].split("\n\n");
              let splitEng = response.data[1].split("\n\n");
              //console.log(splitKor, splitEng);
              if (splitKor[0] === splitKor[1]) {
                await SetOutputContent({
                  ...OutputContent,
                  KorOutput: splitKor[0],
                  EngOutput: splitEng[1],
                });
                SetOutput(true);
              } else {
                SetOutputContent({
                  ...OutputContent,
                  KorOutput: response.data[0],
                  EngOutput: response.data[1],
                });
                SetOutput(true);
              }
            }
          })
          .catch(async (error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.info(
                "무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!",
                {
                  icon: "⚠️",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                }
              );
            }
          })
          .finally(() => {
            SetLoading(false);
          });
      } else {
        toast.info("결과가 나오지 않았습니다. 버튼을 한 번 더 눌러주세요!");
      }
    }
  };

  const SaveContent = async () => {
    if (OutputContent) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: sessionStorage.getItem("token") },
        data: {
          story: KorOutput,
          category: "첫문장 자판기",
        },
      };

      await axios(config)
        .then(async (response) => {
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
        pagePath: '/app/firstsentence',
        pageTitle: '첫문장 자판기',
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
     // }

      // if(provider === 'kakao' || provider === 'password') {
      //   axios
      //   .get(`${configUrl.SERVER_URL}/profile`, {
      //     headers: { authentication: sessionStorage.getItem("token") },
      //   })
      //   .then((res) => {
      //    // console.log(res)
      //     let count = res.data.membership_count;
      //     SetCount(count);
      //     SetBill(res.data.isBill);
      //   });
      // }
    } else {
      History.push("/service/firstsentence");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <>
      <ServiceLayout>
        <ScrollToTop />
        {isLoading && <Loading />}
        <Box
          className='FirstContainer'
          // justify={size !== 'small' ? 'center':'start'}
          justify='start'
          align='center'
          background='#f9f9f9'
        >
          <Box align='center' className='FirstBox'>
            <RandomBtn
              onClick={() => {
                FirstsentenceAxios();
              }}
              style={{ cursor: "pointer" }}
            >
              랜덤 첫 문장 뽑기 💬
            </RandomBtn>
            <Box className='printBox'>
              {isOutput && (
                <Box
                  className='SentenceBox'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p style={{ marginBottom: "10px" }}>
                    {KorOutput && KorOutput}
                  </p>
                  <hr />
                  <p style={{ marginTop: "10px" }}>{EngOutput && EngOutput}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Cycle
                      onClick={FirstsentenceAxios}
                      style={{ marginRight: "15px" }}
                    />
                    <Download onClick={SaveContent} />
                  </div>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ServiceLayout>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleModals}>취소</button>
          <Link to='/signIn'><button>멤버십 가입하기</button></Link>
        </div>
        
      </Modal>
    </>
  );
};

export default Firstsentence;

const RandomBtn = styled.button`
  border: 1px solid #3b2477;
  font-weight: 600;
  // background-color : #fff;
  background-color: #ffd000;
  padding: 8px 15px;
  width: 500px;
  font-size: 1rem;
  color: #444;
  
  @media screen and (max-width: 680px) {
    width: 80%;
  }
`;
