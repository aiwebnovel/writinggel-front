import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, ResponsiveContext } from "grommet";
import { Download, Cycle } from "grommet-icons";

import * as configUrl from "../../../config";

import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import styled from "styled-components";
import axios from "axios";

const Firstsentence = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();
  const [isOutput, SetOutput] = useState(false);
  const [OutputContent, SetOutputContent] = useState(["", ""]);

  const [isLoading, SetLoading] = useState(false);

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
    SetLoading(true);
    SetOutput(!isOutput);
    if (!isOutput || OutputContent !== '' ) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/firstsentence`,
        headers: { authentication: localStorage.getItem("token") },
      };

      await axios(config)
        .then(async (response) => {
          SetLoading(false);
          await SetOutputContent(response.data);
          console.log(response.data);
        
        })
        .catch(async (error) => {
          console.log(error);
        });
    }else {
      toast.info('결과가 나오지 않았습니다. 버튼을 한 번 더 눌러주세요!');  
    }
    
  };

  const Request = async() =>  {
    SetLoading(true);
    if(isOutput){
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/firstsentence`,
        headers: { authentication: localStorage.getItem("token") },
      };

      await axios(config)
        .then(async (response) => {
          SetLoading(false);
          await SetOutputContent(response.data);
        
        })
        .catch(async (error) => {
          console.log(error);
        });
      }else {
        toast.info('결과가 나오지 않았습니다. 버튼을 한 번 더 눌러주세요!');  
      }
  }

  const SaveContent = async() => {
    
    if(OutputContent){
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: OutputContent[0],
          category:'첫문장 자판기',
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
        className='FirstContainer'
        // justify={size !== 'small' ? 'center':'start'}
        justify='start'
        align='center'
        background='#f9f9f9'
      >
        <Box align='center' className="FirstBox">
          <RandomBtn
            onClick={() => {
              FirstsentenceAxios();
            }}
            style={{ cursor: "pointer" }}
          >
            랜덤 첫 문장 뽑기 💬
          </RandomBtn>
          <Box className='printBox'>
            {isOutput && (
              <Box
                className='SentenceBox'
                animation={{ type: "fadeIn", duration: 400, size: "large" }}
              >
                <p>{OutputContent[0]}</p>
                <hr />
                <p>{OutputContent[1]}</p>
                <div style={{display: 'flex',alignItems:'center'}}>
                  <Cycle onClick={Request} style={{marginRight: '15px'}}/>
                  <Download onClick={SaveContent} />
                </div>
              </Box>
            )}
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
  background-color: #ffd000;
  padding: 8px 15px;
  width: 500px;
  font-size: 1rem;

  @media screen and (max-width: 680px) {
    width: 80%;
  }
`;
