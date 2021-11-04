
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "grommet";
import {Download} from 'grommet-icons'

import ServiceLayout from "../Layout";
import styled from 'styled-components'

const Firstsentence = () => {
  const History = useHistory();
  const [isOutput, SetOutput] = useState(false)

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
      <Box className="ServiceContainer" justify='center' align='center' pad="large" background="#f9f9f9">
        <Box fill align='center' justify='start'>
          <RandomBtn onClick={()=>{SetOutput(!isOutput)}} style={{cursor:'pointer'}}> 랜덤 첫 문장 뽑기 💬 </RandomBtn>
          <Box className="printBox">
          {isOutput &&
            <Box 
            className="SentenceBox"
            animation={{type:'fadeIn', duration:400, size:'large'}}>
              <p>결과에용</p>
              <hr/>
              <p>영어 결과에용</p>
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