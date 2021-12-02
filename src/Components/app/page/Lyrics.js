import { Box, ResponsiveContext } from "grommet";
import { Update, Download, Close, Sort } from "grommet-icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import ServiceLayout from "../Layout";
import * as configUrl from "../../../config";
import Loading from "../../Loading";

const Lyrics = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();
  const [isLoading, SetLoading] = useState(false);
  const [title, SetTitle] = useState("");
  const [story, SetStory] = useState(["", "", ""]);
  const [content, SetOutputContent] = useState("");

  const LyricsAxios = async () => {
    SetOutputContent("");
    SetLoading(true);
    if (title !== "" && story[0] !=="" && story[1] !== "" && story[2] !=="") {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/lyrics`,
        headers: { authentication: localStorage.getItem("token") },
        data: { title, story },
      };

      await axios(config)
        .then(async (response) => {
          console.log(response.data);

          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
            );

          } else {
            SetOutputContent(response.data[1]);
          }
        })
        .catch(async (error) => {
          console.log(error);
        }).finally(()=>{
          SetLoading(false);
        });
    } else {
      SetLoading(false);
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  };

  const SaveContent = async () => {
    console.log(content);
    if (content) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: content,
          category: "영어 가사",
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
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  const ResetData = () => {
    SetTitle("");
    SetStory(["", "", ""]);
    SetOutputContent("");
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/service/lyrics");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <ServiceLayout>
      {isLoading && <Loading />}
      <Box
        className='ServiceContainerVh'
        justify='evenly'
        align='center'
        direction={size !== "small" ? "row" : "column"}
        background='#f9f9f9'
        // gap={size ==='small' && 'large'}
        style={
          size !== "small"
            ? { padding: "48px" }
            : { padding: "60px 24px", gap: "48px" }
        }
      >
        <Box className='LyricInputBox'>
          <div className='subjectTitle'>
            <p>
              제목<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type='text'
              placeholder='제목을 적어주세요!'
              value={title}
              required
              onChange={(e) => {
                SetTitle(e.target.value);
              }}
            />
          </div>
          <div className='subjects'>
            <p>
              주제(3개 입력)<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type='text'
              placeholder='주제를 적어주세요!'
              value={story[0]}
              required
              onChange={(e) => {
                SetStory([e.target.value, story[1], story[2]]);
              }}
            />
            <input
              type='text'
              placeholder='주제를 적어주세요!'
              value={story[1]}
              required
              onChange={(e) => {
                SetStory([story[0], e.target.value, story[2]]);
              }}
            />
            <input
              type='text'
              placeholder='주제를 적어주세요!'
              value={story[2]}
              required
              onChange={(e) => {
                SetStory([story[0], story[1], e.target.value]);
              }}
            />
          </div>
          <button
            onClick={() => {
              LyricsAxios();
            }}
          >
            영어 가사 쓰기
          </button>
        </Box>
        <Box className='LyricOutputBox'>
            {/* <div className='LyricContent'>{content.split('\n').map((line, index)=>(
              <span key={line !== '' ? line : index}>{line}<br/></span>
            ))}</div> */}
            <div className='LyricContent'>{content}</div>
            <div className='icons'>
              <Close onClick={ResetData} /> <Update onClick={LyricsAxios} />
              <Download onClick={SaveContent} />
            </div>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Lyrics;
