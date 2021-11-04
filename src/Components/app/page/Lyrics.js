import { Box } from "grommet";
import { Update, Download, Close } from 'grommet-icons'
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";

const Lyrics = () => {
  const History = useHistory();

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
        className='ServiceContainer'
        justify='evenly'
        align='center'
        direction='row'
        background='#f9f9f9'
        pad='large'
      >
        <Box className='LyricInputBox'>
          <div className='subjectTitle'>
            <p>제목<span style={{color:'red'}}>*</span></p>
            <input type='text' placeholder='제목을 적어주세요!' required />
          </div>
          <div className='subjects'>
            <p>주제(3개 입력)<span style={{color:'red'}}>*</span></p>
            <input type='text' placeholder='주제를 적어주세요!' required />
            <input type='text' placeholder='주제를 적어주세요!' required />
            <input type='text' placeholder='주제를 적어주세요!' required />
          </div>
          <button>영어 가사 쓰기</button>
        </Box>
        <Box className='LyricOutputBox'>
            <textarea />
            <div className='icons'> <div><Close />  <Update/> <Download/> </div> </div>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Lyrics;
