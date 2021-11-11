import { Box,ResponsiveContext } from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import * as configUrl from "../../../config";

import axios from 'axios'

const Discussion = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [input, SetInput] = useState('');
  const [OutputContent, SetOutputContent] = useState(['','',''])
  const [option, SetOutputOption] = useState('')

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

    const DiscussionAxios = async () => {
    SetOutputContent('');
    if (input && input !== '') {
      const config = {
        method: 'post',
        url: `${configUrl.SERVER_URL}/writinggel/discussion`,
        headers: { 'authentication': localStorage.getItem("token"), },
        data : { option:option, story:input }
      };

      await axios(config)
      .then(async (response) => {
        console.log(response.data);
        SetOutputContent(response.data[0]);
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
      <Box
        className='ServiceContainerVh'
        justify='center'
        align='center'
        background='#f9f9f9'
        pad='large'
        gap="large"
      >
        <Box 
        align='center' className='DiscussInputBox'>
          <div className="InputAlign">
            <p>
              토론하고 싶은 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input type='text' placeholder='토론 주제를 적어주세요!' onChange={(e)=>{SetInput(e.target.value)}}/>
          </div>
        </Box>
        <Box direction='row-responsive' justify='center' align='center' gap='medium' className='DiscussOutputBox'>
          <div className="Agree">
            <button onClick = {()=>{SetOutputOption('Pros'); DiscussionAxios('Pros');}}>찬성 논거 찾기</button>
            <div className="outputArea">
              <div>{option === 'Pros' && option !== '' ? OutputContent : '찬성 논거'}</div>
              <Icon>
                <Download />
              </Icon>
            </div>
          </div>
          <div className="Opposite">
            <button onClick = {()=>{SetOutputOption('Cons'); DiscussionAxios();}}>반대 논거 찾기</button>
            <div  className="outputArea">
              <div>{option === 'Cons' && option !== '' ? OutputContent : '반대 논거'}</div>
              <Icon>
                <Download />
              </Icon>
            </div>
          </div>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Discussion;

const Icon = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
cursor: pointer;
`