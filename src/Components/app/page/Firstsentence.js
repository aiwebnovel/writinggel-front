
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "grommet";
import {Download} from 'grommet-icons'

import * as configUrl from "../../../config";


import ServiceLayout from "../Layout";
import styled from 'styled-components'
import axios from 'axios'

const Firstsentence = () => {
  const History = useHistory();
  const [isOutput, SetOutput] = useState(false)
  const [OutputContent, SetOutputContent] = useState(['',''])

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  const FirstsentenceAxios = async () => {
    if (!isOutput) {
      const config = {
        method: 'post',
        url: `${configUrl.SERVER_URL}/writinggel/firstsentence`,
        headers: { 'authentication': localStorage.getItem("token"), }
      };

      await axios(config)
      .then(async (response) => {
        SetOutputContent(response.data);
      })
      .catch(async (error) => {
        console.log(error);
      });
    }
  };

  return (
    <ServiceLayout>
      <Box className="ServiceContainerVh" justify='center' align='center' pad="large" background="#f9f9f9">
        <Box fill align='center' justify='start'>
          <RandomBtn onClick={()=>{SetOutput(!isOutput);FirstsentenceAxios();}} style={{cursor:'pointer'}}> 랜덤 첫 문장 뽑기 💬 </RandomBtn>
          <Box className="printBox">
          {isOutput &&
            <Box 
            className="SentenceBox"
            animation={{type:'fadeIn', duration:400, size:'large'}}>
              <p>{OutputContent[0]}</p>
              <hr/>
              <p>{OutputContent[1]}</p>
              <div><Download /></div>
            </Box>
            }
          </Box>
        </Box> 
      </Box>
    </ServiceLayout>
  );
};

export default Firstsentence;

const RandomBtn = styled.button`
  border: 1px solid #3b2477;
  font-weight: 600;
  // background-color : #fff;
  background-color : #FFD000;
  padding: 8px 15px;
  width: 500px;
  font-size: 1rem;
  

    @media screen and (max-width: 680px) {
      width: 80%;
  }
`