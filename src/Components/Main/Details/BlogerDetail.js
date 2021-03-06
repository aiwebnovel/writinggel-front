import React, {useContext, useEffect} from "react";
import  {Link} from 'react-router-dom';
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from "../../../routes/ScrollToTop";
import TagManager from 'react-gtm-module';

const BlogerDetail = () => {

  const size = useContext(ResponsiveContext);


  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/bloger',
        pageTitle: '블로그 소개',
      },
    });

  },[])

  return (
    <Layout>
       <ScrollToTop/>
         <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>블로그 쓰기 A to Z</h1>
          <div>
          <h2>파워 블로거로 가는 똑똑한 지름길!</h2>
          <h2>독자의 이목을 끄는 매력적인 콘텐츠를 만들어보세요.</h2>
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
            <img src='/lantern.png' alt='팅젤이' className="Detail-img"/>
            <div className='Detail-TextBox'>
              <div>
                <h3>나만의 콘텐츠로 독자의 이목을 끌어보세요.</h3>
                <p>
                특정 주제/분야 안에서 자신만의 콘텐츠로 자리매김하려면 어떻게 해야 할까요? 인공지능의 도움으로 독자의 이목을 끄는 매력적인 콘텐츠를 만들어보세요.
                </p>
              </div>
              <div>
                <h3>
                하루에도 여러 개 포스팅해야 하는 블로그, 인공지능으로 해결하세요.
                </h3>
                <p>
                방문자 유입, 방문자 체류시간 증대를 위해 다양한 콘텐츠를 만들기 어려우시죠? 인공지능의 도움으로 콘텐츠 제작의 수고를 덜어보세요. 
                </p>
              </div>
            </div>
          </Box>

          <Box className='Detail2' justify='center' align='center'>
            <h3>누가 활용할 수 있을까요?</h3>
            <hr/>
            <Box
              direction={size !== "small" ? "row" : "column"}
              className='Detail2-Content'
            >
              <div>
                <img src='/man.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>블로그를 이제 막 시작하고 싶은</p>
                <p>초보 블로거</p>
              </div>
              <div>
                <img src='/woman4.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>매일 새로운 콘텐츠를 만들어</p>
                <p>많은 방문자 유입이 필요한</p>
                <p>파워블로거</p>
              </div>
              <div>
                <img
                  src='/woman.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>한 주제/분야 안에서</p>
                <p>자신만의 콘텐츠를</p>
                <p>쌓아나가고 싶은 사람</p>
              </div>
            </Box>
          </Box>

          <Box className='Detail3' justify='center' align='center'>
            <h3>어떻게 활용할 수 있을까요?</h3>
            <hr/>
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
                기본적으로 블로그로 쓰고 싶은 대주제를 입력하면 제목, 개요, 도입부 등을 제시합니다.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>블로그 연관 검색어를 활용해 주제를 더 독자의 관심에 맞춰 구체화해보세요</p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>이어쓰기를 활용해 블로그 콘텐츠를 채우는 수고를 덜어보세요.</p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to="/app/bloger/idea"><button>서비스 이용하기</button></Link>
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
            <Link to='/signIn'><button style={{ marginBottom: '50px'}}>멤버십 가입하기</button></Link>
          </div>
        </Box>

      </Box>
    </Layout>
  );
};

export default BlogerDetail;

