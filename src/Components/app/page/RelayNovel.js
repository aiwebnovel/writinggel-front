import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../../routes/ScrollToTop";
import ServiceLayout from "../Layout";
import Modal from "../../SmallModal";
import CopyToClipboard from "react-copy-to-clipboard";
import * as configUrl from "../../../config";
import TagManager from "react-gtm-module";

import Loading from "../../Loading";

import { Box } from "grommet";
import { FormDown, Download, Clone } from "grommet-icons";
import { toast } from "react-toastify";

import styled from "styled-components";

const RelayNovel = () => {
  const loginCheck = sessionStorage.getItem("token");
  const History = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [Copied, SetCopy] = useState(false);
  const [english, setReveal] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isSet, setIsset] = useState(false);
  const [options, setOptions] = useState("default");
  const [follow, setFollow] = useState("");
  const [Input, setInput] = useState({
    Main_character: "",
    Place: "",
    Time: "",
    Main_Events: "",
    Theme: "",
  });
  const [output, setOutput] = useState({
    outputKr: "",
    outputEng: "",
  });

  const { Main_character, Place, Time, Main_Events, Theme } = Input;
  const { outputKr, outputEng } = output;

  const onSelect = (e) => {
    setOptions(e.target.value);
    //console.log(e.target.value);
  };

  const HandleInput = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
    //console.log(e.target.value);
  };

  const HandleFollow = (e) => {
    const sentence = e.target.value;
    setFollow(sentence);
    //console.log(sentence);
  };

  const HandleModals = () => {
    setOpen(!isOpen);
  };

  const GoRelay = async () => {
    if (count === 0 && isBill === false) {
      setOpen(true);
    } else {
      if (
        options !== "" &&
        Main_character !== "" &&
        Place !== "" &&
        Time !== "" &&
        Main_Events !== "" &&
        Theme !== ""
      ) {
        if (outputKr === "") {
          const config = {
            method: "post",
            url: `${configUrl.SERVER_URL}/writinggel/novelpackage`,
            headers: { authentication: loginCheck },
            data: {
              option: "start",
              Theme: Theme,
              Main_character: Main_character,
              Genre: options,
              Place: Place,
              Main_event: Main_Events,
              Period: Time,
              StoryFollow: "",
            },
          };
          setLoading(true);

          await axios(config)
            .then(async (response) => {
              console.log(response);
              const data = response.data;

              if (data[0] === "") {
                toast.error(
                  "적어주신 키워드가 적절하지 않거나 결과가 나오지 않았습니다.😭 재시도 해주세요!"
                );
                setLoading(false);
              } else {
                setOutput({
                  ...output,
                  outputKr: data[0],
                  outputEng: data[1],
                });
                setIsset(true);
                setLoading(false);
              }

              if (response.data[2] >= 2) {
                toast.error(`결과물에 유해한 내용이 들어가 버렸어요. 😭 `);
              }
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
        } else {
          if (follow !== "") {
            setLoading(true);
            const newOutputKr = outputKr + `\n` + follow + `\n`;

            // console.log(outputKr);
            // console.log(follow);
            console.log(newOutputKr);

            const configFollow = {
              method: "post",
              url: `${configUrl.SERVER_URL}/writinggel/novelpackage`,
              headers: { authentication: loginCheck },
              data: {
                option: "follow",
                Theme: Theme,
                Main_character: Main_character,
                Genre: options,
                Place: Place,
                Main_event: Main_Events,
                Period: Time,
                StoryFollow: newOutputKr,
              },
            };

            await axios(configFollow)
              .then(async (response) => {
                console.log(response);
                const data = response.data;
                if (data[0] === "") {
                  toast.error(
                    "적어주신 키워드가 적절하지 않거나 결과가 나오지 않았습니다.😭 재시도 해주세요!"
                  );
                  setLoading(false);
                } else {
                  const AllOutput = newOutputKr + data[0];
                  const replaceOutput = AllOutput.replaceAll("-", "");
                  setOutput({
                    ...output,
                    outputKr: replaceOutput,
                    outputEng: outputEng + data[1],
                  });
                  setFollow("");
                  setLoading(false);
                }
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
          } else {
            toast.error("이어갈 문장을 써주세요!");
          }
        }
      } else {
        toast.error("빈 칸을 채워주세요!");
      }
    }
  };

  const onCopied = () => {
    if (outputKr === "") {
      toast.warn("복사할 내용이 없어요!😭");
    } else {
      SetCopy(true);
      toast.success("Copied!");
    }
  };

  const ResetAll = () => {
    setIsset(false);
    setOpen(false);
    setOutput({
      ...output,
      outputKr: "",
      outputEng: "",
    });
  };

  const SaveContent = async () => {
    //console.log(outputKr.replaceAll(`\n`,""));
    if (output) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: loginCheck },
        data: {
          story: outputKr,
          category: "1:1 릴레이 소설",
        },
      };

      await axios(config)
        .then(async (response) => {
          //console.log('성공?', response.data)
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (error.response.status === 403) {
            toast.error("보관함이 꽉 찼습니다!");
          }

          if (error.response.status === 500) {
            toast.error(
              "여러 번 시도 후에도 똑같은 오류가 뜰 시, 해당 에러는 관리자에게 문의해주세요."
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
      History.push("/service/relaynovel");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/app/relaynovel",
        pageTitle: "1:1 릴레이 소설",
      },
    });
  }, []);

  return (
    <>
      <ServiceLayout>
        <ScrollToTop />
        {isLoading && <Loading />}
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
                  defaultValue={options}
                  className='RelaySelect'
                  onChange={onSelect}
                >
                  <option value='default' disabled>
                    장르를 선택해주세요! ✔
                  </option>
                  <option value='판타지'>판타지</option>
                  <option value='현판'>현대 판타지</option>
                  <option value='무협'>무협</option>
                  <option value='미스터리'>미스터리</option>
                  <option value='로판'>로맨스 판타지</option>
                </select>
                <div className='RelayStyle'>
                  <div className='RelayPanelStyle'>
                    <h4>주요 인물</h4>
                    <div className='RelayInput'>
                      <input
                        required
                        type='text'
                        name='Main_character'
                        value={Main_character}
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
                        value={Place}
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
                        value={Time}
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
                        value={Theme}
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
                        value={Main_Events}
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
                    <div className='RelayOutputBox'>{outputKr}</div>
                    <div className='RelayIconBox'>
                      <CopyToClipboard text={outputKr} onCopy={onCopied}>
                        <Clone style={{ cursor: "pointer" }} />
                      </CopyToClipboard>
                      <Download onClick={SaveContent} />
                    </div>
                  </div>
                  <button
                    className='RelayEnglish'
                    onClick={() => setReveal(!english)}
                  >
                    <FormDown /> English (Only Read)
                  </button>
                  {english && (
                    <div
                      className='RelayOutputBox'
                      style={{ border: "1px solid #444" }}
                    >
                      {outputEng}
                    </div>
                  )}
                </div>
                <RelayAi>
                  <input
                    type='text'
                    placeholder='이어지는 이야기를 적어보세요. (한 문장만)'
                    value={follow}
                    onChange={HandleFollow}
                  />
                  <button onClick={GoRelay}>이어쓰기</button>
                </RelayAi>
              </RelayBox>
            </div>
          )}
        </Box>
      </ServiceLayout>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <div>
          <div style={{ textAlign: "center", wordBreak: "keep-all" }}>
            <p>기존 설정을 변경하게 되면, 지금 내용은 모두 사라집니다.</p>
            <p>진행 하시겠습니까?</p>
          </div>
          <Btns>
            <CancelBtn onClick={HandleModals}>취소</CancelBtn>
            <ConfirmBtn onClick={ResetAll}>확인</ConfirmBtn>
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
    color: #444;

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
    border: 1px solid #444;
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
