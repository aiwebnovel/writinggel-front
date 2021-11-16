import { Box } from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import ServiceLayout from "../Layout";

import styled from "styled-components";
import * as configUrl from "../../../config";


const Storysrc = () => {
  const History = useHistory();

  const [isOutput, SetOutput] = useState(false);
  const [isResult, SetResult] = useState(false);
  const [words, SetWords] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
  ]);
  const [story, SetStory] = useState("");

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  const StorysrcAxios = async () => {
    SetWords([
      ["", ""],
      ["", ""],
      ["", ""],
    ]);
    const config = {
      method: "post",
      url: `${configUrl.SERVER_URL}/writinggel/pickwords`,
      headers: { authentication: localStorage.getItem("token") },
    };

    await axios(config)
      .then(async (response) => {
        console.log(response.data);
        SetWords([
          [response.data["wordsT"][0], response.data["words"][0]],
          [response.data["wordsT"][1], response.data["words"][1]],
          [response.data["wordsT"][2], response.data["words"][2]],
        ]);
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  const StoryAxios = async () => {
    if (!isResult) {
      if (words[0][1] !== "" && words[1][1] !== "" && words[2][1] !== "") {
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/writinggel/sentence`,
          headers: { authentication: localStorage.getItem("token") },
          data: { words: [words[0][1], words[1][1], words[2][1]] },
        };

        await axios(config)
          .then(async (response) => {
            console.log(response.data);
            SetStory(response.data[0]);
          })
          .catch(async (error) => {
            console.log(error);
          });
      } else {
        setTimeout(toast.info("단어를 뽑아주세요!"), 300);
      }
    }
  };

  return (
    <ServiceLayout>
      <Box
        className="ServiceContainerVh"
        background="#f9f9f9"
        justify="center"
        align="center"
        pad="large"
        gap="large"
      >
        {/* 단어 뽑기 */}
        <Box
          className="SrcPrintBtn"
          direction="row"
          align="start"
          justify="center"
          gap="medium"
        >
          <button
            onClick={() => {
              SetOutput(!isOutput);
              StorysrcAxios();
            }}
          >
            이야기 재료로 쓸 단어 뽑기
          </button>
          <Box className="SrcPrintBox">
            {isOutput && (
              <Box
                className="SrcSentence"
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>{words[0][0]}</p>
                <hr />
                <p>{words[0][1]}</p>
                <div>
                  <Download />
                </div>
              </Box>
            )}
          </Box>
          <Box className="SrcPrintBox">
            {isOutput && (
              <Box
                className="SrcSentence"
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>{words[1][0]}</p>
                <hr />
                <p>{words[1][1]}</p>
                <div>
                  <Download />
                </div>
              </Box>
            )}
          </Box>
          <Box className="SrcPrintBox">
            {isOutput && (
              <Box
                className="SrcSentence"
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>{words[2][0]}</p>
                <hr />
                <p>{words[2][1]}</p>
                <div>
                  <Download />
                </div>
              </Box>
            )}
          </Box>
        </Box>

        {/* 예시 */}
        <Box className="SrcResult">
          <Box direction="row">
            <p>이 단어들을 활용해 어떤 이야기를 쓸 수 있을까요?</p>
            <button
              onClick={() => {
                SetResult(!isResult);
                StoryAxios();
              }}
            >
              예시보기
            </button>
          </Box>
          {isResult && (
            <Box
              className="StoryResults"
              animation={{ type: "fadeIn", duration: 400, size: "large" }}
            >
              &gt; {story}
            </Box>
          )}
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Storysrc;
