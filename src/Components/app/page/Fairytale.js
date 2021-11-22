import {
  Box,
  Grid,
  ResponsiveContext,
  Accordion,
  AccordionPanel,
} from "grommet";
import { Update, Close, Add, Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Loading from "../../Loading";
import * as configUrl from "../../../config";

const Fairytale = () => {
  const AccodianData = [
    {
      id: 1,
      title: "주요 인물",
    },
    {
      id: 2,
      title: "장소",
    },
    {
      id: 3,
      title: "시간",
    },
    {
      id: 4,
      title: "주요 사건",
    },
    {
      id: 5,
      title: "소재",
    },
  ];

  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isSider, SetSider] = useState(false);
  const [isOpen, SetOpen] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [isHuman, SetIsHuman] = useState(false);
  const [Output, SetOutput] = useState(["", ""]);
  const [OutputTemp, SetOutputTemp] = useState("");

  const handleSider = () => {
    SetSider(!isSider);
  };

  const handleOpen = () => {
    SetSider(false);
    SetOpen(!isOpen);
  };

  const [category, Setcategory] = useState({
    genre: "",
    mainCharacter: "",
    period: "",
    location: "",
    theme: "",
  });

  const { genre, mainCharacter, period, location, theme } = category;

  const HandleInput = (e) => {
    console.log("e", e);
    console.log("category", e.target.name);
    console.log("input", e.target.value);

    if (e.target.name === "주요 인물") {
      Setcategory({
        ...category,
        mainCharacter: e.target.value,
      });
    }
    if (e.target.name === "장소") {
      Setcategory({
        ...category,
        location: e.target.value,
      });
    }
    if (e.target.name === "시간") {
      Setcategory({
        ...category,
        period: e.target.value,
      });
    }
    if (e.target.name === "주요 사건") {
      Setcategory({
        ...category,
        genre: e.target.value,
      });
    }
    if (e.target.name === "소재") {
      Setcategory({
        ...category,
        theme: e.target.value,
      });
    }
    console.log("result", genre, mainCharacter, period, location, theme);
  };

  const FairytaleAxios = async () => {
    console.log(category);
    if (
      category.genre.length > 0 &&
      category.mainCharacter.length > 0 &&
      category.period.length > 0 &&
      category.location.length > 0 &&
      category.theme.length > 0
    ) {
      if (!isHuman) {
        SetLoading(true);

        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/writinggel/fairytale`,
          headers: { authentication: localStorage.getItem("token") },
          data: {
            Story: Output[0],
            Genre: category.genre,
            Main_character: category.mainCharacter,
            Period: category.period,
            Location: category.location,
            Theme: category.theme,
          },
        };

        await axios(config)
          .then((response) => {
            console.log(response.data);
            SetOutput([
              Output[0] + response.data[0],
              Output[1] + response.data[1],
            ]);
            SetOutputTemp(Output[0]);
            SetIsHuman(true);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            SetLoading(false);
          });
      } else {
        if (OutputTemp.length + 100 < Output[0].length) {
          SetLoading(true);

          const config = {
            method: "post",
            url: `${configUrl.SERVER_URL}/writinggel/fairytale`,
            headers: { authentication: localStorage.getItem("token") },
            data: {
              Story: Output[0],
              Genre: category.genre,
              Main_character: category.mainCharacter,
              Period: category.period,
              Location: category.location,
              Theme: category.theme,
            },
          };

          await axios(config)
            .then((response) => {
              console.log(response.data);
              SetOutput([
                Output[0] + response.data[0],
                Output[1] + response.data[1],
              ]);
              SetOutputTemp(Output[0]);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              SetLoading(false);
            });
        } else {
          setTimeout(toast.info("추가 내용을 채워주세요!"), 300);
        }
      }
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
    // SetOutputContent("");
    // SetLoading(true);
    // if (input && input !== "") {
    //   const config = {
    //     method: "post",
    //     url: `${configUrl.SERVER_URL}/writinggel/discussion`,
    //     headers: { authentication: localStorage.getItem("token") },
    //     data: { option: option, story: input },
    //   };

    //   await axios(config)
    //     .then(async (response) => {
    //       console.log(response.data);
    //       SetOutputContent(response.data[0]);
    //       SetLoading(false);
    //     })
    //     .catch(async (error) => {
    //       console.log(error);
    //     });
    // } else {
    //   setTimeout(toast.info("내용을 채워주세요!"), 300);
    // }
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
      <Box className="ServiceContainerVh" background="#f9f9f9">
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
            <Box gridArea="sidebar" className="sideContainer" gap="medium">
              <SiderBtn onClick={handleSider}>
                <Close />
              </SiderBtn>
              <Box align="center" gap="large">
                <Accordion className="AcoStyle" multiple>
                  {AccodianData.map((item) => (
                    <AccordionPanel
                      key={item.id}
                      label={item.title}
                      className="AcoPanelStyle"
                    >
                      <div className="AcoInput">
                        <input
                          type="text"
                          name={item.title}
                          onChange={(e) => HandleInput(e)}
                        />
                        <button>추가</button>
                      </div>
                    </AccordionPanel>
                  ))}
                  <div className="writeBtn">
                    <button onClick={() => FairytaleAxios()}>write</button>
                  </div>
                </Accordion>
              </Box>
            </Box>
          ) : (
            <Box
              gridArea="sidebar"
              className="isSiderFalse"
              gap={size !== "small" && "medium"}
            >
              <div className="SiderBtn" onClick={handleSider}>
                <Add size="small" />
                <span>열기</span>
              </div>
              <div className="OpenBtn" onClick={handleOpen}>
                <span>📌 필독</span>
              </div>
            </Box>
          )}

          {isOpen && (
            <Box
              gridArea="sidebar"
              className="sideContainer"
              gap={size !== "small" && "medium"}
            >
              <div className="CloseSiderBtn" onClick={handleOpen}>
                <Close />
              </div>
              <Box className="guide-Accordion">
                <div className="guide-PanelHeader">Q. How to Use?</div>

                <div className="guide-PanelContent ">
                  <h4>💫 팅젤이와 함께 글 쓰는 TING!</h4>
                  <div>
                    <img src="/tinggle.png" alt="tingting" />
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
            </Box>
          )}

          <Box
            fill
            gridArea="main"
            className="mainBox"
            justify="center"
            align="center"
            // pad={size !== 'small' ? 'medium': 'large'}
          >
            <div className="mainOutputBox">
              <textarea
                className="output1"
                placeholder="결과가 나올예정이에요!"
                onChange={(e) => SetOutput([e.target.value,Output[1]])}
                value={Output[0]}
              ></textarea>
              <textarea
                className="output2"
                placeholder="영어가 들어갈 예정입니다!"
                value={Output[1]}
              ></textarea>
            </div>
            <Icons>
              <Download /> <Update /> <Close />
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
