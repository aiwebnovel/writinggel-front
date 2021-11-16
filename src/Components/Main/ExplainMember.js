import React, { useContext } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Bookmark, StatusGood } from "grommet-icons";

import styled from "styled-components";

const ExplainMember = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box fill justify='center' align='center'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          pad='large'
          className='ExplainHeader'
          justify='center'
          align='center'
        >
          <h2>라이팅젤 멤버십에 가입 하시면</h2>
          <h2>
            인공지능 기반 글쓰기 지원 서비스를 무제한 이용하실 수 있습니다.
          </h2>
          <Link to='/signIn'>
            <button className='ExplainBtn'>멤버쉽 가입</button>
          </Link>
        </Box>

       {/* ㅎ헤더 아래 콘텐츠들 */}
        <Box fill justify='center' align='center' pad='large'>

        {/* 멤버쉽 카드들 */}
          <Box fill={size !== "small" ? false : true}>
            <Grid
              columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
              gap='medium'
              style={{ padding: "48px 0" }}
            >
              <div className='MemCardCon'>
                <div className='MemCardHead'>
                  <BookmarkFilled size='medium' color='#3b2477' />
                </div>
                <div className='MemCardBody'>
                  <h4>1개월 이용권</h4>
                  <p style={{fontWeight: 600}}>월 19,000원</p>
                  <p>/ 1개월마다 결제</p>
                </div>
              </div>
              <div className='MemCardCon'>
                <div className='MemCardHead'>
                  <BookmarkFilled size='medium' color='#3b2477' />
                </div>
                <div className='MemCardBody'>
                  <h4>3개월 이용권</h4>
                  <p>월 16,000원</p>
                  <p style={{fontWeight: 600}}>
                    48,000원
                  </p>
                  <p>/ 3개월마다 결제</p>
                </div>
              </div>
              <div className='MemCardCon'>
                <div className='MemCardHead'>
                  <BookmarkFilled size='medium' color='#3b2477' />
                </div>
                <div className='MemCardBody'>
                  <h4>6개월 이용권</h4>
                  <p>월 10,000원</p>
                  <p style={{fontWeight: 600}}>
                    60,000원
                  </p>
                  <p>/ 6개월마다 결제</p>
                </div>
              </div>
            </Grid>
          </Box>
          <hr />

        {/* 부가 설명들 */}
          <div className='TextCon'>
            <ExplainTextBox>
              <StatusFilled color='#fff' size='large' />
              <ExplainText>
                <h4>① 100% 인공지능 창작, 표절 &amp; 저작권 걱정 NO</h4>
                <p>
                  모든 결과물은 기존 창작물에서 가져오는 것이 아니라, 인공지능이
                  완전히 새롭게 창작하는 것이므로 표절 문제에서 자유롭습니다.
                  저작권 역시 해당 사용자(멤버십)에게 귀속됩니다.
                </p>
              </ExplainText>
            </ExplainTextBox>

            <ExplainTextBox>
              <StatusFilled color='#fff' size='large' />
              <ExplainText>
                <h4>② 계속 새로운 서비스 출시, 무제한 사용</h4>
                <p>
                  앞으로 매달 1~2개 이상의 서비스를 새롭게 개발/출시할
                  예정입니다. 멤버십에 가입하시면, 사용 기간 내 출시되는
                  서비스는 모두 무제한으로 사용하실 수 있습니다.
                </p>
              </ExplainText>
            </ExplainTextBox>

            <ExplainTextBox>
              <StatusFilled color='#fff' size='large' />
              <ExplainText>
                <h4>
                  ③ 교육(인공지능 글쓰기, 콘텐츠 만들기 등) &amp; 커뮤니티 활동
                </h4>
                <p>
                  인공지능을 활용한 글쓰기, 전자책 등 개인 콘텐츠 만들기 등 관련
                  교육을 월 1회 받을 수 있고, 그 외 온·오프라인에서 함께
                  창작활동을 할 수 있습니다.
                </p>
              </ExplainText>
            </ExplainTextBox>
          </div>
        </Box>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          className='ExplainBottom'
          justify='center'
          align='center'
        >
          <Link to='/signIn'>
            <button>멤버쉽 가입</button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default ExplainMember;

const ExplainTextBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;


  > svg {

    @media screen and (max-width: 680px) {
        display: none;
    }
}
`;

const ExplainText = styled.div`
  > h4,
  p {
    margin: 0;
    padding: 0 10px;
  }
`;

const BookmarkFilled = styled(Bookmark)`
  path[fill="none"] {
    fill: #3b2477;
  }
`;

const StatusFilled = styled(StatusGood)`
  path[fill="none"] {
    fill: #3b2477;
  }
`;
