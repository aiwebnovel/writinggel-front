import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';
import TagManager from 'react-gtm-module';

const RelayNovelDetail = () => {
  const size = useContext(ResponsiveContext);

  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/relaynovel',
        pageTitle: '1대1 릴레이 소설 소개',
      },
    });

  },[])

  return (
    <Layout>
      <ScrollToTop/>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>1:1 릴레이 소설</h1>
          <div>
          <h2>
          한 문장씩 쌓아올리는 이야기,
          </h2>
          <h2>인공지능과 대화하듯 완성해보세요.</h2>
          </div>
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
            <img src='/lantern.png' alt='팅젤이' className='Detail-img' />
            <div className='Detail-TextBox'>
              <div>
                <h3>훌륭한 이야기는 대화에서 시작됩니다.</h3>
                <p>
                친구와 이야기할 때, 글로 잘 표현되지 않던 마음과 생각을 술술 표현해본 경험 누구나 있죠? 훌륭한 이야기꾼 팅젤과 이야기하듯 한 문장씩 주고 받으면서 이야기를 완성해 보세요. 지금까지 한번도 상상해보지 않았던 이야기가 술술 나오는 경험을 하게 될 거에요.
                </p>
              </div>
              <div>
                <h3>한 문장씩 주고 받으며 쓰는 '1:1 릴레이 소설'</h3>
                <p>
                이야기하듯 한 문장씩 번갈아가며 써서 완성한 이야기를 잘 다듬어 한편의 소설을 엮어보세요. 내가 쓰지 않은 나머지 반에 대한 지분도 내가 가질 수 있습니다. 100% 당신의 저작물로 만들어보세요!
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
                <img src='/man2.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>아직 혼자서 긴 이야기를</p>
                <p>쓸 자신이 없는 사람들</p>
              </div>
              <div>
                <img src='/man4.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>한국어로 텍스트게임을 즐기고 싶은</p>
                <p>텍스트게임 유저</p>
              </div>
              <div>
                <img
                  src='/woman6.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>한때 심심이에 빠져 </p>
                <p>시간 가는지 모르고</p>
                <p>놀아봤던 사람들</p>
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
                <img src='/agreement.png' alt='문서' className='Detail3-img' />
                <p>장르, 주인공, 장소, 소재, 주제 등 필수 입력 항목을 채워보세요.</p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>인공지능이 이를 인식해 이야기의 도입부/줄거리를 만들어 줍니다.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>인공지능이 완성한 도입부에 한 문장을 이어 써보세요.</p>
              </div>
              <div>
                <img src='/chat-box.png' alt='writing' className='Detail3-img' />
                <p>인공지능과 한 문장씩 번갈아 하나의 이야기를 완성해보세요.</p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to='/app/relaynovel'>
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

export default RelayNovelDetail;
