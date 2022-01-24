import React from "react";
import { Link } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";
import EventBackground from "./turnPng5915038.png";
import ScrollToTop from "../../routes/ScrollToTop";

const FightingGel = () => {
  return (
    <EventContainer>
      <ScrollToTop />
      <Box className='box1' fill align='center'>
        <Box className='contentBox1'>
          <div className='TitleBox1'>라이팅젤로 글쓰기 파이팅하기</div>
          <div className='content1_1'>
            <h2>올해는 꼭 <span>내 이름으로</span></h2>
            <h2>
              <span>책 한권 내고 싶다면</span>
            </h2>
          </div>

          <div className='content1_2'>
            <h3>인공지능 글쓰기</h3>
            <h2>
              <span>#라이팅젤</span>로
            </h2>
            <h2>
              <span>책 한권 뚝딱 완성</span>해보세요!
            </h2>
          </div>
          <div className='content1_3'>
            <div>
              <img src='/tinggle.png' alt='이미지' />
            </div>
            <h4>
              글쓰기에 필요한 영감도 얻고, 문장 완성으로 막힌 부분을 뚫어주는
            </h4>
            <h3>
              <span>인공지능</span>으로 <span>글쓰기 부담</span>을 확
              줄여드려요.
            </h3>
          </div>

          <div className='TitleBox2'>그리고 이번 이벤트 기간만의 혜택</div>
          <div className='content1_4'>
            <h4>6개월 멤버십 가입 후, 가입 기간 중에 콘텐츠를 완성하면</h4>
            <h3>
              <span style={{ fontWeight: "600" }}>e-book</span>{" "}
              <span>제작</span>부터
            </h3>
            <h3>
              <span>대형서점 등록</span>까지 <span>무료</span>로 지원해요.
            </h3>
          </div>
        </Box>
      </Box>
      <Box className='box2' align='center'>
        <div>
          <p>
            2022년 2월 28일까지 멤버십에 가입 후 6개월 이내에 콘텐츠를 완성하신
            경우, 해당 콘텐츠를 전자책으로 제작해 대형서점에 등록해드립니다.
          </p>
        </div>
      </Box>
      <Box className='box3' align='center'>
        <div>
          <h4>참여방법</h4>
          <p>1. 멤버십에 가입한다.</p>
          <p>2. 라이팅젤을 활용해 콘텐츠를 완성한다.</p>
          <p>
            3.{" "}
            <span style={{ wordBreak: "break-all" }}>
              support@appplatform.co.kr
            </span>
            로 콘텐츠를 보낸다. (hwp, word 형태)
          </p>
          <p>4. 확인 이메일과 연락을 받는다.</p>
          <p>5. 대형서점에 등록된 나의 e-book을 확인한다. (약 2-3주 소요).</p>
        </div>
        <MBtnBox>
        <Link to='/'>
            <HomeGoBtn>라이팅젤 둘러보기</HomeGoBtn>
          </Link>
          <Link to='/signIn'>
            <MemGoBtn>멤버십 가입하기</MemGoBtn>
          </Link>
        </MBtnBox>
      </Box>
    </EventContainer>
  );
};

export default FightingGel;

const EventContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${EventBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const MBtnBox = styled.div`
  padding-top: 40px;
  text-align: center;

  @media screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

`;

const HomeGoBtn = styled.button`
  background-color: #ffce1f;
  border: 1px solid #ffce1f;
  color: #444;
  font-size: 20px;
  margin-right: 15px;
  padding: 5px 25px;
  cursor: pointer;
  font-weight: 600;

  @media screen and (max-width: 680px) {
    width: 100%;
  }

`

const MemGoBtn = styled.button`
  background-color: #372874;
  border: 1px solid #372874;
  color: #fff;
  font-size: 20px;
  margin-right: 15px;
  padding: 5px 25px;
  cursor: pointer;
  font-weight: 600;

  @media screen and (max-width: 680px) {
    width: 100%;
  }

`;
