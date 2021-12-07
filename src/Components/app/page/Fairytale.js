import {
  Box,
  Grid,
  ResponsiveContext,
} from "grommet";
import { Update, Close, Add, Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { OuterClick } from "react-outer-click";
import ScrollToTop from '../../../routes/ScrollToTop';


import ServiceLayout from "../Layout";
import styled from "styled-components";
import Loading from "../../Loading";
import * as configUrl from "../../../config";
import ProgressBar from "@ramonak/react-progress-bar";

//const LanguageDetect = require("languagedetect");

const Fairytale = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isSider, SetSider] = useState(false);
  const [isOpen, SetOpen] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [isHuman, SetIsHuman] = useState(false);
  const [Output, SetOutput] = useState(["", ""]);
  const [OutputTemp, SetOutputTemp] = useState("");
  const [tempLength, SetLength] = useState(0);
  const [newLength, SetNewLength] = useState(0);

  const [ContinueStory, SetContinue] = useState("이어쓰기");

  const handleSider = () => {
    SetSider(!isSider);
  };

  const handleOpen = () => {
    SetSider(false);
    SetOpen(!isOpen);
  };

  const [category, Setcategory] = useState({
    mainCharacter: "", //Main_Character 주요 인물,
    period: "", //Period 시간 (api 문서에서는 time)
    location: "", //Location 장소
    theme: "", //Theme 주제
    mainEvent: "", //주요 사건 (api 문서에서는 Period)
  });

  const HandleInput = (e) => {
    Setcategory({ ...category, [e.target.name]: e.target.value });
  };

  const HandleStory = (e) => {
    SetOutput([e.target.value, Output[1]]);
    SetContinue("이어쓰기");
    let OutputLength = e.target.value.length; //결과물+사람이 새로 쓴 문장 총 길이
    let Length = OutputLength - tempLength; // 사람이 쓴 것까지 합한 문장 길이 - 결과물 길이
    SetNewLength(Length);
    console.log(Output[0], OutputLength, tempLength, Length);
    console.log(newLength);

    if (newLength > 100) {
      SetContinue("Continue");
    }
  };

  const NewStory = async () => {
    console.log(category);
    if (
      category.mainCharacter.length > 0 &&
      category.period.length > 0 &&
      category.location.length > 0 &&
      category.mainEvent.length > 0 &&
      category.theme.length > 0
    ) {
      //  if (Output[0] !=='') {
      SetLoading(true);
      SetOutput(["", ""]);
      SetOutputTemp("");
      SetLength(0);
      SetNewLength(0);

      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/fairytale`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          Story: "",
          Time: category.period,
          Main_character: category.mainCharacter,
          Period: category.mainEvent,
          Location: category.location,
          Theme: category.theme,
        },
      };

      await axios(config)
        .then((response) => {
          console.log(response.data);

          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않거나 결과가 잘 나오지 않은 것 같습니다.😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            console.log(Output[0], Output[0].length);
            //인공지능이 새로 만들어주는 결과물 -> 아예 새로운 도입부만 필요한 거니까 response만 넣어줌
            SetOutput([response.data[0], response.data[1]]);
            //인공지능 결과물 담기(사람이 추가로 쓴 것과 길이 비교 위함.)
            SetOutputTemp(response.data[0]);

            SetLength(response.data[0].length);
            SetContinue("이어쓰기");
            SetIsHuman(true);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          }
        })
        .finally(() => {
          SetLoading(false);
        });
    } else {
      toast.error("빈 칸을 모두 채워주세요!");
      SetLoading(false);
    }
  };

  const ContinueFairy = async () => {
    if (newLength > 100) {
      SetLoading(true);

      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/fairytale`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          Story: Output[0],
          Time: category.period,
          Main_character: category.mainCharacter,
          Period: category.mainEvent,
          Location: category.location,
          Theme: category.theme,
        },
      };

      await axios(config)
        .then((response) => {
          //console.log(response.data);
          if (response.data[0] === "") {
            toast.error(
              "결과물에 유해한 내용이 들어가 버렸어요. 😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            SetOutput([
              Output[0] + response.data[0],
              Output[1] + response.data[1],
            ]);
            SetOutputTemp(Output[0] + response.data[0]);
            SetLength((Output[0] + response.data[0]).length);
            SetNewLength(0);
            SetContinue("이어쓰기");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          }
          if (error.response.status === 412) {
            toast.error("새로고침 혹은 재로그인 해주세요!");
          }
        })
        .finally(() => {
          SetLoading(false);
        });
    } else {
      toast.info(`${100 - newLength}자를 더 채워주세요!`);
    }
  };

  const SaveContent = async () => {
    if (Output) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: Output[0],
          category: "동화",
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
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  const ResetData = () => {
    Setcategory({
      mainCharacter: "", //Main_Character 주요 인물,
      period: "", //Period 시간 (api 문서에 time에 넣을 것)
      location: "", //Location 장소
      theme: "", //Theme 주제
      mainEvent: "", //주요 사건 (api 문서에서는 Period)
    });
    SetOutput(["", ""]);
    SetOutputTemp("");
    SetLength(0);
    SetNewLength(0);
    SetContinue("이어쓰기");
    SetIsHuman(false);
    handleSider(false);
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/service/fairytale");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
      //console.log(OutputTemp, tempLength);
    }
  }, []);

  return (
    <ServiceLayout>
       <ScrollToTop/>
      {isLoading && <Loading />}
      <Box className='ServiceContainerVh' background='#f9f9f9'>
        <Grid
          fill
          rows={size !== "small" ? ["auto", "flex"] : ["auto", "auto"]}
          columns={size !== "small" ? ["auto", "flex"] : ["auto"]}
          areas={
            size !== "small"
              ? [
                  { name: "sidebar", start: [0, 0], end: [0, 1] },
                  { name: "main", start: [1, 0], end: [1, 1] },
                ]
              : [
                  { name: "sidebar", start: [0, 0], end: [0, 0] },
                  { name: "main", start: [0, 1], end: [0, 1] },
                ]
          }
        >
          {isSider ? (
            <Box gridArea='sidebar' className='sideContainer' gap='medium'>
              <OuterClick
                onOuterClick={(event) => {
                  //event.preventDefault();
                  //console.log("Clicked outside");
                  SetSider(false);
                }}
              >
                <SiderBtn onClick={handleSider}>
                  <Close />
                </SiderBtn>
                <Box align='center' gap='large'>
                  <div className='AcoStyle'>
                    <div className='AcoPanelStyle'>
                      <h4>주요 인물</h4>
                      <div className='AcoInput'>
                        <input
                          required
                          type='text'
                          name='mainCharacter'
                          value={category.mainCharacter}
                          onChange={(e) => HandleInput(e)}
                        />
                      </div>
                    </div>
                    <div className='AcoPanelStyle'>
                      <h4>시간</h4>
                      <div className='AcoInput'>
                        <input
                          required
                          type='text'
                          name='period'
                          value={category.period}
                          onChange={(e) => HandleInput(e)}
                        />
                      </div>
                    </div>
                    <div className='AcoPanelStyle'>
                      <h4>장소</h4>
                      <div className='AcoInput'>
                        <input
                          required
                          type='text'
                          name='location'
                          value={category.location}
                          onChange={(e) => HandleInput(e)}
                        />
                      </div>
                    </div>
                    <div className='AcoPanelStyle'>
                      <h4>주제</h4>
                      <div className='AcoInput'>
                        <input
                          required
                          type='text'
                          name='theme'
                          value={category.theme}
                          onChange={(e) => HandleInput(e)}
                        />
                      </div>
                    </div>
                    <div className='AcoPanelStyle'>
                      <h4>주요 사건</h4>
                      <div className='AcoInput'>
                        <input
                          required
                          type='text'
                          name='mainEvent'
                          value={category.mainEvent}
                          onChange={(e) => HandleInput(e)}
                        />
                      </div>
                    </div>
                    <div className='writeBtn'>
                      <button
                        onClick={() => {
                          NewStory();
                          //FairytaleAxios();
                        }}
                      >
                        write
                      </button>
                    </div>
                  </div>
                </Box>
              </OuterClick>
            </Box>
          ) : (
            <Box
              gridArea='sidebar'
              className='isSiderFalse'
          
            >
              <div className='SiderBtn' onClick={handleSider}>
                <Add size='small' />
                <span>열기</span>
              </div>
              <div className='OpenBtn' onClick={handleOpen}>
                <span>📌 필독</span>
              </div>
            </Box>
          )}

          {isOpen && (
            <Box
              gridArea='sidebar'
              className='sideContainer'
              gap={size !== "small" && "medium"}
            >
              <OuterClick
                onOuterClick={(event) => {
                  //event.preventDefault();
                  //console.log("Clicked outside");
                  SetOpen(false);
                }}
              >
                <div className='CloseSiderBtn' onClick={handleOpen}>
                  <Close />
                </div>
                <Box className='guide-Accordion'>
                  <div className='guide-PanelHeader'>Q. How to Use?</div>

                  <div className='guide-PanelContent '>
                    <h4>💫 팅젤이와 함께 글 쓰는 TING!</h4>
                    <div>
                      <img src='/tinggle.png' alt='tingting' />
                      <div>
                        <p>1. 원하는 키워드나 글을 입력해주세요!</p>
                        <p>
                          2. write 버튼을 누르면 팅젤이가 여러분의 글 위에
                          아이디어💡를 얹어줄거에요!
                        </p>
                        <p>3. 팅젤이가 얹어준 아이디어를 활용해봐요!</p>
                      </div>
                    </div>
                  </div>
                </Box>
              </OuterClick>
            </Box>
          )}

          <Box
            fill
            gridArea='main'
            className='FairymainBox'
            align='center'
          >
            <div className='FairyOutputBox'>
              <textarea
                className='output1'
                placeholder='결과가 나올예정이에요!'
                onChange={(e) => HandleStory(e)}
                value={Output[0]}
              ></textarea>
              <textarea
                className='output2'
                placeholder='영어가 들어갈 예정입니다!'
                value={Output[1]}
                readOnly
              ></textarea>
            </div>
            <div className='goingContainer'>
              <button
                disabled={!isHuman}
                className={isHuman ? "KeepFairyBtn" : "NotYetBtn"}
                onClick={ContinueFairy}
              >
                {ContinueStory}
              </button>
              {/* <div className='progress'> */}
              <ProgressBar
                completed={newLength}
                bgColor='#3D138D'
                width={size !== "small" ? "300px" : "250px"}
                height='15px'
                margin='0 auto'
                isLabelVisible={false}
              />
            </div>
            <Icons>
              <Download onClick={SaveContent} />
              <Update onClick={NewStory} /> <Close onClick={ResetData} />
            </Icons>
          </Box>
        </Grid>
      </Box>
    </ServiceLayout>
  );
};

export default Fairytale;

const Icons = styled.div`
  padding: 10px 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

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

const SiderBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 10px;
  cursor: pointer;
  color: #444;
  font-size: 13x;
  font-weight: 600;
`;
