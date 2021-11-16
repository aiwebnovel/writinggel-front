import React, {useContext, useState, useRef} from "react";
import Layout from "../Layout";
import { Box, Grid, Card, ResponsiveContext  } from "grommet";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const NewsLetter = () => {

    const size = useContext(ResponsiveContext)
    const [isChecked, SetChecked] = useState(false);
    const [Email, SetEmail] = useState('');
    const [isEmail, SetIsEmail] = useState(false);
    const [ValiMessage, SetMessage] = useState('');
  
    console.log(isEmail)
  
    const HandleCheck = () => {
      SetChecked(!isChecked);
    };
  
    const HandleSubs = (e) => {
      e.preventDefault();
      if (isChecked) {
        toast.success("성공");
      } else {
        toast.error("이메일 체크 및 개인정보 수집 및 이용에 동의해주세요");
      }
    };
  
    const ValidateEmail = (e) => {
      const emailRegex  = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const email = e.target.value;
      SetEmail(email);
      // console.log(email);
      // console.log(emailRegex.test(email));
  
      if(!emailRegex.test(email)){
        SetMessage('올바른 이메일 형식이 아닙니다.😭');
        SetIsEmail(false);
      }else {
        SetMessage('올바른 이메일 형식이에요!👍');
        SetIsEmail(true);
      }
    }

    const ResetMessage = () => {
      SetMessage('');
    }

  return (
    <Layout>
      <Box fill justify='center' align='center'>
        <div className='LetterHeader'>
          <h3>라이팅젤이 격주 1회 뉴스레터를 보내드립니다.</h3>
          <h4>인공지능 글쓰기 트렌드, 인공지능이 창작한 글,</h4>
          <h4>라이팅젤 주요 소식, 사용 방법 등을 알려 드립니다.</h4>
        </div>

        <Box fill justify='center' align='center' pad='large'>
          <div className='FormInputs'>
            <input type='text' placeholder='이름' style={{marginBottom:'15px'}}/>
          </div>

          <div className='FormInputs'>
            <input type='text' placeholder='이메일' onChange={ValidateEmail} onFocus={ValidateEmail} onBlur={ResetMessage}/>
            <p>{ValiMessage}</p>
            
          </div>
          <div className='CheckSubs'>
            <label>
              <input onClick={HandleCheck} type='checkbox' className='checkStyle' />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <button onClick={(e)=>HandleSubs(e)} type='submit' disabled={!isEmail} className={isEmail ? 'subsBtn ' : 'error'} >
            {isEmail ? '라이팅젤 레터 신청하기' : '빈 칸을 채워주세요!'}
            </button>
          </div>
        </Box>

        <Box fill justify='center' align='center' pad="large" className='PrevLetter'>
          <div className="preHeader">지난 레터</div>
          <Grid  columns={ size !== "small" ? { count: 4, size: "auto" } : '100%'}
          gap='medium'
          fill={size !== 'small' ? false : true}
          pad="large"
          >
            <Card pad='large'>지난 레터1</Card>
            <Card pad='large'>지난 레터2</Card>
            <Card pad='large'>지난 레터3</Card>
            <Card pad='large'>지난 레터4</Card>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default NewsLetter;
