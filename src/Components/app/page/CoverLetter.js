import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import ScrollToTop from "../../../routes/ScrollToTop";
import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import Modal from "../../SmallModal";

import { Box, ResponsiveContext } from "grommet";

import styled from "styled-components";

const CoverLetter = () => {
  const size = useContext(ResponsiveContext);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
const [unexceptable, setexceptable] = useState(false);
  
const [selectOption, setOption] = useState('');
const [input, setInput] = useState('');

  const HandleModals = () => {
    setOpen(!isOpen);
  };

  const ExceptableModals = () => {
    setexceptable(!unexceptable);
  };

  const onSelect = (e) => {
    setOption(e.target.value);
    console.log(e.target.value);
  }

  const OnChangeInput = (e) => {
    setInput(e.target.value);
}

  const MakeCoverLetter = () => {
    if(selectOption === '' || input === '') {
        setexceptable(true);
    } else {
        console.log('test');
    }
  }

  return (
    <>
      <ServiceLayout>
        <ScrollToTop />
        {isLoading && <Loading />}
        <CoverBox
          className='ServiceContainer'
          align='center'
          background='#f9f9f9'
        >
          <div className='CoverQuestion'>
            <h4>
              필수 입력<span style={{ color: "red" }}>*</span>
            </h4>
            <select 
            defaultValue='default'
            onChange={onSelect}
            >
              <option value='default' disabled>
                공통 질문을 선택해주세요
              </option>
              <option value='1'>1. 진로 관련 학습 경험 및 교내활동</option>
              <option value='2'>2. 타인과 공동체를 위한 노력한 경험</option>
            </select>
            <label>
              <input
                type='text'
                placeholder='지원하는 전공을 입력하세요(ex: 국어국문학)'
                value={input}
                onChange={OnChangeInput}
              
              />
            </label>
            <Extra> 
              <p>
                ∙ 고등학교 재학 중 경험 바탕{" "}
                <span style={{ color: "red" }}>*</span>
              </p>
              <p>
                ∙ 검정고시 출신자는 중학교 졸업 후 고등학교 재학 기간에 준하는
                기간의 경험 <span style={{ color: "red" }}>*</span>
              </p>
            </Extra>
            <BtnBox>
              <button onClick={ MakeCoverLetter}>간단 자소서 완성</button>
            </BtnBox>
          </div>

          <div className='CoverContent'>
            <div style={{color : 'gray'}}>결과가 나올 창입니다.</div>
            <div style={{color : 'gray'}}>영어로 결과가 나올 창입니다.</div>
          </div>
        </CoverBox>
      </ServiceLayout>

      {/* 채워야하는 칸들이 공백일 시 */}
      <Modal onClick={ExceptableModals} open={unexceptable} close={ExceptableModals}>
      <ConfirmDiv>
          <h3>필수 입력 부분을 모두 채워주세요!</h3>
          <ConfirmBtn onClick={ExceptableModals}>확인</ConfirmBtn>
        </ConfirmDiv>
      </Modal>

      {/* 결제 안했는데 무료 사용 다 썼을 때 */}
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
      <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleModals}>취소</button>
          <Link to='/signIn'>
            <button>멤버십 가입하기</button>
          </Link>
        </div>
      </Modal>

    </>
  );
};

export default CoverLetter;

const CoverBox = styled(Box)`
  padding: 150px 30px;
`;

const Extra = styled.div`
    padding: 8px 0 20px 0;

  >  p {
        font-size: 0.95rem;
        word-break : keep-all;
        text-indent: -15px;
        padding-left: 15px;
    }
`

const BtnBox = styled.div`
    margin-bottom : 45px;
    text-align : center;

    > button {
    width: 100%;
    background-color: #372874;
    border: 1px solid #372874;
    color: #fff;
    padding: 8px 10px;
    font-size: 1em;
    cursor : pointer;
    transition : all 300ms ease

    }

    > button:hover {
        background-color: #ffce1f;
        border: 1px solid #ffce1f;
        color : #444;
    }
`;

const ConfirmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  > h3 {
      font-size : 1rem;
  }
`;

const ConfirmBtn = styled.button`
  background-color: #ffce1f;
  border: 1px solid #ffce1f;
  padding: 5px 10px;
  font-size: 1rem;
  width: 100px;
  cursor: pointer;
  color: #444;
`;
