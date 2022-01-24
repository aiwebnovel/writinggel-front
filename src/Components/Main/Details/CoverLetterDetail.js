import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';
import TagManager from 'react-gtm-module';

const CoverLetterDetail = () => {
  const size = useContext(ResponsiveContext);

  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/businessitem',
        pageTitle: '비즈니스 아이템 소개',
      },
    });

  },[])

  return (
    <Layout>
      <ScrollToTop/>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>대입 자소서 완성</h1>
          <h2>
            스띠카스띠카스띠카
          </h2>
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
                <h3>렛츠플레이볼렛츠플레이볼</h3>
                <p>
               요요마유니벌-스스스스 렛츠플레이볼렛츠플레이볼
                </p>
              </div>
              <div>
                <h3> 요요마유니벌-스스스스 렛츠플레이볼렛츠플레이볼</h3>
                <p>
                요요마유니벌-스스스스 렛츠플레이볼렛츠플레이볼
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
                <img src='/woman5.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>나만의 콘텐츠를 상품화할 방법을</p>
                <p>모색하고 있는 사람</p>
              </div>
              <div>
                <img src='/man2.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>새로운 비지니스 아이디어를 위한</p>
                <p>영감이 필요한 사람</p>
              </div>
              <div>
                <img
                  src='/grandmother2.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>외부 지원사업이나</p>
                <p>사내 신사업 기획을 위한</p>
                <p>사업계획서를 쓰고 있는 사람</p>
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
                <p>상품화하고 싶은 분야나 주제를 입력하면, 관련 비즈니스 아이디어를 제시합니다.</p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>여러 아이디어 중 실제 사업으로 연계할 수 있는 아이템이 뭔지 생각해보세요.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>비지니스 관점에서 내 콘텐츠의 방향과 지향점을 살펴보세요. </p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to='/app/coverletter'>
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

export default CoverLetterDetail;
