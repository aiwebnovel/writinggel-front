import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';
import TagManager from 'react-gtm-module';

// import styled from "styled-components";

const LoveLetterDetail = () => {
  const size = useContext(ResponsiveContext);

    useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/service/loveletter',
        pageTitle: 'mbti 러브레터 소개',
      },
    });

  },[])


  return (
    <Layout>
       <ScrollToTop/>
      <Box justify="center" align="center" className="BoxContainer">
        <Box className="DetailHeader" pad="medium">
          <h1>MBTI 연애편지</h1>
          <h2>사랑에 빠지면, 창의력이 높아집니다. 글로 마음을 전달해보세요.</h2>

          <hr />
        </Box>

        <Box fill className="DetailContainer">
          <Box
            direction={size !== "small" ? "row" : "column"}
            gap="large"
            justify="center"
            align="center"
            className="Detail1"
          >
            <img src="/tinggle.png" alt="팅젤이" className="Detail-img" />
            <div className="Detail-TextBox">
              <div>
                <h3>
                  사랑에 빠진 사람과 함께 산책하는 상상을 하기만 해도 창의력이
                  높아진다는{" "}
                  <a
                    href="https://edition.cnn.com/2010/LIVING/personal/02/10/o.love.makes.you.creative/index.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    연구
                  </a>
                  가 있습니다.
                </h3>
                <p>
                  창의력과 신경화학적으로 연결되어 있는 도파민을 자극하기
                  때문입니다. 고대에도 창의적인 사람들은 자신의 창의력을
                  파트너를 유혹하는 데 썼다고 하는데요. 당신의 파트너에게 보내는
                  연애편지로 창의력을 자극시켜보는 건 어떨까요?
                </p>
              </div>
              <div>
                <h3>
                  한창 썸타고 있는, 혹은 연애 중인 파트너에게 마음을 어떻게
                  전달할 수 있을까?
                </h3>
                <p>
                  글로 마음을 전달하기 막막할 때, MBTI 연애편지 서비스에서 팁을
                  얻을 수 있습니다. 꼭 글로 전달하지 않더라도 나의 매력이
                  무엇인지, 상대방이 나에게 어떤 의미인지 돋보이게 할지 힌트를
                  얻을 수 있습니다.
                </p>
              </div>
            </div>
          </Box>

          <Box className="Detail2" justify="center" align="center">
            <h3>누가 활용할 수 있을까요?</h3>
            <hr />
            <Box
              direction={size !== "small" ? "row" : "column"}
              className="Detail2-Content"
            >
              <div>
                <img src="/woman4.png" alt="유저" className="Detail2-img" />
                <p style={{ marginTop: "25px" }}>
                  내 안에 잠자는 연애세포와 창의력을{" "}
                </p>
                <p>동시에 자극하고 싶은 사람들</p>
              </div>
              <div>
                <img src="/man2.png" alt="유저" className="Detail2-img" />
                <p style={{ marginTop: "25px" }}>썸 타고 있는 파트너에게</p>
                <p>마음을 전달할 방법을</p>
                <p>찾고 있는 사람들</p>
              </div>
              <div>
                <img src="/woman.png" alt="유저" className="Detail2-img" />
                <p style={{ marginTop: "25px" }}>
                  MBTI 기반으로 이야기 속 캐릭터를
                </p>
                <p>만들어내고 싶은 사람들,</p>
                <p> MBTI 관련 콘텐츠 제작자</p>
              </div>
            </Box>
          </Box>

          <Box className="Detail3" justify="center" align="center">
            <h3>어떻게 활용할 수 있을까요?</h3>
            <hr />
            <Box
              direction={size !== "small" ? "row" : "column"}
              className="Detail3-Content"
            >
              <div>
                <img src="/agreement.png" alt="문서" className="Detail3-img" />
                <p>
                  연애편지를 보내는 사용자, 그리고 받아볼 상대의 MBTI를 알고
                  있어야 합니다.
                </p>
              </div>
              <div>
                <img src="/ai.png" alt="ai" className="Detail3-img" />
                <p>
                  MBTI를 각각 입력한 후 결과로 나오는 연애편지를 참고해
                  상대방에게 편지를 쓸 수 있습니다.
                </p>
              </div>
              <div>
                <img src="/note.png" alt="writing" className="Detail3-img" />
                <p>
                  MBTI 관련 콘텐츠를 제작하는 사람들은 이를 활용하여 다양한
                  콘텐츠(글, 카드뉴스, 동영상)를 제작할 수 있습니다.
                </p>
              </div>
            </Box>
            <div className="intoServiceBtn">
              <Link to="/app/LoveLetter">
                <button>서비스 이용하기</button>
              </Link>
            </div>
          </Box>
        </Box>

        {/* 멤버쉽 안내 구간 */}
        <Box fill className="DetailBottom1" justify="center" align="center">
          <Grid
            // columns={size !== "small" ? { count: 2, size: "auto" } : "100%"}
            columns="100%"
            gap="large"
          >
            <div className="Bottom1-Content">
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
            <div className="Bottom1-Content">
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
          <div className="intoServiceBtn">
            <Link to="/signIn">
              <button style={{ marginBottom: "50px" }}>멤버십 가입하기</button>
            </Link>
          </div>
        </Box>

      
      </Box>
    </Layout>
  );
};

export default LoveLetterDetail;
