import { Box,ResponsiveContext } from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import styled from "styled-components";

const Discussion = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

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
    <ServiceLayout>
      <Box
        className='ServiceContainerVh'
        justify='center'
        align='center'
        background='#f9f9f9'
        pad='large'
        gap="large"
      >
        <Box 
        align='center' className='DiscussInputBox'>
          <div className="InputAlign">
            <p>
              토론하고 싶은 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input type='text' placeholder='사업 주제를 적어주세요!' />
          </div>
        </Box>
        <Box direction='row-responsive' justify='center' align='center' gap='medium' className='DiscussOutputBox'>
          <div className="Agree">
            <button>찬성 논거 찾기</button>
            <div className="outputArea">
              <div>결과가 나올 곳입니다!</div>
              <Icon>
                <Download />
              </Icon>
            </div>
          </div>
          <div className="Opposite">
            <button>반대 논거 찾기</button>
            <div  className="outputArea">
              <div>결과가 나올 곳입니다!</div>
              <Icon>
                <Download />
              </Icon>
            </div>
          </div>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Discussion;

const Icon = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`