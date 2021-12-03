import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { StatusGood } from "grommet-icons";
import ScrollToTop from '../../../routes/ScrollToTop';

import styled from "styled-components";

const DiscussionDetail = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box className='DetailHeader' pad='medium'>
          <h1>찬반 논거 찾기</h1>
          <h2>
            특정 이슈에 대한 자신만의 의견을 갖고 싶나요? 탄탄하고 균형잡힌 글을
            쓸 수 있습니다
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
            <img src='/tinggle.png' alt='팅젤이' className="Detail-img"/>
            <div className='Detail-TextBox'>
              <QuoteBox>
                <h4>
                  🖊 I think I have found a balance partly due to a different
                  perspective.
                </h4>
                <p>
                  나는 다른 관점을 가진 덕분에 균형을 찾은 것 같다.
                </p>
                <p style={{textAlign:'right'}}>- 제임스 블레이크</p>
              </QuoteBox>
              <div>
                <h3>나의 의견과 관점이 담긴 글을 더 탄탄하게 만들 수 있습니다.</h3>
                <p>
                글을 탄탄하게 하려면 양쪽의 입장을 다 알아야 합니다. 균형잡힌 시각을 바탕으로 나만의 의견을 표현해보세요.
                </p>
              </div>
              <div>
                <h3>관점이 넓어질 수 있습니다.</h3>
                <p>
                다양한 매체를 통해 개인이 미디어 권력을 가진 요즘, 더 경각심을 가지고 정보를 수집해야 합니다. 가짜뉴스나 편향된 의견이 아닌 양쪽의 의견을 두루 살펴보세요.
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
                <img src='/teen.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>논술, 토론 등 특정 이슈에</p>
                <p>찬반 논거가 필요한 청소년</p>
              </div>
              <div>
                <img src='/writer.png' alt='유저' className='Detail2-img' />
                <p style={{ marginTop: "25px" }}>
                청소년에게 논술 종류의 글쓰기나
                </p>
                <p>토론을 지도하는 교사, 부모</p>
              </div>
              <div>
                <img
                  src='/grandmother.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>시사 및 사회 이슈에 대해</p>
                <p>글로 써보고 싶은 블로거, 기자 등</p>
              </div>
              <div>
                <img
                  src='/person.png'
                  alt='유저'
                  className='Detail2-img'
                />
                <p style={{ marginTop: "25px" }}>특정 이슈에 대해 찬성/반대하는 측의</p>
                <p>논지가 궁금한 사람</p>
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
                논술이나 토론 등을 대비해 논거가 필요한 이슈를 입력합니다.
                </p>
              </div>
              <div>
                <img src='/ai.png' alt='ai'className='Detail3-img' />
                <p>결과로 나온 찬성, 반대 의견을 정리해 글에 담아보세요.</p>
              </div>
              <div>
                <img src='/note.png' alt='writing'className='Detail3-img' />
                <p>상대 측 의견에 반박하면서 나의 의견이 더 탄탄해질 수도 있습니다.</p>
              </div>
            </Box>
            <div className='intoServiceBtn'>
              <Link to='/app/Discussion'>
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

export default DiscussionDetail;

const QuoteBox = styled.div`
  background-color: #f7f6f3;
  padding: 15px;


  > h4, p {
    font-size: 16px;
  }

  // > p {
  //   text-indent: 20px;

  //     @media screen and (max-width: 768px) {
  //       text-indent: 0;
  //     }
  // }

`;
