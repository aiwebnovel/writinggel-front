import { Box, Grid, ResponsiveContext } from "grommet";
import { Update, Close, Add, Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Modal from "../../Modal";

const Dailywrite = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isOpen, SetOpen] = useState(false);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };


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
        className='ServiceContainerVh'
        background='#f9f9f9'
        pad='large'
        justify='center'
        align='center'
        gap="large"
      >
        <Grid
          columns={size !== "small" ? { count: 4, size: "auto" } : "100%"}
          gap='medium'
          fill={size !== "small" ? false : true}
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

        <DailyBtn onClick={HandleModals}>일상 기록 질문 뽑기</DailyBtn>
      </Box>
    </ServiceLayout>
    <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
      <ResultCard>
        <div className="cardImg"><img src="/logo.png" alt='로고' /></div>
        <div>만약 당신이 당신의 삶에 대한 이야기를 쓴다면, 제목은 무엇인가요?</div>
        <hr style={{margin:'20px 0'}}/>
        <div>If you were to write a story about your life, what would be the title?</div>
        <div className="DailyiconBox"><Download/></div>
      </ResultCard>
    </Modal>
    </>
  );
};

export default Dailywrite;

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
`;

const DailyBtn = styled.button`
  background-color: #3b2477;
  color: #fff;
  width: 200px;
  font-size : 1rem;
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
    width: 70%;

  }

  .cardImg {
    text-align: center;
    margin-bottom : 10px;
  
  > img {
      width: 80px;

  }
}
`