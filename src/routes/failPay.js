import React from "react";
import { Link } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";

const FailPay = () => {
  return (
    <Box className='ErrorContainer'>
      <Box fill justify='center' align='center'>
        <ErrorPage>
          <ImgBox>
            <img src='/error-404.png' alt='error' />
          </ImgBox>
          <h2>결제가 이루어지지 않았습니다!</h2>
          <h3>이미 결제했던 계정인가요?</h3>
          <h3>만약 아니라면 카드와 잔액을 확인해주세요!</h3>
         
        </ErrorPage>
        <Link to='/signIn'>
          <HomeBtn>다시 가입하기</HomeBtn>
        </Link>
      </Box>
    </Box>
  );
};

export default FailPay;

const ErrorPage = styled(Box)`
  padding: 0 20px;
  text-align: center;
 

  > h2 {
    font-size: 1.8rem;
    font-weight: 900;
    word-break: keep-all;
    line-height: 2rem;
    //font-family: "NeoDunggeunmo";
    margin-bottom : 20px;
  }

  > h3 {
    font-size: 1.2rem;
  }
`;

const ImgBox = styled.div`
  text-align: center;
  margin-bottom: 10px;
  > img {
    width: 180px;
  }
`;

const HomeBtn = styled.button`

  background-color: #372874;
  border: 1px solid #372874;
  color: #fff;
  font-size: 20px;
  padding: 5px 25px;
  cursor: pointer;
  margin-top: 25px;
  transition: all 300ms ease;

  &:hover {
    background-color : #ffce1f;
    color : #444;
  }
`;
