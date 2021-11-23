import { Box, Grid, ResponsiveContext } from "grommet";
import {Cycle, Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Modal from "../../Modal";
import * as configUrl from "../../../config";

import axios from "axios";

const Dailywrite = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isOpen, SetOpen] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [OutputContent, SetOutputContent] = useState(["", ""]);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const DailywriteAxios = async () => {
    SetOutputContent(["", ""]);
    SetLoading(true);
    const config = {
      method: "post",
      url: `${configUrl.SERVER_URL}/writinggel/lifequestion`,
      headers: { authentication: localStorage.getItem("token") },
    };

    await axios(config)
      .then(async (response) => {
        SetOutputContent(response.data);
        SetOpen(true);
        SetLoading(false);
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  const SaveContent = async() => {
    
    if(OutputContent){
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: OutputContent[0],
          category:'일상 기록 질문',
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
    <>
      <ServiceLayout>
        <Box
          className='DailyContainerVh'
          background='#f9f9f9'
          justify='center'
          align='center'
          gap='large'
        >
          <Grid
            columns={
              size !== "small"
                ? { count: 4, size: "auto" }
                : { count: 2, size: "auto" }
            }
            gap='medium'
            // fill={size !== "small" ? false : true}
          >
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
          </Grid>

          <DailyBtn
            onClick={() => {
              DailywriteAxios();
              HandleModals();
            }}
          >
            일상 기록 질문 뽑기
          </DailyBtn>
        </Box>
      </ServiceLayout>
      <Modal open={isOpen} close={HandleModals}>
        {isLoading ? (
          <LoadingCard>
            <img src='/lantern.png' alt='카우치' />
            <p>Now Loading...</p>
          </LoadingCard>
        ) : (
          <ResultCard>
            <div className='cardImg'>
              <img src='/logo.png' alt='로고' />
            </div>
            <div>{OutputContent[0]}</div>
            <hr style={{ margin: "20px 0" }} />
            <div> {OutputContent[1]}</div>
            <div className='DailyiconBox'>
           <Cycle onClick={DailywriteAxios}/> <Download onClick={SaveContent}/>
            </div>
          </ResultCard>
        )}
      </Modal>
    </>
  );
};

export default Dailywrite;

const LoadingCard = styled.div`
  text-align: center;
  animation-name: bounce;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  font-family: 'NeoDunggeunmo';
  padding: 20px;

  >img {
      width: 200px;

      @media screen and (max-width: 768px) {
        width: 150px;
      }
  }

  >p {
      margin-top: 15px
  }

  @keyframes bounce {
    0% {
        transform: translateY(0px)
    }

    40% {
        transform: translateY(-40px);
    }

    100% {
        transform: translateY(0px);
    }
}
`;

const Card = styled.div`
  border: 1px solid #444;
  background-color: #fff;
  width: 150px;
  display: flex;
  //justify-content: center;
  //align-items: center;
  padding: 20px 8px;

  > img {
    width: 100%;
  }

  @media screen and (max-width: 300px) {
    width: 100px;
  }
`;

const DailyBtn = styled.button`
  background-color: #3b2477;
  color: #fff;
  width: 200px;
  font-size: 1rem;
  padding: 10px 15px;
  border: 1px solid #3b2477;
  cursor: pointer;
`;

const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 80%;
  }

  .cardImg {
    text-align: center;
    margin-bottom: 10px;

    > img {
      width: 120px;
    }
  }
`;
