import React, { useState, useContext } from "react";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Close, Add, Update, Download } from "grommet-icons";
import { OuterClick } from "react-outer-click";

import styled from "styled-components";

const NovelIntro = () => {
  const size = useContext(ResponsiveContext);
  const [isSider, SetSider] = useState(true);

  const handleSider = () => {
    SetSider(!isSider);
  };

  return (
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
        <Box gridArea='sidebar' className='TabSideContainer'>
          <OuterClick
            onOuterClick={(event) => {
              //event.preventDefault();
              //console.log("Clicked outside");
              //SetSider(false);
            }}
          >
            {size === "small" && (
              <SiderBtn onClick={handleSider}>
                <Close />
              </SiderBtn>
            )}
            <Box align='center' gap='large'>
              <div className='TabAcoStyle'>
                <div className='TabAcoPanelStyle'>
                  <h4>주요 인물</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='mainCharacter'
                      //   value={category.mainCharacter}
                      //   onChange={(e) => HandleInput(e)}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>시간</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='period'
                      //   value={category.period}
                      //   onChange={(e) => HandleInput(e)}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>장소</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='location'
                      //   value={category.location}
                      //   onChange={(e) => HandleInput(e)}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>주제</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='theme'
                      //   value={category.theme}
                      //   onChange={(e) => HandleInput(e)}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>주요 사건</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='mainEvent'
                      //   value={category.mainEvent}
                      //   onChange={(e) => HandleInput(e)}
                    />
                  </div>
                </div>
                <SynopBtn>
                  <button
                    onClick={() => {
                      // NewStory();
                      //FairytaleAxios();
                    }}
                  >
                    줄거리 쓰기
                  </button>
                </SynopBtn>
              </div>
            </Box>
          </OuterClick>
        </Box>
      ) : (
        <Box gridArea='sidebar' className='TabSiderFalse'>
          <div className='TabSiderBtn' onClick={handleSider}>
            <Add size='small' />
            <span>열기</span>
          </div>
        </Box>
      )}
      <Box fill gridArea='main' className='TabmainBox' align='center'>
        <div className='TabOutputBox'>
          <textarea
            className='output1'
            placeholder='결과가 나올예정이에요!'
            // onChange={(e) => HandleStory(e)}
            // value={Output[0]}
          ></textarea>
          <textarea
            className='output2'
            placeholder='영어가 들어갈 예정입니다!'
            // value={Output[1]}
            readOnly
          ></textarea>
        </div>

        <Icons>
          <Download
          //onClick={SaveContent}
          />
          <Update
          //onClick={NewStory}
          />{" "}
          <Close
          // onClick={ResetData}
          />
        </Icons>
        <FollowBtn>여기에 이어 쓰고 싶으신가요?</FollowBtn>
      </Box>
    </Grid>
  );
};

export default NovelIntro;

const SynopBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;

  > button {
    padding: 8px 15px;
    border: 1px solid #444;
    background-color: #ff9300;
    outline: 0;
    width: 180px;
    text-align: center;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      font-weight: 600;
    }
  }
`;
const SiderBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 10px;
  cursor: pointer;
  color: #444;

  font-weight: 600;
`;

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

const FollowBtn = styled.button`
  width: 70%;
  font-size: 1rem;
  background-color: #372874;
  color: #fff;
  border : 0;
  outline: 0;
  padding: 8px 10px;
  cursor: pointer;

`;
