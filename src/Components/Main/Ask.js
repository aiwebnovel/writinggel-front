import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { Box, FormField } from "grommet";

import styled from "styled-components";

const Ask = () => {
  // const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box fill justify='center' align='center'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          pad='large'
          className='AskHeader'
        >
          <h2>문의사항을 보내주세요!</h2>
          <h3>근무일 기준 3일 내 답변 드리겠습니다.</h3>
          <Link to='/faq'>
            <button className='goFaq'>자주 묻는 질문</button>
          </Link>
        </Box>
        <Box fill justify='center' align='center' pad='large'>
          <FormBox>
            <FormField label='이메일' name='email' className='FieldStyle'>
              <input
                type='text'
                placeholder='ex) 아이디@xxxx.com'
                className='EmailInput'
              />
            </FormField>
            <FormField label='연락처' name='phone' className='FieldStyle'>
              <input
                type='text'
                placeholder='ex) 010-0000-0000'
                className='PhoneInput'
              />
            </FormField>
            <FormField label='문의유형' name='phone' className='FieldStyle'>
              <select className='selectStyle'>
                <option value='' disabled>문의 유형을 선택해주세요!</option>
                <option value='이용문의'>이용 문의</option>
                <option value='오류신고'>오류 신고</option>
                <option value='서비스제안'>서비스 제안</option>
                <option value='환불'>환불</option>
                <option value='탈퇴'>탈퇴</option>
                <option value='기타'>기타</option>
              </select>
            </FormField>
            <FormField label='문의내용' name='content' className='FieldStyle'>
              <textarea
                placeholder='문의 내용을 채워주세요!'
                className='textareaStyle'
              ></textarea>
            </FormField>
            <div className='SubmitBox'>
              <button>보내기</button>
            </div>
          </FormBox>
        </Box>
      </Box>
    </Layout>
  );
};

export default Ask;

const FormBox = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
