import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, ResponsiveContext } from "grommet";
import {  Download, Copy } from "grommet-icons";
import CopyToClipboard from "react-copy-to-clipboard";
import ProgressBar from "@ramonak/react-progress-bar";

import styled from "styled-components";

const NovelFollow = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box justify='center' align='center' className='NovelFollowMainBox'>
      <Box
        fill
        justify={size !== "small" ? "center" : 'start'}
        align='center'
        className='NovelFollowWrap'
      >
        <div className='NovelFollowProgressBox'>
          <h4>웹소설 이어쓰기</h4>
          <div>
            {/* <ProgressBar
              // completed={tempLength}
              bgColor='#372874'
              width={size !== "small" ? "250px" : "200px"}
              height='8px'
              isLabelVisible={false}
              maxCompleted={30}
            /> */}
            <button
            // onClick={requestcontents}
            >
              Write
            </button>
          </div>
        </div>
        <div className='mainOutputBox'>
          <textarea
            className='NovelFollowKo'
            placeholder='이야기의 처음 부분을 작성해보세요.(20자 내외)
            팅젤이 이야기의 뒤를 이어줄 거에요.'
            // value={outputKorean}
            // onChange={handleChange}
          />
          <textarea
            className='NovelFollowEn'
            placeholder='영어가 들어갈 예정입니다!'
            // value={outputEnglish}
            readOnly
          >
            {/* {outputEnglish} */}
          </textarea>
        </div>

        <Icons>
          <CopyToClipboard
          // text={outputKorean}
          //onCopy={onCopied}
          >
            <Copy style={{ cursor: "pointer" }} />
          </CopyToClipboard>
          <Download
          //onClick={SaveContent}
          />
        </Icons>
      </Box>
    </Box>
  );
};

export default NovelFollow;

const MenuItem = styled(Link)`
  display: block;
  padding: 10px;
  cursor: pointer;
  font-size: 17px;
  transition: all 200ms ease-in-out;

  &:hover,
  &:focus {
    background-color: #f9f9f9;
    font-weight: 600;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

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
