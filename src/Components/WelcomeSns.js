import React from "react";
import { Link } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";

const WelcomeSns = () => {

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
            <p>아래 버튼을 눌러서 라이팅젤을 즐겨보세요. 🥰</p>
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

export default WelcomeSns;

const ImgBox = styled.div`
  text-align: center;
  > img {
    width: 150px;
  }
`;
