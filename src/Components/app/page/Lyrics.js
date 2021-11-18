import { Box, ResponsiveContext } from "grommet";
import { Update, Download, Close } from 'grommet-icons'
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

import ServiceLayout from "../Layout";
import * as configUrl from "../../../config";
import Loading from "../../Loading";

const Lyrics = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();
  const [isLoading, SetLoading] = useState(false);
  const [title, SetTitle] = useState('');
  const [story, SetStory] = useState(['','','']);
  const [content, SetOutputContent] = useState('')

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  const LyricsAxios = async () => {
    SetOutputContent('');
    SetLoading(true)
    if (title !== '' && story) {
      const config = {
        method: 'post',
        url: `${configUrl.SERVER_URL}/writinggel/lyrics`,
        headers: { 'authentication': localStorage.getItem("token"), },
        data : { title, story }
      };

      await axios(config)
      .then(async (response) => {
        console.log(response.data);
        SetOutputContent(response.data);
        SetLoading(false)
      })
      .catch(async (error) => {
        console.log(error);
      });
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  };

  return (
    <ServiceLayout>
      {isLoading && <Loading />}
      <Box
        className='ServiceContainerVh'
        justify='evenly'
        align='center'
        direction={size !=='small' ? 'row': 'column'}
        background='#f9f9f9'
        gap={size ==='small' && 'large'}
        style={size !== 'small' ? {padding: '48px'} : {padding: '60px 24px'}}
      >
        <Box className='LyricInputBox'>
          <div className='subjectTitle'>
            <p>제목<span style={{color:'red'}}>*</span></p>
            <input type='text' placeholder='제목을 적어주세요!' required onChange={(e)=>{SetTitle(e.target.value)}}/>
          </div>
          <div className='subjects'>
            <p>주제(3개 입력)<span style={{color:'red'}}>*</span></p>
            <input type='text' placeholder='주제를 적어주세요!' required onChange={(e)=>{SetStory([e.target.value,story[1],story[2]])}}/>
            <input type='text' placeholder='주제를 적어주세요!' required onChange={(e)=>{SetStory([story[0],e.target.value,story[2]])}}/>
            <input type='text' placeholder='주제를 적어주세요!' required onChange={(e)=>{SetStory([story[0],story[1],e.target.value])}}/>
          </div>
          <button onClick = {()=>{LyricsAxios();}}>영어 가사 쓰기</button>
        </Box>
        <Box className='LyricOutputBox'>
            <textarea value={content}/>
            <div className='icons'> <div><Close />  <Update/> <Download/> </div> </div>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Lyrics;
