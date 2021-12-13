import React from "react";

import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import { Box } from "grommet";
import styled from "styled-components";

const PayResult = () => {
  return (
    <Layout>
      <Box justify='center' align='center' className='DoneContainer'>
        <GoBroswerContainer>
          <img src='/light.png' alt='light'/>
          <h2>
            아래 버튼을 클릭해서 브라우저 앱으로 접속해주세요!
          </h2>
        </GoBroswerContainer>
        <div style={{ textAlign: "center" }}>
          <GoBroswerBtn>
            <a href='https://tinytingel.ai/' target='_blank' rel="noreferrer">글쓰러 가기</a>
          </GoBroswerBtn>
        </div>
      </Box>
    </Layout>
  );
};

export default PayResult;

const GoBroswerContainer = styled.div`
    text-align : center; 
    margin-bottom : 20px;
    > img {
       width: 40px;
       height: 40px;
       margin-bottom : 5px;
    }

    > h2 {
        font-weight: 600;
    }

    >
`

const GoBroswerBtn = styled.button`
  border: 1px solid #444;
  background-color: #fff;
  font-size: 1rem;
  padding: 5px 8px;
`;
