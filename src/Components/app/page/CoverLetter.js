import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../../routes/ScrollToTop";
import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import Modal from "../../SmallModal";

import * as configUrl from "../../../config";

import TagManager from "react-gtm-module";
import { toast } from "react-toastify";
import { Box } from "grommet";
import { Download, Close } from "grommet-icons";

import styled from "styled-components";

const CoverLetter = () => {
  const loginCheck = sessionStorage.getItem("token");
  const History = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [unexceptable, setexceptable] = useState(false);
  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");

  const [selectOption, setOption] = useState("default");
  const [input, setInput] = useState("");
  const [resume, setResume] = useState({
    outputKr: "",
    outputEng: "",
  });

  const { outputKr, outputEng } = resume;

  const HandleModals = () => {
    setOpen(!isOpen);
  };

  const ExceptableModals = () => {
    setexceptable(!unexceptable);
  };

  const onSelect = (e) => {
    setOption(e.target.value);
  
  };

  const OnChangeInput = (e) => {
    setInput(e.target.value);
  };

  const MakeCoverLetter = async () => {
    if (count === 0 && isBill === false) {
      setOpen(true);
    } else {
      if (selectOption === "default" || input === "") {
        setexceptable(true);
      } else {
        setLoading(true);
       
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/writinggel/resume`,
          headers: { authentication: loginCheck },
          data: {
            question: parseInt(selectOption),
            major: input,
          },
        };

        await axios(config)
          .then(async (response) => {
            //console.log(response);
            const data = response.data;
            if (data[0] === "") {
              toast.error('결과가 나오지 않았습니다😭');
            } else {
              setResume({ ...resume, outputKr: data[0], outputEng: data[1] });
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              setLoading(false);
              toast.info(
                "무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!",
                {
                  icon: "⚠️",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                }
              );
            }
            if (error.response.status === 500) {
              setLoading(false);
              toast.info(
                "여러 번 새로고침 후에도 똑같은 오류가 뜰 시, 해당 오류는 관리자에게 문의 해주세요.",
                {
                  icon: "⚠️",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                }
              );
            }
            setLoading(false);
          });
      }
    }
  };

  const ResetData = () => {
    setOption("default");
    setInput("");
    setResume({
      ...resume,
      outputKr: "",
      outputEng: "",
    });
  
  };

  const SaveContent = async () => {
    if (outputKr) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: loginCheck },
        data: {
          story: outputKr,
          category: "대입 자소서 완성",
        },
      };

      await axios(config)
        .then(async (response) => {
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("보관함이 꽉 찼습니다!");
          }

          if (error.response.status === 500) {
            toast.error(
              "여러 번 새로고침 후에도 똑같은 오류가 뜰 시, 해당 에러는 관리자에게 문의해주세요!"
            );
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  useEffect(() => {
    if (loginCheck !== null) {
      axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: loginCheck },
        })
        .then((res) => {
          // console.log(res)
          let count = res.data.membership_count;
          SetCount(count);
          SetBill(res.data.isBill);
        });
    } else {
      History.push("/service/coverletter");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/app/coverletter",
        pageTitle: "대입 자소서 완성",
      },
    });
  }, []);

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
              className='CoverSelect'
              value={selectOption}
              onChange={onSelect}
            >
              <option value='default' disabled>
                공통 질문을 선택해주세요 ✔️
              </option>
              <option value='1'>1. 진로 관련 학습 경험 및 교내활동</option>
              <option value='2'>2. 타인과 공동체를 위한 노력한 경험</option>
              <option value='3'>3. 지원동기와 지원하기 위해 노력한 과정</option>
            </select>
            <label>
              <input
                type='text'
                placeholder='지원하는 전공을 입력하세요(ex: 컴퓨터공학)'
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
              <button onClick={MakeCoverLetter}>간단 자소서 완성</button>
            </BtnBox>
          </div>

          <div className='CoverContent'>
            <Icons>
              <Close onClick={ResetData} />
              <Download onClick={SaveContent} />
            </Icons>
            <textarea
              readOnly
              placeholder='결과가 나올 창입니다.'
              value={outputKr}
            >
              {outputKr}
            </textarea>
            <textarea
              readOnly
              placeholder='영어로 결과가 나올 창입니다.'
              value={outputEng}
            >
              {outputEng}
            </textarea>
          </div>
        </CoverBox>
      </ServiceLayout>

      {/* 채워야하는 칸들이 공백일 시 */}
      <Modal
        onClick={ExceptableModals}
        open={unexceptable}
        close={ExceptableModals}
      >
        <ConfirmDiv>
          {selectOption === "default" && input === "" && (
            <h3>필수 항목을 전부 채워주세요!</h3>
          )}
          {selectOption === "default" && input !== "" && (
            <h3>자기소개서 공통 질문을 선택하세요!</h3>
          )}
          {selectOption !== "default" && input === "" && (
            <h3>희망하는 전공을 채워주세요!</h3>
          )}
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

  > p {
    font-size: 0.95rem;
    word-break: keep-all;
    text-indent: -15px;
    padding-left: 15px;
  }
`;

const BtnBox = styled.div`
  margin-bottom: 45px;
  text-align: center;

  > button {
    width: 100%;
    background-color: #372874;
    border: 1px solid #372874;
    color: #fff;
    padding: 8px 10px;
    font-size: 1em;
    cursor: pointer;
    transition: all 300ms ease;
  }

  > button:hover {
    background-color: #ffce1f;
    border: 1px solid #ffce1f;
    color: #444;
  }
`;

const ConfirmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  > h3 {
    font-size: 1rem;
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

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;

  > svg {
    background-color: #444;
    fill: #fff;
    stroke: #fff;
    padding: 2px;
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
