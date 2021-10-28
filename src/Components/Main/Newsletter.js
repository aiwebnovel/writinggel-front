import React, {useContext} from "react";
import Layout from "../Layout";
import { Box, Grid, Card, ResponsiveContext  } from "grommet";

const NewsLetter = () => {

    const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <Box fill justify='center' align='center'>
        <div className='LetterHeader'>
          <h3>라이팅젤이 격주 1회 뉴스레터를 보내드립니다.</h3>
          <h4>인공지능 글쓰기 트렌드, 인공지능이 창작한 글,</h4>
          <h4>라이팅젤 주요 소식, 사용 방법 등을 알려 드립니다.</h4>
        </div>

        <Box fill justify='center' align='center' pad='large'>
          <div className='FormInputs'>
            <input type='text' placeholder='이름' />
          </div>

          <div className='FormInputs'>
            <input type='text' placeholder='이메일' />
          </div>
          <div className='CheckSubs'>
            <label>
              <input type='checkbox' className='checkStyle' />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <button type='submit' className='subsBtn'>
              라이팅젤 레터 구독하기
            </button>
          </div>
        </Box>

        <Box justify='center' align='center' pad="large" className='PrevLetter'>
          <div className="preHeader">지난 레터</div>
          <Grid  columns={ size !== "small" ? { count: 4, size: "auto" } : '100%'}
          gap='medium'
          fill={size !== 'small' ? false : true}
          pad="large"
          >
            <Card pad='large'>지난 레터1</Card>
            <Card pad='large'>지난 레터2</Card>
            <Card pad='large'>지난 레터3</Card>
            <Card pad='large'>지난 레터4</Card>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default NewsLetter;
