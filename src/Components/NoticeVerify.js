import React from "react";
import { Link } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";

const NoticeVerify = () => {

  return (
    <Box className='WelcomeContainer'>
      <div className='loginHeader'>
        <Link to='/'>
          <img src='/logo2.png' alt='로그인 이미지' />
        </Link>
      </div>
      <Box justify='center' align='center' className='DoneContainer'>
        <Box className='DoneBox'>
          <ImgBox>
            <img src='error-4042.png' alt='error' />
          </ImgBox>
          <div className='DoneText' style={{ wordBreak: "keep-all" }}>
            <h2>이메일 인증에 실패했습니다!</h2>
            <p>이미 가입되어 있는 메일이거나 사용할 수 없는 메일입니다.</p>
            <p>유효한 이메일로 다시 가입을 시도해주세요!</p>
          </div>
          <div className='DoneButton'>
            <button><Link to='/regist'>회원가입</Link></button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default NoticeVerify;

const ImgBox = styled.div`
  text-align: center;
  > img {
    width: 150px;
  }
`;
