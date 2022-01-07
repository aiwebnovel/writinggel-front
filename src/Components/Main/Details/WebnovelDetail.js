import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';
import TagManager from 'react-gtm-module';

const WebnovelDetail = () => {
  const size = useContext(ResponsiveContext);

  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/webnovel',
        pageTitle: '웹소설 소개',
      },
    });

  },[])

  return (
    <Layout>
       <ScrollToTop/>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>릴레이 웹소설 창작</h1>
          <h2>인공지능과 바통을 주고 받으며 쓰는 '릴레이 웹소설'</h2>
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
            <img src='/tinggle.png' alt='팅젤이' className="Detail-img"/>
            <div className='Detail-TextBox'>
              <div>
                <h3>웹소설 써보고 싶은데 시작을 망설이고 있나요?</h3>
                <p>
                  '틈만 나면 읽는 웹소설 장르에 작가로 뛰어들 수는 없을까'
                  고민하고 있으신 분들에게 인공지능과 바통을 주고받으며 완성하는
                  릴레이 웹소설을 추천합니다.
                </p>
              </div>
              <div>
                <h3>
                  분당 500타 속도로 써내야 하는 웹소설 연재, 속도를 높여보세요!
                </h3>
                <p>
                  웹소설 작가로는 입문했는데, 빠른 속도로 원고를 보내야 하는
                  현실 속에서 새로운 소재를 찾기란 쉽지 않습니다. 인공지능과의
                  색다른 경험을 통해 글 쓰는 속도를 업그레이드 해보세요.
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
                <img src='/writer.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>웹소설을 한번 써보고 싶은</p>
                <p>초보 창작자, 작가</p>
              </div>
              <div>
                <img src='/person.png' alt='유저'  className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>연재 마감에 쫓겨 매일</p>
                <p>새로운 웹소설을 써내야 하는</p>
                <p> 창작자, 작가</p>
              </div>
              <div>
                <img
                  src='/grandmother.png'
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
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>인공지능이 이를 인식해 이야기의 도입부를 만들어 줍니다.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>인공지능과 번갈아가며 웹소설을 전개해 보세요.</p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to='/app/webnovel'>
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

export default WebnovelDetail;


