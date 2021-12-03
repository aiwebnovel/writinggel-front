import { Box, ResponsiveContext } from "grommet";
//import { Download, Save, Update } from "grommet-icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../../../routes/ScrollToTop";

import axios from "axios";
import ServiceLayout from "../Layout";
import Loading from "../../Loading";
//import styled from "styled-components";
import * as configUrl from "../../../config";

const Storysrc = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [isOutput, SetOutput] = useState(false);
  const [isResult, SetResult] = useState(false);

  const [contentsKor, SetContentsKor] = useState({
    storyKor: "",
    firstKor: "",
    secondKor: "",
    thirdKor: "",
    contentKor: "",
  });

  const [contentsEng, SetContentsEng] = useState({
    storyEng: "",
    firstEng: "",
    secondEng: "",
    thirdEng: "",
    contentEng: "",
  });

  const { storyKor, firstKor, secondKor, thirdKor, contentKor } = contentsKor;
  const { storyEng, firstEng, secondEng, thirdEng, contentEng } = contentsEng;

  const SaveContent = async () => {
    if (storyKor) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: contentKor,
          category: "이야기 재료",
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

  const StoryAxios = async () => {
    SetLoading(true);
    const config = {
      method: "post",
      url: `${configUrl.SERVER_URL}/writinggel/storysrc`,
      headers: { authentication: localStorage.getItem("token") },
    };

    await axios(config)
      .then(async (res) => {
        //console.log(res.data);

        let Kor = res.data.kr;
        let Eng = res.data.en;
        let checkContent = Kor.hasOwnProperty("content");

        //console.log(Kor);
        //console.log(Eng);
        // console.log(checkContent);

        if (Kor.first === "" || Kor.second === "" || Kor.third === "") {
          toast.error(
            "결과물에 유해한 내용이 들어가 버렸어요.😭 재시도 해주세요!"
          );
        } else {
          //content가 없으면, third에 붙어나오는 거 감지 후 처리
          if (checkContent === false) {
            let splitKor = Kor.third.split("\n");
            let splitEng = Eng.third.split("\n");
            //console.log(splitKor, splitEng);

            if (splitKor.length > 2) {
              let ShiftKor = splitKor.shift();
              let ShiftEng = splitEng.shift();
              let AfterShiftJoin = splitKor.join(" ");
              let AfterShiftJoinEng = splitEng.join(" ");

              //console.log(ShiftKor, AfterShiftJoin);
              //console.log(ShiftEng, AfterShiftJoinEng);

              await SetContentsKor({
                ...contentsKor,
                storyKor: Kor,
                firstKor: Kor.first,
                secondKor: Kor.second,
                thirdKor: ShiftKor,
                contentKor: AfterShiftJoin,
              });
              await SetContentsEng({
                ...contentEng,
                storyEng: Eng,
                firstEng: Eng.first,
                secondEng: Eng.second,
                thirdEng: ShiftEng,
                contentEng: AfterShiftJoinEng,
              });
              SetOutput(true);
            } else {
              //console.log("length <=2");
              await SetContentsKor({
                ...contentsKor,
                storyKor: Kor,
                firstKor: Kor.first,
                secondKor: Kor.second,
                thirdKor: splitKor[0],
                contentKor: splitKor[1],
              });
              await SetContentsEng({
                ...contentEng,
                storyEng: Eng,
                firstEng: Eng.first,
                secondEng: Eng.second,
                thirdEng: splitEng[0],
                contentEng: splitEng[1],
              });
              SetOutput(true);
            }
          } else {
            console.log(Kor.third);
            console.log(Kor.third.indexOf("\n"));
            let indexCheck = Kor.third.indexOf("\n");

            if (indexCheck !== -1) {
              let SplitThird = Kor.third.split("\n");
              let SplitThirdEng = Eng.third.split("\n");

              console.log(SplitThird, SplitThirdEng);
              console.log(SplitThird[0], SplitThird[1], SplitThirdEng[0], SplitThirdEng[1]);

              let AfterAdd = SplitThird[1] + Kor.content;
              let AfterAddEng = SplitThirdEng[1] + Eng.content;

              // let ThirdKor = SplitThird.shift();
              // let ThirdEng = SplitThirdEng.shift();

              // console.log(SplitThird, ThirdKor);
              // console.log(SplitThirdEng, ThirdEng);

              // let AfterAdd = SplitThird[0] + Kor.content;
              // let AfterAddEng = SplitThirdEng[0] + Eng.content;

              console.log(AfterAdd, AfterAddEng);

              SetContentsKor({
                ...contentsKor,
                storyKor: Kor,
                firstKor: Kor.first,
                secondKor: Kor.second,
                thirdKor: SplitThird[0],
                contentKor: AfterAdd,
              });
              SetContentsEng({
                ...contentEng,
                storyEng: Eng,
                firstEng: Eng.first,
                secondEng: Eng.second,
                thirdEng: SplitThirdEng[0],
                contentEng: AfterAddEng,
              });
              SetOutput(true);
            } else {
              await SetContentsKor({
                ...contentsKor,
                storyKor: Kor,
                firstKor: Kor.first,
                secondKor: Kor.second,
                thirdKor: Kor.third,
                contentKor: Kor.content,
              });
              await SetContentsEng({
                ...contentEng,
                storyEng: Eng,
                firstEng: Eng.first,
                secondEng: Eng.second,
                thirdEng: Eng.third,
                contentEng: Eng.content,
              });
              SetOutput(true);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          toast.info(
            "무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!",
            {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            }
          );
        }
        if (err.response.status === 429) {
          toast.error("요청이 너무 많습니다!");
        }
        if (err.response.status === 412) {
          toast.error("새로고침 혹은 다시 로그인 해주세요!");
        }
      })
      .finally(() => {
        SetLoading(false);
      });
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/service/storysrc");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <ServiceLayout>
      <ScrollToTop />
      {isLoading && <Loading />}
      <Box
        className='StoryContainerVh'
        background='#f9f9f9'
        justify='center'
        align='center'
        //gap='large'
      >
        {/* 단어 뽑기 */}
        <Box
          className='SrcPrintBtn'
          direction={size !== "small" ? "row" : "column"}
          align={size !== "small" ? "start" : "center"}
          justify={size !== "small" ? "center" : "start"}
          gap='large'
        >
          <button onClick={StoryAxios}>이야기 재료로 쓸 단어 뽑기</button>
          <Box
            direction={size !== "small" ? "row" : "column"}
            className='PrintContainer'
          >
            <Box className='SrcPrintBox'>
              {isOutput && (
                <Box
                  className='SrcSentence'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p>{firstKor}</p>
                  <hr />
                  <p>{firstEng}</p>
                </Box>
              )}
            </Box>
            <Box className='SrcPrintBox'>
              {isOutput && (
                <Box
                  className='SrcSentence'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p>{secondKor}</p>
                  <hr />
                  <p>{secondEng}</p>
                </Box>
              )}
            </Box>
            <Box className='SrcPrintBox'>
              {isOutput && (
                <Box
                  className='SrcSentence'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p>{thirdKor}</p>
                  <hr />
                  <p>{thirdEng}</p>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* 예시 */}
        <div className='SrcResult'>
          <Box direction='row'>
            <p>이 단어들을 활용해 어떤 이야기를 쓸 수 있을까요?</p>
            <button onClick={SaveContent}>저장하기</button>
          </Box>
          {isOutput && (
            <Box
              className='StoryResults'
              animation={{ type: "fadeIn", duration: 400, size: "large" }}
            >
              &gt;
              <br />
              {contentKor}
              <hr style={{ width: "100%", borderColor: "#ededed" }} />
              {contentEng}
            </Box>
          )}
        </div>
      </Box>
    </ServiceLayout>
  );
};

export default Storysrc;
