import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";

import styled from "styled-components";
const BusinessItemDetail = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>비지니스 아이디어</h1>
          <h2>
          콘텐츠를 상품으로 만드는 법. 나만의 콘텐츠, 나만의 비지니스 어떻게 준비할 수 있을까요?
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
            <img src='/tinggle.png' alt='팅젤이' className='Detail-img' />
            <div className='Detail-TextBox'>
              <div>
                <h3>콘텐츠가 사업과 이어질 수 있는 연결고리를 먼저 설계해보세요.</h3>
                <p>
                내가 좋아서 만드는 콘텐츠로 돈을 벌 수 있는 있는 방법은 없을까요? 콘텐츠를 만들기 전, 장기적인 계획을 세워볼 수 있습니다. 
                </p>
              </div>
              <div>
                <h3>내가 만들어온 콘텐츠를 바탕으로 사업 아이템을 만들어보세요.</h3>
                <p>
                블로그, 유튜브 등 콘텐츠 플랫폼에 이미 상당한 양의 콘텐츠를 쌓아만 두고 있나요? 수익화할 수 있는 새로운 경로를 모색해보세요.
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
              <Link to='/app/Businessitem'>
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
              <button style={{ marginBottom: "50px" }}>멤버쉽 가입하기</button>
            </Link>
          </div>
        </Box>

        <Box fill background='#b1b5e6' className='DetailBottom2'>
          <div className='Bottom2-Content'>
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
          <div className='Bottom2-Content'>
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

export default BusinessItemDetail;
