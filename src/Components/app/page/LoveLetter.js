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
                  // <Link
                  //   to={{
                  //     pathname: `loveletter/${mbti.link}`,
                  //     state: {
                  //       lover: mbti.content,
                  //       user: UserMbti
                  //     },
                  //   }}
                  // >
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
                  // </Link>
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
                  <button
                    style={{ cursor: "pointer", fontSize: "15px" }}
                    onClick={resetData}
                  >
                    다시 선택하기
                  </button>
                </div>
                <div className='ResultContent'>
                  {LoveLetter.LoveKor}
                  <hr style={{ textAlign: "left", margin: "20px 0" }} />
                  {LoveLetter.LoveEng}
                  <div className='iconBox'>
                    <Download />
                  </div>
                </div>
              </div>
              <div className='ResultIcon'>
                <Update />
              </div>
            </>
          )}
        </Box>
      </ServiceLayout>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <div>
          <p>From. {UserMbti}</p>
          <p>For. {LoverMbti}</p>
          <p>위 사항이 맞나요?</p>
          <button onClick={HandleLetter}>Write</button>
        </div>
      </Modal>
    </>
  );
};

export default LoveLetter;

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
