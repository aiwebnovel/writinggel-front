import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";

import styled from "styled-components";

const DailyWriteDetail = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>일상 기록 질문 자판기</h1>
          <h2>
            일상 기록은 영감의 원천입니다. 익숙하고 평범한 일상을 새로운
            관점으로 바라보세요!
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
                <h3>
                  몇몇 유명 작가들은 일기 쓰기가 창의력에 미치는 영향을
                  보여줍니다.
                </h3>
                <p>
                  헨리 데이비드 소로, 앤 프랭크, 버지니아 울프, 앙드레 지드,
                  오스카 와일드, 알베르 카뮈 등
                  <a
                    href='https://www.themarginalian.org/2014/09/04/famous-writers-on-keeping-a-diary/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    일상을 기록하며 자신의 작품 세계를 완성한 작가들
                  </a>
                  이 많습니다.
                </p>
                <QuoteBox>
                  <h4>
                    🖊 The habit of writing thus for my own eye only is good practice. It loosens the ligaments
                  </h4>
                  <p>나만의 시각을 위해 쓰는 습관은 좋은 연습이다. 인대를 느슨하게 합니다.</p>
                  <p style={{ textAlign: "right" }}>- 버지니아 울프</p>
                </QuoteBox>
              </div>
              <div>
                <h3>
                  나의 사소한 일상 속에 이미 숨어있는 이야기를 발견해보세요.
                </h3>
                <p>
                  나의 삶, 일상 속에서 글쓰기 소재를 발견할 수 있도록 질문을
                  랜덤으로 제시합니다. 예기치 못한 질문의 답을 글로 써보면,
                  나만의 이야기가 하나씩 쌓일 거에요.
                </p>
              </div>
              <div>
                <h3>관점만 바꿔도 이야기가 됩니다.</h3>
                <p>
                  별 생각 없이 당연하게 살았던 일상을 지금까지와는 다른 관점에서
                  바라볼 수 있습니다. 새로운 관점은 삶의 생기를 갖게 하고,
                  당신의 창의력을 자극시킬 거에요.
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
                <p style={{ marginTop: "25px" }}>
                  셀프 브랜딩, 자아 성장을 목적으로
                </p>
                <p>나 자신을 만나고 싶은 사람들</p>
              </div>
              <div>
                <img src='/writer.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>나, 그리고 나의 일상을</p>
                <p>콘텐츠로 표현하고 싶은 사람들</p>
              </div>
              <div>
                <img
                  src='/grandfather.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>
                평범하고 익숙한 일상 속에서
                </p>
                <p>새로운 관점을 가지고 싶은 사람</p>
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
                  매일 아침이나 저녁 일정한 시간에 일상 기록 질문 카드를 활용해
                  자신을 돌아볼 수 있습니다.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai' className='Detail3-img' />
                <p>
                  글을 쓰면서 얻은 영감을 바탕으로 새로운 이야기를 만들어낼 수
                  있습니다.
                </p>
              </div>
              <div>
                <img src='/note.png' alt='writing' className='Detail3-img' />
                <p>
                  글을 쓰면서 얻은 영감을 바탕으로 새로운 이야기를 만들어낼 수
                  있습니다.
                </p>
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

export default DailyWriteDetail;

const QuoteBox = styled.div`
  background-color: #f7f6f3;
  padding: 15px;
  margin-top: 20px;

  > h4, p {
    font-size: 16px;
  }
`;
