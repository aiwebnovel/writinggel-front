import React, {useContext} from "react";
import Layout from "../Layout";
import { Box, Paragraph, ResponsiveContext } from "grommet";

const Brand = () => {


    const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <Box
        justify='center'
        align='center'
        direction={size !== 'small' ? 'row' : 'column'}
        gap='large'
        pad='large'
        className="mainHome"
      >
        <h1>We Lighten up your Writing!</h1>
        {/* <div className='brand_img'>
        <img src='/logo.png' alt='brand'/>
        </div>
        <div className='brand_paragraph'>
          <Paragraph>
            시간 부족, 글쓰기 경험 부족 등의 이유로 창작 활동을 시작하는 데
            어려움을 느끼는 이들을 위해 '라이팅젤'은 <span style={{backgroundColor:'#3B2477', color:"#fff"}}>인공지능을</span> 바탕으로 단순한
            동작만으로 자신만의 콘텐츠를 시작하고 완성할 수 있도록 돕습니다.
          </Paragraph>
          <Paragraph >
            라이팅젤은 인공지능 연구 비영리단체 OpenAI(오픈AI)의 파트너로,
            <span style={{backgroundColor:'#3B2477', color:"#fff"}}>전세계 언어 1,750억 개 매개변수를 학습한 데이터를 바탕으로</span> 창의적인
            글쓰기를 하는 크리에이터를 단계와 장르별로 지원합니다.
          </Paragraph>
          <Paragraph margin='none'>
            글쓰기 전 동기를 부여하는 단계부터 글쓰기에 필요한 재료를 준비하고,
            실제로 창작하는 단계까지 글을 완성하는 데 필요한 도움을 단계별로
            제공합니다. 더 나아가 <span style={{backgroundColor:'#3B2477', color:"#fff"}}>블로그, 웹소설, 동화 등 장르 맞춤형 창작
            서비스를 제공합니다.</span>
          </Paragraph>
        </div> */}
      </Box>
    </Layout>
  );
};

export default Brand;
