import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';
import TagManager from 'react-gtm-module';


const FairyTaleDetail = () => {
  const size = useContext(ResponsiveContext);


  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/fairytale',
        pageTitle: '동화 소개',
      },
    });

  },[])

  return (
    <Layout>
      <ScrollToTop/>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>릴레이 동화 창작</h1>
          <h2>인공지능과 바통을 주고 받으며 완성해보는 '릴레이 동화'</h2>
          <hr />
        </Box>

        <Box fill className='DetailContainer'>
          <Box
            direction={size !== "small" ? "row" : "column"}
            gap='large'
            justify='center'
            align='center'
            className='Detail1'
          >
            <img src='/lantern.png' alt='팅젤이' className="Detail-img"/>
            <div className='Detail-TextBox'>
              <div>
                <h3>동화는 위대한 상상력의 장소입니다.</h3>
                <p>
                  동화 속 세계는 글쓰는 여러분이 자신의 삶에 대한 영감을 찾을 수
                  있는 좋은 방법입니다. 실생활에서 경험할 수 없는 마법의 세계를
                  탐험하고 금기를 깨거나 처음으로 경험했던 동화 기억을 떠올리며,
                  상상력을 자극해보세요.
                </p>
              </div>
              <div>
                <h3>나이에 상관없이 우리는 모두 스토리텔러입니다.</h3>
                <p>
                  우리가 이야기를 하는 것은 세상을 아름답게 변화시키기 위해 할
                  수 있는 일 중 하나입니다. 아이부터 어른까지, 우리는 모두 각자
                  품고 있는 아름다운 이야기로 재미있고 환상적인 여행으로 이끄는
                  스토리텔러가 될 수 있습니다.
                </p>
              </div>
            </div>
          </Box>

          <Box className='Detail2' justify='center' align='center'>
            <h3>누가 활용할 수 있을까요?</h3>
            <hr />
            <Box
              direction={size !== "small" ? "row" : "column"}
              className='Detail2-Content'
            >
              <div>
                <img src='/girl.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>동화를 한번 써보고 싶은</p>
                <p>초보 창작자, 작가</p>
              </div>
              <div>
                <img src='/teen.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>
                  스토리텔링을 훈련해보고 싶은
                </p>
                <p>청소년, 크리에이터</p>
              </div>
              <div>
                <img
                  src='/grandfather.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>한때 문학청년이 꿈이었던</p>
                <p>모든 어른</p>
              </div>
            </Box>
          </Box>

          <Box className='Detail3' justify='center' align='center'>
            <h3>어떻게 활용할 수 있을까요?</h3>
            <hr />
            <Box
              direction={size !== "small" ? "row" : "column"}
              className='Detail3-Content'
            >
              <div>
                <img
                  src='/agreement.png'
                  alt='문서'
                 className='Detail3-img' 
                />
                <p>
                  장르, 주인공, 장소, 소재, 주제 등 필수 입력 항목을 채워보세요.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai'className='Detail3-img'  />
                <p>인공지능이 이를 인식해 이야기의 도입부를 만들어 줍니다.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing'className='Detail3-img'  />
                <p>인공지능과 번갈아가며 동화를 전개해 보세요.</p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to='/app/fairytale'>
                <button>서비스 이용하기</button>
              </Link>
            </div>
          </Box>
        </Box>

        {/* 멤버쉽 안내 구간 */}
        <Box fill className='DetailBottom1' justify='center' align='center'>
          <Grid
            // columns={size !== "small" ? { count: 2, size: "auto" } : "100%"}
            columns='100%'
            gap='large'
          >
            <div className='Bottom1-Content'>
              <h3>
                ✨ 1750억개 매개변수를 학습한 자연어 처리 인공지능 기반으로 글이
                완성됩니다.
              </h3>
              <p>
                ✔️ 모든 내용은 완전한 창작물이며, 몇 번을 다시 써도 다른 내용이
                나옵니다.
              </p>
              <p> ✔️ 결과물의 저작권은 사용자에게 귀속합니다.</p>
            </div>
            <div className='Bottom1-Content'>
              <h3>
                ✨ 멤버십에 가입하시면, 해당 기간 동안 라이팅젤이 제공하는 모든
                서비스를 무제한 이용하실 수 있습니다.
              </h3>
              <p>
                ✔️ 서비스 이용 및 콘텐츠 제작 관련 매월 1회 진행 예정인 강의를
                들으실 수 있습니다.
              </p>
              <p>
                ✔️ 새로운 서비스를 지속적으로 개발할 예정입니다. 관련 소식은
                뉴스레터를 통해 확인하실 수 있습니다.
              </p>
            </div>
          </Grid>
          <div className='intoServiceBtn'>
            <Link to='/signIn'>
              <button style={{ marginBottom: "50px" }}>멤버십 가입하기</button>
            </Link>
          </div>
        </Box>

      </Box>
    </Layout>
  );
};

export default FairyTaleDetail;
