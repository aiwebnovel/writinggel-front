import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";

import styled from "styled-components";

const LyricsDetail = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>영어 가사 쓰기</h1>
          <h2>
            나도 랩이나 노래 속에 영어 가사 넣고 싶다. 문법, 맞춤법 틀릴 걱정
            없이 정확하게.
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
                <h3>래퍼들은 가사 쓸 때 번역기를 돌릴까?</h3>
                <p>
                다들 외국에 살다온 원어민처럼 랩이나 노래 가사를 쉽게 써내는데, 나만 어렵게 느껴지나요? 인공지능 영어 가사 쓰기로 도전해보세요. 맞춤법이나 문법 걱정 없이 가져다 쓰실 수 있습니다.
                </p>
              </div>
              <div>
                <h3>영어 실력을 키울 수 있습니다.</h3>
                <p>
                단어, 문법을 학습하는 차원을 넘어 실제 창작물에 적용된 영어를 만날 수 있습니다. 내 취향, 필요에 맞게 수정하면서 영어 실력을 더 향상해보세요.
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
                <img src='/boy.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>영어로 나만의 창작물을</p>
                <p>만들어 보고 싶은 사람</p>
              </div>
              <div>
                <img src='/woman6.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>
                이제 막 배우기 시작한
                </p>
                <p>영어의 감각을 키워보고 싶은 사람</p>
              </div>
              <div>
                <img
                  src='/man3.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>영어로 가사를 넣고 싶은</p>
                <p>크리에이터</p>
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
                창작하고자 하는 주제를 키워드로 간단히 입력해보세요.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>결과물을 나의 취향, 필요에 맞게 수정해보세요.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>노래나 동영상, 블로그나 책 등 나의 콘텐츠에 담아보세요.</p>
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

export default LyricsDetail;
