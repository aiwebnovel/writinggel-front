import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Grid, ResponsiveContext } from "grommet";
import { Update, Close, Add, Download } from "grommet-icons";
import * as configUrl from "../../../config";

import ProgressBar from "@ramonak/react-progress-bar";
import ServiceLayout from "../Layout";
import Loading from "../../Loading";
import styled from "styled-components";

const LanguageDetect = require("languagedetect");

const Webnovel = () => {
  const History = useHistory();
  const size = useContext(ResponsiveContext);

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

  const [before, SetBefore] = useState({
    before_Main_character: "",
    before_Place: "",
    before_Time: "",
    before_Main_Events: "",
    before_Material: "",
    before_outputEnglish: "",
  });

  const [output, SetOutput] = useState({
    outputKorean: "",
    outputEnglish: "",
    result: "",
  });

  const [isHuman, SetHuman] = useState(false);
  const [isChange, SetChange] = useState(false);

  const { Main_character, Place, Time, Main_Events, Material } = subInput;
  // const {
  //   before_Main_character,
  //   before_Place,
  //   before_Time,
  //   before_Main_Events,
  //   before_Material,
  //   before_outputEnglish,
  // } = before;
  const { outputKorean, outputEnglish, result } = output;

  const [Start, SetStart] = useState("Create a story");
  const [progress, SetProgress] = useState(0);
  const [tempLength, SetLength] = useState(0);
  const [tempWrite, SetTempWrite] = useState("");
  const [isLoading, SetLoading] = useState(false);
  const [isSider, SetSider] = useState(false);

  const handleSider = () => {
    SetSider(!isSider);
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

    if (isHuman === false) {
      if (outputKorean > 0) {
        SetStart("Need a story");
      } else {
        return;
      }
    } else {
      const lngDetector = new LanguageDetect();
      const language = await lngDetector.detect(outputKorean, 1);

      if (progress >= 100) {
        SetStart("Continue");
      }

      if (language[0] === "english") {
        SetProgress(((outputKorean.length - tempLength) * 100) / 150);
      } else {
        SetProgress(((outputKorean.length - tempLength) * 100) / 100);
      }
    }
  };

  const requestcontents = async (e) => {

    console.log(progress, isHuman);
    if (localStorage.getItem("token") !== null) {
      let story = outputEnglish;

      if (isHuman === true && progress < 100) {
        toast.error(`추가 이야기의 길이(${100 - progress}자)가 부족해요😭`);
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
      axios
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
        .then((response) => {
          SetOutput({
            ...output,
            outputKorean: outputKorean + response.data[0],
            outputEnglish: outputEnglish + response.data[1],
            result: outputKorean + "\n\n원본\n" + outputEnglish,
          });
          SetLoading(false);
          SetChange(false);
          SetLength(outputKorean.length);
          SetTempWrite(outputKorean);
          SetStart("Need a Story");
          SetHuman(true);
          console.log(response.data)
          if (response.data[2] >= 2) {
            toast.error(
              `결과물에 유해한 내용이 들어가 버렸어요! 버튼을 다시 눌러주세요!`
            );
            SetHuman(false);
          } else {
            toast.info(
              `이어지는 내용을 100자 이상 쓰면, 이야기를 계속 이어갈 수 있습니다.`
            );
          }
          SetBefore({
            ...before,
            before_selectOptions: selectOptions,
            before_Main_character: Main_character,
            before_Place: Place,
            before_Time: Time,
            before_Main_Events: Main_Events,
            before_Material: Material,
            before_outputEnglish: story,
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 412) {
            SetLoading(false);
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
              SetLoading(false);
            } else {
              SetLoading(false);
              SetOutput({ result: "해당 오류는 관리자에게 문의해주세요!" });
            }
          }
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
      Time:'',
      Main_Events: "",
      Material: "",
    });
    SetProgress(0);
  };

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
                  <button className='create' onClick={requestcontents}>
                    {Start}
                  </button>
                  {/* <div className='progress'> */}
                  <ProgressBar
                    completed={progress}
                    bgColor='#3D138D'
                    width='220px'
                    height='20px'
                    margin='0 auto'
                    isLabelVisible={true}
                  />
                  {/* </div> */}
                </div>
              </Box>
            </Box>
          ) : (
            <Box gridArea='sidebar' className='isSiderFalse' gap='medium'>
              <SiderBtn onClick={handleSider}>
                <Add size='small' />
                <span>열기</span>
              </SiderBtn>
            </Box>
          )}

          <Box
            fill
            gridArea='main'
            className='mainBox'
            justify='center'
            align='center'
            pad={size !== "small" ? "medium" : "large"}
          >
            <div className='mainOutputBox'>
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
            <Icons>
              <Download /> <Update onClick={requestcontents} />{" "}
              <Close onClick={resetData} />
            </Icons>
          </Box>
        </Grid>
      </Box>
    </ServiceLayout>
  );
};

export default Webnovel;

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
