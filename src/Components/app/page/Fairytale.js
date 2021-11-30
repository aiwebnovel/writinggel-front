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
import { OuterClick } from "react-outer-click";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Loading from "../../Loading";
import * as configUrl from "../../../config";

const Fairytale = () => {
  const AccodianData = [
    {
      id: 1,
      title: "장르",
    },
    {
      id: 2,
      title: "주요 인물",
    },
    {
      id: 3,
      title: "장소",
    },
    {
      id: 4,
      title: "주요 사건",
    },
    {
      id: 5,
      title: "주제",
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
  const [tempLength, SetLength] = useState(0);
  const [newLength, SetNewLength] = useState(0);
  const [start, SetStart] = useState("write");

  const handleSider = () => {
    SetSider(!isSider);
  };

  const handleOpen = () => {
    SetSider(false);
    SetOpen(!isOpen);
  };

  const [category, Setcategory] = useState({
    genre: "", // Genre
    mainCharacter: "", //Main_Character
    Case: "", //Period
    location: "", //Location
    theme: "", //Theme
  });

  const HandleInput = (e) => {
    // console.log("e", e);
    // console.log("category", e.target.name);
    // console.log("input", e.target.value);

    if (e.target.name === "장르") {
      Setcategory({
        ...category,
        genre: e.target.value,
      });
    }
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
    if (e.target.name === "주요 사건") {
      Setcategory({
        ...category,
        Case: e.target.value,
      });
    }
    if (e.target.name === "주제") {
      Setcategory({
        ...category,
        theme: e.target.value,
      });
    }
  };

  const HandleStory = (e) => {
    SetStart("Need a Story");
    SetOutput([e.target.value, Output[1]]);
    let OutputLength = Output[0].length;
    let Length = OutputLength - tempLength;
    SetNewLength(Length);
    // console.log(Length);
    //console.log(newLength);

    if (newLength > 100) {
      SetStart("Continue");
    }
  };

  const FairytaleAxios = async () => {
    if (
      category.genre.length > 0 &&
      category.mainCharacter.length > 0 &&
      category.Case.length > 0 &&
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
            Period: category.Case,
            Location: category.location,
            Theme: category.theme,
          },
        };

        await axios(config)
          .then((response) => {
            // console.log(response.data);

            if (response.data[0] === "") {
              toast.error(
                "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
              );
              SetLoading(false);
            } else {
              SetOutput([response.data[0], response.data[1]]);
              SetOutputTemp(Output[0] + response.data[0]);
              SetLength((Output[0] + response.data[0]).length);
              SetStart("Need a Story");
              SetIsHuman(true);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            SetLoading(false);
          });
      } else {
        if (newLength > 100) {
          SetLoading(true);

          const config = {
            method: "post",
            url: `${configUrl.SERVER_URL}/writinggel/fairytale`,
            headers: { authentication: localStorage.getItem("token") },
            data: {
              Story: Output[0],
              Genre: category.genre,
              Main_character: category.mainCharacter,
              Period: category.Case,
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
                SetStart("Need a Story");
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              SetLoading(false);
            });
        } else {
          toast.info(`${100 - newLength}자를 더 채워주세요!`);
        }
      }
    } else {
      toast.info("옆 메뉴에서 내용을 채워주세요!");
    }
  };

  const UpdateFairytale = async () => {
    //console.log('log',  Output, OutputTemp, tempLength,)

    SetIsHuman(false);
    if (
      category.genre.length > 0 &&
      category.mainCharacter.length > 0 &&
      category.Case.length > 0 &&
      category.location.length > 0 &&
      category.theme.length > 0
    ) {
      SetLoading(true);

      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/fairytale`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          Story: "",
          Genre: category.genre,
          Main_character: category.mainCharacter,
          Period: category.Case,
          Location: category.location,
          Theme: category.theme,
        },
      };

      await axios(config)
        .then((response) => {
          // console.log(response.data);

          if (response.data[0] === "") {
            toast.error(
              "결과물에 유해한 내용이 들어가 버렸어요. 😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            SetOutput([response.data[0], response.data[1]]);
            SetOutputTemp(response.data[0]);
            SetLength(response.data[0].length);
            SetStart("Need a Story");
            SetIsHuman(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          SetLoading(false);
        });
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
    SetOutput(["", ""]);
    SetOutputTemp("");
    SetLength(0);
    SetNewLength(0);
    SetStart("write");
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
                  <Accordion className='AcoStyle' multiple>
                    {AccodianData.map((item) => (
                      <AccordionPanel
                        key={item.id}
                        label={item.title}
                        className='AcoPanelStyle'
                      >
                        <div className='AcoInput'>
                          <input
                            required
                            type='text'
                            name={item.title}
                            onChange={(e) => HandleInput(e)}
                          />
                          {/* <button>추가</button> */}
                        </div>
                      </AccordionPanel>
                    ))}
                    <div className='writeBtn'>
                      <button onClick={() => FairytaleAxios()}>{start}</button>
                    </div>
                  </Accordion>
                </Box>
              </OuterClick>
            </Box>
          ) : (
            <Box
              gridArea='sidebar'
              className='isSiderFalse'
              gap={size !== "small" && "medium"}
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
            className='mainBox'
            justify='center'
            align='center'
            // pad={size !== 'small' ? 'medium': 'large'}
          >
            <div className='mainOutputBox'>
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
            <Icons>
              <Download onClick={SaveContent} />{" "}
              <Update onClick={UpdateFairytale} /> <Close onClick={ResetData} />
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
