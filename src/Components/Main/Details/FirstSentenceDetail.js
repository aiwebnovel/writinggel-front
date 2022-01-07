import React, {useContext, useEffect} from "react";
import  {Link} from 'react-router-dom';
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';
import TagManager from 'react-gtm-module';

import styled from "styled-components";

const FirstSentencelDetail = () => {

  const size = useContext(ResponsiveContext);
  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/firstsentence',
        pageTitle: '첫문장 소개',
      },
    });

  },[])

  return (
    <Layout>
      <ScrollToTop/>
 <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>첫문장 자판기</h1>
          <FirstIntro>
            <h2>당신의 이야기는 어떤 문장으로 시작하나요?</h2>
            <p>숏폼 콘텐츠에 익숙해진 독자들의 시선을 사로잡아보세요.</p>
          </FirstIntro>
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
            <img src='/tinggle.png' alt='팅젤이' className='Detail-img' />
            <div className='Detail-TextBox'>
              <div>
                <h3>첫문장은 이야기의 첫인상입니다.</h3>
                <p>
                매력적인 첫문장은 독자가 계속 다음 문장에도 마음을 열 수 있게 하는 힘을 가지고 있습니다. 수천억개의 데이터를 학습한 인공지능이 제안하는 첫문장은 이야기를 매력적으로 이끌어줄 거에요.
                </p>
              </div>
              <div>
                <h3>이야기의 첫 단추를 잘 꿰면 이야기가 술술 풀리기도 합니다.</h3>
                <p>
                훌륭한 첫 문장은 앞으로 전개할 이야기를 상상하게 합니다. 상상력을 자극하는 첫문장 뒤 이어지는 당신만의 이야기를 덧붙여보세요.
                </p>
              </div>
              <div>
                <h3>숏폼 콘텐츠에 익숙해진 독자들의 시선 사로잡기</h3>
                <p>
                웹 페이지 하나에 소비하는 시간은 딱 <a href='https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/' target='_blank' rel="noreferrer">10초.</a> 독자들을 더 오랫동안 머물게 하기 위해서는 시선을 사로잡는 첫인상이 필요합니다
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
                <img src='/man4.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>글 쓰려고 앉으면,</p>
                <p>첫문장에서 막히는 사람</p>
              </div>
              <div>
                <img src='/grandmother2.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>
                새로운 이야기에
                </p>
                <p>상상력이 필요한 사람</p>
              </div>
              <div>
                <img
                  src='/grandfather2.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>글쓰기 모임을 이끌거나</p>
                <p>참여하는 사람</p>
              </div>
              <div>
                <img
                  src='/woman2.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>독자들을 더 오랫동안</p>
                <p>머무르게 하고 싶은</p>
                <p>콘텐츠 크리에이터</p>
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
                <p>
                랜덤으로 나오는 결과 중에 당신의 이야기에 어울리는 첫 문장을 골라보세요.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>첫문장 뒤에 이어지는 이야기를 상상하면서 세 문장을 써보세요.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>첫문장 자판기를 활용해 매일매일 꾸준히 글쓰는 모임을 이끌어 보세요. </p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to='/app/Firstsentence'>
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

export default FirstSentencelDetail;

const FirstIntro = styled.div`

  line-height: 20px;
  padding: 15px 0 30px 0;

  > h2 {
    font-size: 16px;
  }

  > p {
    font-size: 15px;
  }
`