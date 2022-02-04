import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import ScrollToTop from "../../../routes/ScrollToTop";
import TagManager from "react-gtm-module";

const CoverLetterDetail = () => {
  const size = useContext(ResponsiveContext);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/service/coverletter",
        pageTitle: "대입 자소서 완성 소개",
      },
    });
  }, []);

  return (
    <Layout>
      <ScrollToTop />
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>대입 자소서 완성</h1>
          <div>
            <h2>
              자기소개서 질문 앞에만 서면 작아지나요? 
            </h2>
            <h2>자동 완성으로 자신감을 높여보세요.</h2>
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
                <h3>당신의 자소서는 이미 완성되어 있습니다.</h3>
                <p>
                  어떻게 써야 할지 몰라서 망설여질 뿐이죠. 팅젤이 자동 완성하는
                  자소서 답안에서 당신이 이미 가지고 있는 실력과 능력, 경험과
                  자원 중에 어떤 것들을 골라 쓸 수 있을지, 힌트를 얻어 보세요.
                  자소서 답안을 당신에게 어울리게 다듬어서 이미 완성형인 당신을
                  멋지게 소개해보세요.
                </p>
              </div>
              <div>
                <h3>당신의 꿈 앞에서 작아지지 마세요.</h3>
                <p>
                  대학교에 진학해서 원하는 공부를 하고 싶은데, 자소서에 막혀서
                  꿈을 포기하는 일이 있어서는 안 되죠. 희망하는 전공을 입력하면,
                  전공에 필요한 역량에 맞는 답안을 제시합니다. 전공에 필요한
                  당신의 역량을 발견해서 꿈을 이뤄보세요.
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
                <img src='/woman.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>
                대학 입학을 코앞에 두고
                </p>
                <p>자기소개서를 작성해야 하는 </p>
                <p>고3 청소년, N수생, 그리고 부모</p>
              </div>
              <div>
                <img src='/woman3.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>
                자기소개서를 잘 쓸 수 있도록
                </p>
                <p>코칭하는 교육 컨설턴트</p>
              </div>
              <div>
                <img
                  src='/grandfather2.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>자기소개서를 대비해 교내외 생활을</p>
                <p>미리 설계하고 싶은 청소년, 부모</p>
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
                대학교 공통질문 세 개 중에 원하는 질문과 희망 전공을 선택합니다.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>
                인공지능이 제안하는 답변을 자신의 상황에 맞게 다듬어서 자기소개서를 작성합니다.
                </p>
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
