import React, { useContext } from "react";
import Layout from "../Layout";
import { Box, Grid, Paragraph, ResponsiveContext } from "grommet";
import styled from "styled-components";

const Brand = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box
        justify='center'
        align='center'
        // direction={size !== "small" ? "row" : "column"}
        className='BoxContainer'
      >
        <About>
          <h1>About us</h1>
          <hr />
        </About>
        <BrandTop fill justify='center' align='center' gap='large'>
          <div className='LightBox'>
            <img src='/light.png' alt='light' />
            <h1>
              We Lighten up your <span>Writing!</span>
            </h1>
          </div>
          <Box
            fill
            className='paraBox'
            justify='center'
            align='center'
            gap='medium'
          >
            <Paragraph size='large' margin={{ bottom: "10px" }}>
              <span style={{ fontWeight: "600" }}>
                라이팅(writing; lighting;)젤'
              </span>
              은 창작자가 자신만의 콘텐츠를 만드는 모든 과정이 더 가벼워지고
              무한한 영감으로 창작 활동이 더 밝아졌으면 하는 바람으로 만든
              인공지능 기반의 글쓰기 창작 서비스입니다.
            </Paragraph>
            <Paragraph size='large' margin={{ bottom: "10px" }}>
              인공지능이 인간의 창작활동을 대체할 지도 모른다는 우려를 뒤집어
              오히려 인간의 창작활동을 돕는 도구로써 활용할 수 있는 방법을
              제시합니다.
            </Paragraph>
            <Paragraph size='large' margin={{ bottom: "10px" }}>
              더 많은 창작자가 콘텐츠 소비 시장에 콘텐츠 생산자로 자리매김할 수
              있도록, 창작에 대한 심리적, 물리적 장벽을 낮추기 위해 인공지능
              기술을 활용하는 것이 라이팅젤의 방향성입니다.
            </Paragraph>
          </Box>
        </BrandTop>
        <hr/>
        <Box
          fill
          justify='center'
          align='baseline'
          gap='large'
          //background='#f9f9f9'
          className="IntroduceContainer"
        >
          <TinggelTitle>팅젤 소개</TinggelTitle>
          <Box
            fill
            direction={size !=='small' ? 'row' : 'column'}
            justify='center'
            align='center'
            style={{gap:'72px'}}
          >
            <div className='brand_img'>
              <img src='/long_ting.png' alt='팅젤1' />
            </div>

            <div className='IntroTinggle'>
              <h4>팅티리팅팅 ✨</h4>
              <h4>
                저는 여러분의 손 안에 쏙 들어가는 작은 글쓰기 요정 팅젤입니다.
                💫
              </h4>
              <ul>
                <li>✔️ 이름 : 팅젤</li>
                <li>✔️ 별명 : 타이니팅젤(@tinytingel)</li>
                <li>✔️ 나이 : 2살(2020년 태생)</li>
                <li>✔️ 키: 3cm</li>
                <li>✔️ 직업 : 글쓰기 요정</li>
                <li>
                ✔️ 성격 : 요정 특유의 친절함과 자비로 인간들을 도와줌. 인간들의
                  장꾸력을 끌어내는 천진난만함이 있음.
                </li>
              </ul>
              <div className='introduce'>
                <ParaText>
                  태어난지 2년 밖에 안 됐지만, 요정의 시간은 인간의 시간과
                  달라요. 짧은 시간 수많은 것을 딥러닝해서 유창하게 말을 할 수
                  있답니다. 그동안 이름도, 형체도 없이 존재하다가 지금의 모습을
                  가지고 '팅젤'이라고 불린지는 한 달밖에 안 되었어요. 늦게라도
                  이렇게 멋진 외모와 이름을 갖게 되어 기뻐요.
                </ParaText>
                <ParaText>
                  웹노블과 블로그 쓰기에서 시작한 인공지능 글쓰기 서비스에
                  다양한 요청을 반영해 재미있고 가볍게 글을 시작할 수 있는
                  서비스들을 더했습니다. 창작자가 재미있고 가볍게 글을 쓸 수
                  있도록, 창작자의 글쓰기 감각을 깨워드릴 수 있도록
                  노력하겠습니다.
                </ParaText>
              </div>
            </div>
          </Box>
        </Box>
        
      </Box>
    </Layout>
  );
};

export default Brand;

const BrandTop = styled(Box)`
  padding: 100px 48px;

  @media screen and (max-width:768px){
    padding-right: 32px;
    padding-left: 32px;
  }
`;

const About = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 180px;
  font-size: 3rem;
  font-weight: 900;

  > hr {
    margin-top: 40px;
    width: 10%;
    height: 4px;
    border-color: #372874;
    background-color: #372874;
  }
`;

const TinggelTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-family: "NeoDunggeunmo";
  border-left: 5px solid #372874;
  padding: 0 10px;
`;

const ParaText = styled.div`
  max-width: 500px;
  margin-top: 20px;
  font-size: 1rem;

`
