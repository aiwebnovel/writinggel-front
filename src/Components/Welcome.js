import React, { useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../Components/Layout";
import { Box } from "grommet";
import styled from "styled-components";

const Welcome = () => {
  //const History = useHistory();

//   useEffect(() => {
//     const loginCheck = localStorage.getItem("token");

//     if (loginCheck !== null) {
//       return;
//     } else {
//       History.push("/");
//     }
//   }, []);

  return (
    <Layout>
      <Box justify='center' align='center' className='DoneContainer'>
        <Box className='DoneBox'>
          <ImgBox>
            <img src='tinggle.png' alt='welcomeTing' />
          </ImgBox>
          <div className='DoneText'>
            <h2>Welcome! 🥳</h2>
            <h3>라이팅젤 멤버가 되신 걸 환영해요!</h3>
            <h4>아래 버튼을 눌러서 로그인해주세요!</h4>
          </div>
          <div className='DoneButton'>
            <button>
                <Link to='/login'>로그인 하기</Link>
            </button>
          </div>
        </Box>
      </Box>
    </Layout>
  );
};

export default Welcome;

const ImgBox = styled.div`
  text-align: center;
  > img {
    width: 150px;
  }
`;
