import {
  Box,
  Grid,
  ResponsiveContext,
  Card,
  CardBody,
  CardHeader,
} from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import * as configUrl from "../../../config";
import Loading from "../../Loading";

import styled from "styled-components";
import axios from 'axios'


const Businessitem = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [input, SetInput] = useState('');
  const [OutputContent, SetOutputContent] = useState(['','',''])


  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

    const BusinessitemAxios = async () => {
    
      SetLoading(true)
    if (input && input !== '') {
      const config = {
        method: 'post',
        url: `${configUrl.SERVER_URL}/writinggel/businessitem`,
        headers: { 'authentication': localStorage.getItem("token"), },
        data : { story:input }
      };

      await axios(config)
      .then(async (response) => {
        console.log(response.data);
        SetOutputContent(response.data[0]);
        SetLoading(false)
      })
      .catch(async (error) => {
        console.log(error);
      });
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  };

  const SaveContent = async(output) => {
    
    if(output){
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: output,
          category:'비즈니스 아이템',
        }
      };

      await axios(config)
        .then(async (response) => {
         
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
      }else {
        toast.info('저장할 결과가 없습니다!');  
      }


  }

  return (
    <ServiceLayout>
      {isLoading && <Loading />}
      <Box
        className='ServiceContainerVh'
        justify='center'
        align='center'
        background='#f9f9f9'
        gap="large"
        style={size !== 'small' ? {padding: '48px'}: {padding: '100px 24px'}}
      >
        <Box
          direction={size !=='small' ? 'row':'column'}
          justify='center'
          align={size !== 'small' ? 'end': 'center'}
          className='itemInputBox'
          gap="medium"
        >
          <div className='busiItem'>
            <p>
              사업 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input type='text' placeholder='사업 주제를 적어주세요!' onChange={(e)=>{SetInput(e.target.value)}}/>
          </div>
          <button onClick = {()=>{BusinessitemAxios()}}>사업 아이템 찾기</button>
        </Box>
        <Box fill={size !== "small" ? false : true}>
          <Grid
            gap='medium'
            columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
          >
            <Cards >
              <CardHeader className='SerCardHead'>아이템 1</CardHeader>
              <CardBody className='SerCardBody'>{OutputContent[0]}</CardBody>
              <div className='SerCardFoot'>
                <Download onClick={()=> {
                  let output = OutputContent[0]
                  SaveContent(output)}}/>
              </div>
            </Cards>
            <Cards>
              <CardHeader className='SerCardHead'>아이템 2</CardHeader>
              <CardBody className='SerCardBody'>{OutputContent[1]}</CardBody>
              <div className='SerCardFoot'>
                <Download onClick={()=> {
                  let output = OutputContent[1]
                  SaveContent(output)}}/>
              </div>
            </Cards>
            <Cards>
              <CardHeader className='SerCardHead'>아이템 3</CardHeader>
              <CardBody className='SerCardBody'>{OutputContent[2]}</CardBody>
              <div className='SerCardFoot'>
                <Download onClick={()=> {
                  let output = OutputContent[2]
                  SaveContent(output)}}/>
              </div>
            </Cards>
          </Grid>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Businessitem;

const Cards = styled(Card)`
  background-color:'#fff'; 
  border-radius:0;
  width: 250px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`