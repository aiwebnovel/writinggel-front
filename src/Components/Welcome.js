import React from "react";
import { Link } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";

const Welcome = () => {

  return (
    <Box className="WelcomeContainer">
       <div className='loginHeader'>
        <Link to='/'>
          <img src='/logo2.png' alt='로그인 이미지' />
        </Link>
      </div>
      <Box justify='center' align='center' className='DoneContainer'>
        <Box className='DoneBox'>
          <ImgBox>
            <img src='tinggle.png' alt='welcomeTing' />
          </ImgBox>
          <div className='DoneText' style={{ wordBreak: 'keep-all'}}>
            <h2>거의 마지막이에요! 🥳</h2>
            <p>가입하신 이메일로 인증을 해주시면 회원가입이 완료됩니다!</p>
          </div>
          <div className='DoneButton'>
          <button>
                <Link to='/'>Home</Link>
            </button>
            <button>
                <Link to='/login'>로그인 하기</Link>
            </button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;

const ImgBox = styled.div`
  text-align: center;
  > img {
    width: 150px;
  }
`;
