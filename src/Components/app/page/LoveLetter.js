import { Box, Grid, ResponsiveContext } from "grommet";
import { Download, Update } from "grommet-icons";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MBTI from "./MBTI";

import Modal from "../../Modal";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Loading from "../../Loading";
import * as configUrl from "../../../config";

const LoveLetter = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [UserMbti, SetUser] = useState("");
  const [LoverMbti, SetLover] = useState("");
  const [LoveLetter, SetLetter] = useState({
    LoveKor: "",
    LoveEng: "",
  });
  const [isLoading, SetLoading] = useState(false);
  const [isOpen, SetOpen] = useState(false);
  const [isResult, SetResult] = useState(false);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const HandleUserMbti = (user) => {
    if (user) {
      SetUser(user);
      console.log("user", user);
    } else {
      console.log("MBTI를 선택해주세요!");
    }
  };

  const HandleLoverMbti = (lover) => {
    if (lover) {
      SetLover(lover);
      console.log("lover", lover);
      SetOpen(true);
    } else {
      console.log("유저를 선택해주세요!");
    }
  };

  const HandleLetter = async () => {
    SetOpen(false);
    SetLoading(true);
    if (UserMbti && LoverMbti) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/mbti`,
        headers: { authentication: localStorage.getItem("token") },
        data: { from: UserMbti, to: LoverMbti },
      };

      await axios(config)
        .then(async (response) => {
          console.log("res", response.data);
          SetLetter({
            ...LoveLetter,
            LoveKor: response.data[0],
            LoveEng: response.data[1],
          });
          SetResult(true);
          SetLoading(false);
        })
        .catch(async (error) => {
          console.log(error);
          SetLoading(false);
        });
    } else {
      toast.error("mbti를 선택해주세요!");
      SetLoading(false);
    }
  };

  const SaveContent = async() => {
    
    if(LoveLetter){
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: LoveLetter.LoveKor,
          category:'MBTI 연애편지',
        }
      };

      await axios(config)
        .then(async (response) => {
         
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);
          if(error.response.status === 403) {
            toast.error('보관함이 꽉 찼습니다!');
          }

          if (error.response.status === 500) {
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
      }else {
        toast.info('저장할 결과가 없습니다!');  
      }


  }

  const resetData = () => {
    SetResult(false);
    SetUser("");
    SetLover("");
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

  useEffect(() => {}, [UserMbti, LoverMbti]);

  return (
    <>
      <ServiceLayout>
        {isLoading && <Loading />}

        <Box
          justify='center'
          align='center'
          className='MbtiContainerVh'
          background='#f9f9f9'
          gap='medium'
        >
          {!UserMbti && !isResult && (
            <>
              <MainTitle>🌟 당신의 MBTI를 선택해주세요.</MainTitle>
              <Grid
                columns={size !== "small" ? { count: 4, size: "auto" } : "100%"}
                gap='medium'
                fill={size !== "small" ? false : true}
              >
                {MBTI.map((mbti) => (
                  <Card
                    key={`user${mbti.content}`}
                    className='MbtiCard1'
                    onClick={() => {
                      let user = mbti.content;
                      HandleUserMbti(user);
                    }}
                  >
                    {mbti.content}
                  </Card>
                ))}
              </Grid>
            </>
          )}
          {UserMbti && !isResult && (
            <>
              <MainTitle>
                💌 연애편지를 받을 사람의 MBTI를 선택하세요.
              </MainTitle>
              <Grid
                columns={size !== "small" ? { count: 4, size: "auto" } : "100%"}
                gap='medium'
                fill={size !== "small" ? false : true}
              >
                {MBTI.map((mbti) => (
                  <Card
                    key={mbti.content}
                    className='MbtiCard2'
                    onClick={() => {
                      let lover = mbti.content;
                      HandleLoverMbti(lover);
                    }}
                  >
                    {mbti.content}
                  </Card>
                ))}
              </Grid>
            </>
          )}
          {LoveLetter.LoveKor && isResult && (
            <>
              <div className='ResultBox'>
                <div className='ResultHeader'>
                  <div>
                    Love Letter from <span>{UserMbti}</span> for{" "}
                    <span>{LoverMbti}</span>
                  </div>
                  <ReChoice
                    onClick={resetData}
                  >
                    다시 선택하기
                  </ReChoice>
                </div>
                <div className='ResultContent'>
                  {LoveLetter.LoveKor}
                  <hr style={{ textAlign: "left", margin: "20px 0" }} />
                  {LoveLetter.LoveEng}
                  <div className='iconBox'>
                  <Update onClick={HandleLetter}/> <Download onClick={SaveContent}/>
                  </div>
                </div>
              </div>
            </>
          )}
        </Box>
      </ServiceLayout>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <LetterSure>
          <img src='/love-letter.png' alt='하트' style={{ width: "80px" }} />
          <div className='textZone'>
            <div className='fromTo'>
              <p>From. <span>{UserMbti}</span></p>
              <p>For. <span>{LoverMbti}</span></p>
            </div>
            <div className='checkAbtn'>
              <p>위 사항이 맞나요?</p>
              <div>
                <button className='cancel' onClick={resetData}>취소</button>
                <button className='make' onClick={HandleLetter}>만들기</button>
              </div>
            </div>
          </div>
        </LetterSure>
      </Modal>
    </>
  );
};

export default LoveLetter;

const LetterSure = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .textZone {
    width: 100%;
  }

  .fromTo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    > p {
      >span {
        font-weight: 600;
      }
    }
  }

  .checkAbtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom : 15px;
    gap: 15px;

    > p {
      font-size: 15px;
      text-decoration: underline;
      
    }

    > div {

      
      .cancel {
        background-color : #f45752;
        border: 1px solid #f45752;
        outline: 0;
        padding: 5px 13px;
        border-radius: 5px;
        font-size: 13px;
        cursor: pointer;
        color: #fff;

        &:hover {
          background-color : #FF005A;
          border: 1px solid #FF005A;
        }
      }
    
      .make {
        background-color: #ffce1f;
        border: 1px solid #ffce1f;
        outline: 0;
        padding: 5px 13px;
        border-radius: 5px;
        font-size: 13px;
        margin-left: 10px;
        cursor: pointer;

        &:hover {
          background-color : #ff9300;
          border: 1px solid #ff9300;
        }
    }
  
  }
`;

const ReChoice = styled.button`
    cursor: pointer; 
    font-size: 15px;
    text-decoration: underline;
    background: transparent;
    outline:0;
    border:0;
`

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  padding: 30px 0;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #444;
  width: 200px;
  padding: 48px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
