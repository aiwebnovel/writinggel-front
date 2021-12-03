import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';

import styled from "styled-components";

const StorySrcDetail = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
       <ScrollToTop/>
      <Box justify="center" align="center" className="BoxContainer">
        <Box className="DetailHeader" pad="medium">
          <h1>이야기 재료 찾기</h1>
          <h2>
            모든 이야기는 점에서 시작합니다. 점을 선으로, 선을 면으로
            확장해보세요.
          </h2>
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
              <QuoteBox>
                <h4>🖊 Creativity is just connecting things.</h4>
                <p>창의력은 단지 점들을 연결하는 것이다.</p>
                <p style={{ textAlign: "right" }}>- 스티브 잡스</p>
              </QuoteBox>
              <div>
                <h3>거창한 이야기가 아닌, 아주 작은 단위에서 시작해보세요.</h3>
                <p>
                  이 세상에 완전히 새로운 이야기는 없습니다. 우리에게 익숙한
                  단어들을 조합하다가 뜻밖의 이야기를 만나실지도 몰라요.
                </p>
              </div>
              <div>
                <h3>언어 감각이 자연스럽게 자극되면서 창의력이 생길 거에요.</h3>
                <p>
                  서로 상관 없어 보이는 단어들을 잇는 것만으로 언어 감각이
                  좋아집니다. 잠들어 있는 당신의 언어감각을 깨워보세요!
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
                <img src="/person.png" alt="유저" className="Detail2-img" />
                <p style={{ marginTop: "25px" }}>새로운 이야기 소재가</p>
                <p>필요한 창작자들</p>
              </div>
              <div>
                <img src="/man.png" alt="유저" className="Detail2-img" />
                <p style={{ marginTop: "25px" }}>
                  오래동안 안 써서 굳어진 언어 감각을
                </p>
                <p>유연하게 스트레칭하고 싶은 사람들</p>
              </div>
              <div>
                <img src="/woman3.png" alt="유저" className="Detail2-img" />
                <p style={{ marginTop: "25px" }}>언어 기반의 게임으로</p>
                <p>아동, 청소년들의 언어 능력을</p>
                <p>향상시키고 싶은 교사, 부모들</p>
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
                 무작위로 뽑힌 단어 세 개를 활용해 자신만의 이야기를 엮어보세요.
                </p>
              </div>
              <div>
                <img src="/ai.png" alt="ai" className="Detail3-img" />
                <p>
                함께 제시되는 예시를 보면서 힌트를 얻을 수 있습니다. 자신이 쓴 이야기와 비교해봐도 좋아요.
                </p>
              </div>
              {/* <div>
                <img src="/note.png" alt="writing" className="Detail3-img" />
                <p>
                  글을 쓰면서 얻은 영감을 바탕으로 새로운 이야기를 만들어낼 수
                  있습니다.
                </p>
              </div> */}
            </Box>
            <div className="intoServiceBtn">
              <Link to="/app/Storysrc">
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

        <Box fill background="#b1b5e6" className="DetailBottom2">
          <div className="Bottom2-Content">
            <h4>
              <StatusGood />
              멤버십 안내
            </h4>
            <p>
              멤버십 가입을 위한 결제가 이뤄지면, 곧바로 서비스를 이용하실 수
              있습니다.
            </p>
            <p>
              멤버십 구독료는 선택하신 결제주기에 따라 1개월, 3개월, 6개월마다
              이뤄집니다.
            </p>
            <p>
              멤버십 이용 기간은 다음 결제 주기에 해당하는 월(1개월 뒤, 3개월
              뒤, 6개월 뒤)에 동일한 날짜까지 입니다.
            </p>
            <p>
              다음 결제 주기 이전에 멤버십 이용을 취소하시면, 해당 기간까지
              서비스를 이용할 수 있습니다.
            </p>
          </div>
          <div className="Bottom2-Content">
            <h4>
              <StatusGood />
              환불 안내
            </h4>
            <p>
              결제일로부터 7일이 지나지 않았고 서비스이력이 없는 경우, 콘텐츠
              이용 취소 및 전액 환불이 가능합니다.
            </p>
            <p>
              결제 취소 및 환불은 환불 신청 접수 후 7영업일 이내에 처리합니다.
            </p>
            <p>환불 신청 절차는 FAQ에서 확인하실 수 있습니다.</p>
          </div>
        </Box>
      </Box>
    </Layout>
  );
};

export default StorySrcDetail;

const QuoteBox = styled.div`
  background-color: #f7f6f3;
  padding: 15px;
  margin-top: 20px;

  > h4,
  p {
    font-size: 16px;
  }
`;
