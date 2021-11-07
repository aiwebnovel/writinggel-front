import {
  Box,
  Grid,
  ResponsiveContext,
  Accordion,
  AccordionPanel,
} from "grommet";
import { Update, Close, Add, Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import styled from "styled-components";

const Storysrc = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isOutput, SetOutput] = useState(false);
  const [isResult, SetResult] = useState(false);

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
      <Box
        className='ServiceContainerVh'
        background='#f9f9f9'
        justify='center'
        align='center'
        pad='large'
        gap='large'
      >
        {/* 단어 뽑기 */}
        <Box className='SrcPrintBtn' direction='row' align='start' gap='medium'>
          <button
            onClick={() => {
              SetOutput(!isOutput);
            }}
          >
            이야기 재료로 쓸 단어 뽑기
          </button>
          <Box className='SrcPrintBox'>
            {isOutput && (
              <Box
                className='SrcSentence'
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>결과에용</p>
                <hr />
                <p>영어 결과에용</p>
                <div>
                  <Download />
                </div>
              </Box>
            )}
          </Box>
          <Box className='SrcPrintBox'>
            {isOutput && (
              <Box
                className='SrcSentence'
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>결과에용</p>
                <hr />
                <p>영어 결과에용</p>
                <div>
                  <Download />
                </div>
              </Box>
            )}
          </Box>
          <Box className='SrcPrintBox'>
            {isOutput && (
              <Box
                className='SrcSentence'
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>결과에용</p>
                <hr />
                <p>영어 결과에용</p>
                <div>
                  <Download />
                </div>
              </Box>
            )}
          </Box>
        </Box>

        {/* 예시 */}
        <Box className='SrcResult'>
          <Box direction='row'>
            <p>이 단어들을 활용해 어떤 이야기를 쓸 수 있을까요?</p>
            <button onClick={() => SetResult(!isResult)}>예시보기</button>
          </Box>
          {isResult && (
            <div className='StoryResults'>
              &gt; 루크는 하루종일 농구를 해서 지쳤다. 그는 그의 개의 목줄을 잡았지만, 그가
              코트를 떠나기 전에 한 남자가 루크가 다음 번에 득점하지 않도록
              어떻게 하면 더 나은 수비를 할 수 있는지에 대한 의견을 가지고 그를
              막았다.
            </div>
          )}
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Storysrc;
