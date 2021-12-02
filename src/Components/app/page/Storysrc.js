import { Box, ResponsiveContext } from "grommet";
//import { Download, Save, Update } from "grommet-icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [words, SetWords] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
  ]);
  const [story, SetStory] = useState({
    storyKor:'',
    storyEng:''
  });

  const { storyKor, storyEng} = story;

  const SaveContent = async () => {
    console.log(story, storyKor, storyEng);
    if (storyKor) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: storyKor,
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

          if(error.response.status === 403) {
            toast.error('보관함이 꽉 찼습니다!');
          }

          if (error.response.status === 500) {
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };


  const StorysrcAxios = async () => {
    SetWords([
      ["", ""],
      ["", ""],
      ["", ""],
    ]);
    SetLoading(true);
    
    const config = {
      method: "post",
      url: `${configUrl.SERVER_URL}/writinggel/pickwords`,
      headers: { authentication: localStorage.getItem("token") },
    };

    await axios(config)
      .then(async (response) => {
        console.log(response.data);
        if(response.data[0] === ''){
          toast.error('결과물에 유해한 내용이 들어가 버렸어요.😭 재시도 해주세요!');
      }else { 
        SetOutput(true);
        SetWords([
        [response.data["wordsT"][0], response.data["words"][0]],
        [response.data["wordsT"][1], response.data["words"][1]],
        [response.data["wordsT"][2], response.data["words"][2]],
      ]);
    }   
      })
      .catch(async (error) => {
        console.log(error);
        if (error.response.status === 429) {
          toast.error("요청이 너무 많습니다!");
        }
      }).finally(()=>{
        SetLoading(false);
      });
  };

  const StoryAxios = async () => {


    // if (!isResult) {
 
      if (words[0][1] !== "" && words[1][1] !== "" && words[2][1] !== "") {
        SetLoading(true);
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/writinggel/sentence`,
          headers: { authentication: localStorage.getItem("token") },
          data: { words: [words[0][1], words[1][1], words[2][1]] },
        };

        await axios(config)
          .then(async (response) => {
            console.log(response.data);
            if(response.data[0] === ''){
              toast.error('결과물에 유해한 내용이 들어가 버렸어요.😭 재시도 해주세요!');
              SetLoading(false);
          }else {
            SetResult(true);
            SetStory({...story, 
              storyKor: response.data[0],
              storyEng: response.data[1]
            });
            SetLoading(false);
          }
           
          })
          .catch(async (error) => {
            console.log(error);
            SetLoading(false)
            if (error.response.status === 429) {
              toast.error("요청이 너무 많습니다!");
            }
          }).finally(()=>{
            SetLoading(false);
          });
      } else {
        setTimeout(toast.info("단어를 뽑아주세요!"), 300);
        SetLoading(false);
      }
    //}
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
          align={size !=='small' ? 'start': 'center'}
          justify={size !=='small' ? 'center': 'start'}
          gap='large'
        >
          <button
            onClick={
             StorysrcAxios}
          >
            이야기 재료로 쓸 단어 뽑기
          </button>
          <Box direction={size !== "small" ? "row" : "column"} className='PrintContainer'>
            <Box className='SrcPrintBox'>
              {isOutput && (
                <Box
                  className='SrcSentence'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p>{words[0][0]}</p>
                  <hr />
                  <p>{words[0][1]}</p>
                  
                </Box>
              )}
            </Box>
            <Box className='SrcPrintBox'>
              {isOutput && (
                <Box
                  className='SrcSentence'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p>{words[1][0]}</p>
                  <hr />
                  <p>{words[1][1]}</p>
          
                </Box>
              )}
            </Box>
            <Box className='SrcPrintBox'>
              {isOutput && (
                <Box
                  className='SrcSentence'
                  animation={{ type: "fadeIn", duration: 400, size: "large" }}
                >
                  <p>{words[2][0]}</p>
                  <hr />
                  <p>{words[2][1]}</p>
        
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* 예시 */}
        <div className='SrcResult'>
          <Box direction='row'>
            <p>이 단어들을 활용해 어떤 이야기를 쓸 수 있을까요?</p>
            <button
              onClick={StoryAxios}
            >
              {isResult ? '다시 쓰기' : '예시보기'}
            </button>
            <button onClick={SaveContent}>저장하기</button>
          </Box>
          {isResult && (
            <Box
              className='StoryResults'
              animation={{ type: "fadeIn", duration: 400, size: "large" }}
            >
              &gt; 
              <br/>
              {storyKor}
              <hr/>
              {storyEng}
            </Box>
          )}
        </div>
      </Box>
    </ServiceLayout>
  );
};

export default Storysrc;

