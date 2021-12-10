import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OuterClick } from "react-outer-click";

import { Box, Grid, ResponsiveContext } from "grommet";
import { Update, Close, Add, Download } from "grommet-icons";
import * as configUrl from "../../../config";

import ProgressBar from "@ramonak/react-progress-bar";
import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import styled from "styled-components";
import ScrollToTop from '../../../routes/ScrollToTop';
import Modal from "../../SmallModal";

const LanguageDetect = require("languagedetect");

const Webnovel = () => {
  const History = useHistory();
  const size = useContext(ResponsiveContext);
  //const { pathname } = useLocation();


  const [options, SetOptions] = useState([
    "판타지",
    "현판",
    "무협",
    "미스터리",
    "로판",
  ]);
  const [selectOptions, SetSelectOptions] = useState("");
  const [subInput, SetSubInput] = useState({
    Main_character: "",
    Place: "",
    Time: "",
    Main_Events: "",
    Material: "",
  });

  const [output, SetOutput] = useState({
    outputKorean: "",
    outputEnglish: "",
    result: "",
    tempLength: 0,
    tempWrite: "",
  });

  const [isHuman, SetHuman] = useState(false);
  const [isChange, SetChange] = useState(false);
  const [Start, SetStart] = useState("이어쓰기");
  const [progress, SetProgress] = useState(0);

  const [isLoading, SetLoading] = useState(false);
  const [isSider, SetSider] = useState(false);
  const [isOpen, SetOpen] = useState(false);

  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [CountModal, SetCountModal] = useState(false);

  const { Main_character, Place, Time, Main_Events, Material } = subInput;
  const { outputKorean, outputEnglish, tempLength } = output;

  const handleSider = () => {
    SetSider(!isSider);
  };

  const handleOpen = () => {
    SetSider(false);
    SetOpen(!isOpen);
  };

  const HandleSmallModals = () => {
    SetCountModal(!CountModal);
  };

  const onSelect = (e) => {
    SetSelectOptions(e.target.value);
  };

  const NoticeWriteIcon = () => {
    if (outputKorean === "") {
      toast.warning("+열기 버튼을 눌러 키워드를 넣어주세요!");
    } else {
      return;
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length < 20 && e.target.name === "Main_Events") {
      SetSubInput({
        ...subInput,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.value.length < 10) {
      SetSubInput({
        ...subInput,
        [e.target.name]: e.target.value,
      });
    } else {
      toast.error(`${e.target.value.length}글자를 넘어갈 수 없어요!😭 `);
    }
  };

  const HandleStory = async (e) => {
    SetOutput({ ...output, outputKorean: e.target.value });
    SetChange(true);

    // console.log("output", outputKorean.length);
    // console.log("temp", tempLength);
    // console.log("result", outputKorean.length - tempLength);
    if (isHuman === false) {
      if (outputKorean > 0) {
        SetStart("이어쓰기");
      }
    } else {
      const lngDetector = new LanguageDetect();
      const language = await lngDetector.detect(outputKorean, 1);

      if (progress >= 30) {
        SetStart("Continue");
      }

      if (language[0] === "english") {
        let length = ((outputKorean.length - tempLength) * 100) / 150;
        
        SetProgress(length);
      } else {
        let elseLeng = ((outputKorean.length - tempLength) * 100) / 100;
        //console.log(outputKorean.length, tempLength, elseLeng);
        SetProgress(elseLeng);
      }
    }
  };

  const NewWebNovel = async () => {
    if (count === 0 && isBill === false) {
      SetCountModal(true);
    } else {
    if (localStorage.getItem("token") !== null) {
      if (selectOptions === "") {
        toast.error(`장르를 선택해 주세요!`);
        return;
      } else if (Main_character === "") {
        toast.error(`주인공을 입력해 주세요!`);
        return;
      } else if (Place === "") {
        toast.error(`장소를 입력해 주세요!`);
        return;
      } else if (Time === "") {
        toast.error(`시간대를 입력해 주세요!`);
        return;
      } else if (Main_Events === "") {
        toast.error(`주요 사건을 입력해 주세요!`);
        return;
      } else if (Material === "") {
        toast.error(`소재를 입력해 주세요!`);
        return;
      }
      SetLoading(true);
      SetProgress(0);
      SetOutput({
        outputKorean: "",
        outputEnglish: "",
        result: "",
        tempLength: 0,
        tempWrite: "",
      });
      await axios
        .post(
          `${configUrl.SERVER_URL}/complation`,
          {
            Story: "",
            selectOptions: selectOptions,
            Main_character: Main_character,
            Place: Place,
            Time: Time,
            Main_Events: Main_Events,
            Material: Material,
          },
          {
            headers: { authentication: localStorage.getItem("token") },
            timeout: 100000,
          }
        )
        .then(async (response) => {

          if (response.data[2] >= 2) {
            toast.error(`결과물에 유해한 내용이 들어가 버렸어요. 😭 `);
         
          }

          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            await SetOutput({
              ...output,
              outputKorean: response.data[0],
              outputEnglish: response.data[1],
              result: outputKorean + "\n\n원본\n" + outputEnglish,
              tempLength: response.data[0].length,
              tempWrite: response.data[0],
            });

            await SetChange(false);
            await SetHuman(true);
            toast.info(
              `이어지는 내용을 30자 이상 쓰면, 이야기를 계속 이어갈 수 있습니다.`
            );
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            //console.log('403')
            toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          }
          if (error.response.status === 412) {
            toast.info(`로그인이 필요합니다!`, {
              icon: "🙅‍♀️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
            localStorage.removeItem("token");
          } else {
            if (
              error.response.status === 403 &&
              error.response.data.errorCode === "001"
            ) {
              toast.error(`이야기의 길이가 너무 길어요ㅠ`);
            } else {
              SetOutput({
                ...output,
                result: "해당 오류는 관리자에게 문의해주세요!",
              });
            }
          }
        })
        .finally(() => {
          SetLoading(false);
        });
    } else {
      toast.info("로그인 후 다시 시도해 주세요!", {
        icon: "🙅‍♀️",
        progressStyle: { backgroundColor: "#7D4CDB" },
      });
    }
    }
  };

  const requestcontents = async () => {
    //console.log(progress, isHuman);
    if (localStorage.getItem("token") !== null) {
      let story = outputEnglish;

      if (isHuman === true && progress < 30) {
        toast.error(`추가 이야기의 길이(${30 - progress}자)가 부족해요😭`);
        return;
      } else {
        SetHuman(false);
        SetProgress(0);
      }

      if (isChange === true) {
        story = outputKorean;
      }
      if (selectOptions === "") {
        toast.error(`장르를 선택해 주세요!`);
        return;
      } else if (Main_character === "") {
        toast.error(`주인공을 입력해 주세요!`);
        return;
      } else if (Place === "") {
        toast.error(`장소를 입력해 주세요!`);
        return;
      } else if (Time === "") {
        toast.error(`시간대를 입력해 주세요!`);
        return;
      } else if (Main_Events === "") {
        toast.error(`주요 사건을 입력해 주세요!`);
        return;
      } else if (Material === "") {
        toast.error(`소재를 입력해 주세요!`);
        return;
      }

      SetLoading(true);
      await axios
        .post(
          `${configUrl.SERVER_URL}/complation`,
          {
            Story: story,
            selectOptions: selectOptions,
            Main_character: Main_character,
            Place: Place,
            Time: Time,
            Main_Events: Main_Events,
            Material: Material,
          },
          {
            headers: { authentication: localStorage.getItem("token") },
            timeout: 100000,
          }
        )
        .then(async (response) => {
          //console.log(response.data);
          //console.log('response', response.data[0]);
          //console.log('response2', response.data[1]);
          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            await SetOutput({
              ...output,
              outputKorean: outputKorean + response.data[0],
              outputEnglish: outputEnglish + response.data[1],
              result: outputKorean + "\n\n원본\n" + outputEnglish,
              tempLength: (outputKorean + response.data[0]).length,
              tempWrite: outputKorean + response.data[0],
            });

            await SetChange(false);
            await SetStart("이어쓰기");
            await SetHuman(true);
            toast.info(
              `이어지는 내용을 30자 이상 쓰면, 이야기를 계속 이어갈 수 있습니다.`
            );
          }

          if (response.data[2] >= 2) {
            toast.error(`결과물에 유해한 내용이 들어가 버렸어요. 😭 `);
           
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 412) {
            toast.info(`로그인이 필요합니다!`, {
              icon: "🙅‍♀️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
            localStorage.removeItem("token");
          } else {
            if (
              error.response.status === 403 &&
              error.response.data.errorCode === "001"
            ) {
              toast.error(`이야기의 길이가 너무 길어요ㅠ`);
            } else {
              SetOutput({
                ...output,
                result: "해당 오류는 관리자에게 문의해주세요!",
              });
            }
          }
        })
        .finally(() => {
          SetLoading(false);
        });
    } else {
      toast.info("로그인 후 다시 시도해 주세요!", {
        icon: "🙅‍♀️",
        progressStyle: { backgroundColor: "#7D4CDB" },
      });
    }
  };

  const resetData = () => {
    SetOutput({
      ...output,
      result: "",
      outputEnglish: "",
      outputKorean: "",
    });
    SetSubInput({
      ...subInput,
      Main_character: "",
      Place: "",
      Time: "",
      Main_Events: "",
      Material: "",
    });
    SetStart("이어쓰기");
    SetProgress(0);
  };

  const SaveContent = async () => {
    //console.log(outputKorean);
    if (outputKorean) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: outputKorean,
          category: "릴레이 웹소설",
        },
      };

      await axios(config)
        .then(async (response) => {
          //console.log('성공?', response.data)
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);
         
          if (error.response.status === 500) {
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: localStorage.getItem("token") },
        })
        .then((res) => {
          let count = res.data.membership_count;
          SetCount(count);
          SetBill(res.data.isBill);
        });
    } else {
      History.push("/service/webnovel");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, [History]);

  useEffect(() => {
    //console.log(outputKorean)
  }, [outputKorean]);

  return (
    <>
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
                  { name: "sidebar", start: [0, 0], end: [1, 0] },
                  { name: "main", start: [0, 1], end: [1, 1] },
                ]
          }
        >
          {isSider ? (
            <Box gridArea='sidebar' className='sideContainer' gap='medium'>
              <OuterClick
                onOuterClick={(event) => {
                  event.preventDefault();
                  //console.log("Clicked outside");
                  SetSider(false);
                }}
              >
                <SiderBtn onClick={handleSider}>
                  <Close />
                </SiderBtn>
                <Box align='center' gap='large'>
                  <div className='SiderBox'>
                    <select
                      defaultValue='default'
                      className='dropdowncategory'
                      onChange={onSelect}
                    >
                      <option value='default' disabled className='gradient'>
                        장르를 선택해주세요! ✔
                      </option>
                      <option value={options[0]}>{options[0]}</option>
                      <option value={options[1]}>{options[1]}</option>
                      <option value={options[2]}>{options[2]}</option>
                      <option value={options[3]}>{options[3]}</option>
                      <option value={options[4]}>{options[4]}</option>
                    </select>

                    <input
                      className='sub_input_text'
                      value={Main_character}
                      onChange={(e) => handleChange(e)}
                      name='Main_character'
                      placeholder='주요 인물'
                    />
                    <input
                      className='sub_input_text'
                      value={Place}
                      onChange={(e) => handleChange(e)}
                      name='Place'
                      placeholder='장소'
                    />
                    <input
                      className='sub_input_text'
                      value={Time}
                      onChange={(e) => handleChange(e)}
                      name='Time'
                      placeholder='시간'
                    />
                    <input
                      className='sub_input_text'
                      value={Material}
                      onChange={(e) => handleChange(e)}
                      name='Material'
                      placeholder='소재'
                    />
                    <input
                      className='sub_input_text'
                      value={Main_Events}
                      onChange={(e) => handleChange(e)}
                      name='Main_Events'
                      placeholder='주요 사건'
                    />
                    <button className='create' onClick={NewWebNovel}>
                      write
                    </button>
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
                  event.preventDefault();
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
                        <p style={{ color: "gray" }}>
                          ❗️ +열기 버튼이 있는 경우는 눌러서 빈 칸을
                          채워주세요!(블로그 제외)
                        </p>
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
            justify='center'
            align='center'
            className='WebOutputContainer'
          >
            <Box
              fill
              align='center'
              gap='large'
              className='WebTextarea'
            >
              <div>
                <textarea
                  className='outputKo'
                  placeholder='결과가 나올예정이에요!'
                  value={outputKorean}
                  onClick={NoticeWriteIcon}
                  onChange={(e) => HandleStory(e)}
                ></textarea>
                <textarea
                  className='outputEn'
                  placeholder='영어가 들어갈 예정입니다!'
                  value={outputEnglish}
                  readOnly
                ></textarea>
              </div>
              <div className='ContinueWeb'>
                <button
                  className={isHuman ? "KeepWebBtn" : "NotYetBtn"}
                  onClick={requestcontents}
                >
                  {Start}
                </button>
                <ProgressBar
                  completed={progress}
                  bgColor='#3D138D'
                  width={size !== "small" ? "300px" : "250px"}
                  height='15px'
                  margin='0 auto'
                  isLabelVisible={false}
                  maxCompleted={30}
                />
              </div>

              <Icons>
                <Download onClick={SaveContent} />
                <Update onClick={NewWebNovel} /> <Close onClick={resetData} />
              </Icons>
            </Box>
          </Box>
        </Grid>
      </Box>
    </ServiceLayout>
        <Modal onClick={HandleSmallModals} open={CountModal} close={HandleSmallModals}>
        <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleSmallModals}>취소</button>
          <Link to='/signIn'><button>멤버십 가입하기</button></Link>
        </div>
        
      </Modal>
      </>
  );
};

export default Webnovel;

const Icons = styled.div`
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
