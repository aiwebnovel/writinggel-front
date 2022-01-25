import React, { useState } from "react";
import ScrollToTop from "../../../routes/ScrollToTop";
import ServiceLayout from "../Layout";
import Modal from "../../SmallModal";

import { Box } from "grommet";
import { FormDown, Download } from "grommet-icons";
import { toast } from "react-toastify";

import styled from "styled-components";

const RelayNovel = () => {
  const [english, setReveal] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isSet, setIsset] = useState(false);
  const [options, setOptions] = useState("");
  const [Input, setInput] = useState({
    Main_character: "",
    Place: "",
    Time: "",
    Main_Events: "",
    Theme: "",
  });

  const { Main_character, Place, Time, Main_Events, Theme } = Input;

  const onSelect = (e) => {
    setOptions(e.target.value);
    console.log(e.target.value);
  };

  const HandleInput = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const HandleModals = () => {
    setOpen(!isOpen);
  };

  const GoRelay = () => {
    if (
      options !== "" &&
      Main_character !== "" &&
      Place !== "" &&
      Time !== "" &&
      Main_Events !== "" &&
      Theme !== ""
    ) {
      setIsset(true);
    } else {
      toast.error("빈 칸을 채워주세요!");
      // toast.error(
      //   `${options} / ${Main_character} / ${Place} / ${Time} / ${Theme} / ${Main_Events} `
      // );
    }
  };

  return (
    <>
      <ServiceLayout>
        <ScrollToTop />
        <Box
          className='ServiceContainer RelayPad'
          background='#f9f9f9'
          align='center'
        >
          {!isSet && (
            <div className='RelayContainer'>
              <div>
                <h2>❗️ 기본 설정을 세팅해주세요.</h2>
              </div>
              <Box align='center' pad='large'>
                <select
                  defaultValue='default'
                  className='RelaySelect'
                  onChange={onSelect}
                >
                  <option value='default' disabled>
                    장르를 선택해주세요! ✔
                  </option>
                  <option value='fan'>판타지</option>
                  <option value='modernFan'>현대 판타지</option>
                  <option value='action'>무협</option>
                  <option value='mystery'>미스터리</option>
                  <option value='romanFan'>로맨스 판타지</option>
                </select>
                <div className='RelayStyle'>
                  <div className='RelayPanelStyle'>
                    <h4>주요 인물</h4>
                    <div className='RelayInput'>
                      <input
                        required
                        type='text'
                        name='Main_character'
                        onChange={HandleInput}
                      />
                    </div>
                  </div>
                  <div className='RelayPanelStyle'>
                    <h4>장소</h4>
                    <div className='RelayInput'>
                      <input
                        required
                        type='text'
                        name='Place'
                        onChange={HandleInput}
                      />
                    </div>
                  </div>
                  <div className='RelayPanelStyle'>
                    <h4>시간</h4>
                    <div className='RelayInput'>
                      <input
                        required
                        type='text'
                        name='Time'
                        onChange={HandleInput}
                      />
                    </div>
                  </div>
                  <div className='RelayPanelStyle'>
                    <h4>주제</h4>
                    <div className='RelayInput'>
                      <input
                        required
                        type='text'
                        name='Theme'
                        onChange={HandleInput}
                      />
                    </div>
                  </div>
                  <div className='RelayPanelStyle'>
                    <h4>주요 사건</h4>
                    <div className='RelayInput'>
                      <input
                        required
                        type='text'
                        name='Main_Events'
                        onChange={HandleInput}
                      />
                    </div>
                  </div>
                  <div className='writeBtn'>
                    <button onClick={GoRelay}>기본 설정 완료</button>
                  </div>
                </div>
              </Box>
            </div>
          )}
          {isSet && (
            <div className='RelayContentContainer'>
              <RelayBox>
                <div className='RelayContent'>
                  <Reset>
                    <button onClick={HandleModals}>기본 설정 변경하기</button>
                  </Reset>
                  <div className='ChatRelay'>
                    <textarea />
                    <div>
                      {" "}
                      <Download />{" "}
                    </div>
                  </div>
                  <button
                    className='RelayEnglish'
                    onClick={() => setReveal(!english)}
                  >
                    <FormDown /> English (Only Read)
                  </button>
                  {english && (
                    <textarea
                      disabled
                      placeholder='영어로 된 결과가 나올 예정입니다.'
                    />
                  )}
                </div>
                <RelayAi>
                  <input
                    type='text'
                    placeholder='이어지는 이야기를 적어보세요. (한 문장만)'
                  />
                  <button>이어쓰기</button>
                </RelayAi>
              </RelayBox>
            </div>
          )}
        </Box>
      </ServiceLayout>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <div>
          <div style={{textAlign: 'center', wordBreak: 'keep-all'}}>
            <p>기존 설정을 변경하게 되면, 지금 내용은 모두 사라집니다.</p>
            <p>진행 하시겠습니까?</p>
          </div>
          <Btns>
            <CancelBtn onClick={HandleModals}>취소</CancelBtn>
            <ConfirmBtn onClick={() =>{
               setIsset(false)
               setOpen(false)
            }}>확인</ConfirmBtn>
          </Btns>
        </div>
      </Modal>
    </>
  );
};

export default RelayNovel;

const RelayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Reset = styled.div`
  width: 100%;
  text-align: right;

  > button {
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 1rem;
    border-bottom: 1px solid #444;
    cursor: pointer;

    &:hover {
      font-weight: 600;
    }
  }
`;

const RelayAi = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  max-width: 700px;

  > input {
    width: 100%;
    max-width: 600px;
    height: 35px;
    font-size: 1rem;
    padding: 8px;
  }

  > button {
    background-color: #ffce1f;
    border: 0;
    outline: 0;

    padding: 8px 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      background-color: #ff9300;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    > button {
      width: 100%;
    }
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
`;

const CancelBtn = styled.button`
  background-color: #f45752;
  border: 1px solid #f45752;
  padding: 5px 10px;
  font-size: 1rem;
  width: 100px;
  cursor: pointer;
  color: #fff;
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
