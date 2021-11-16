import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "grommet";
import { Download, Cycle } from "grommet-icons";

import * as configUrl from "../../../config";

import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import styled from "styled-components";
import axios from "axios";

const Firstsentence = () => {
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
         
          await SetOutputContent(response.data);
          console.log('성공?')
          toast.success('저장완료!');
        })
        .catch(async (error) => {
          console.log(error);
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
        pad='large'
        background='#f9f9f9'
      >
        <Box fill align='center' justify='start'>
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
