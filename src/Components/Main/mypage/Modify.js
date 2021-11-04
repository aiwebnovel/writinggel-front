import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../Layout";
import { Box, ResponsiveContext } from "grommet";
import styled from "styled-components";

const Modify = () => {
  const size = useContext(ResponsiveContext);
  // const History = useHistory();

  // useEffect(()=>{
  //     const loginCheck = localStorage.getItem('token');
  //     console.log(loginCheck);
  //     if(loginCheck === null ) {
  //         History.replace('/')
  //     }
  // })

  return (
    <Layout>
      <Box fill justify='center' align='center'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          pad='large'
          className='MypageHeader'
        >
          <h2>회원 정보 수정</h2>
        </Box>
        <Box
          width='100%'
          justify='center'
          align='center'
          pad='large'
          className="ModifyContent"
        >
          <div className='UserFormInputs'>
            <input type='text' placeholder='이름' />
          </div>

          <div className='UserFormInputs'>
            <input type='text' placeholder='이메일' />
          </div>
          <div className='UserFormInputs'>
            <input type='text' placeholder='전화번호' />
          </div>
          <div className='ModifyUserBtns'>
            <button type='submit' className='MBtn'>
              회원정보 수정
            </button>
            <button type='submit' className='OutBtn'>
              탈퇴하기
            </button>
          </div>
        </Box>
      </Box>
    </Layout>
  );
};

export default Modify;
