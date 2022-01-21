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
            <h2>Welcome! 🥳</h2>
            <p>라이팅젤 멤버가 되신 걸 환영해요!</p>
            <p>아래 버튼을 눌러서 로그인을 해주세요!</p>
            <p>카카오로 가입하신 분들은 Home을 눌러주세요. 🥰</p>
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