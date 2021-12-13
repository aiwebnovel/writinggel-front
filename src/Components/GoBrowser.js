import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Layout from "../Components/Layout";
import { Box } from "grommet";
import styled from "styled-components";
import { toast } from "react-toastify";

const PayResult = () => {

const [copied, SetCopy] = useState(false);


    return (
    <Layout>
      <Box justify='center' align='center' className='DoneContainer'>
        <GoBroswerContainer>
          <img src='/light.png' alt='light'/>
          <h2>아래 버튼을 클릭해서 링크 복사 후 </h2>
          <h2>크롬, 사파리 등 앱으로 접속해주세요!</h2>
        </GoBroswerContainer>
        <div style={{ textAlign: "center" }}>
        <CopyToClipboard text='https://tinytingel.ai/' onCopy={()=>{
            SetCopy({copied: true});
            toast.info('링크가 복사 되었습니다', {
                icon: '💡',
                style: { backgroundColor: "#fff", color: "#000" },
                progressStyle: { backgroundColor: "#7D4CDB" },
            });
            }}>
          <GoBroswerBtn>
         링크 복사
          </GoBroswerBtn>
          </CopyToClipboard>
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
  border: 1px solid #372874;
  background-color: #fff;
  font-size: 1rem;
  padding: 5px 8px;
  color : #372874;

  &:hover {
      background-color : #ffce1f;
      border : 1px solid #ffce1f; 
      color : #372874;
  }
`;
