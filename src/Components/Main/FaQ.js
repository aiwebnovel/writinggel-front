import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import Layout from "../Layout";
import { Box, ResponsiveContext, Accordion, AccordionPanel } from "grommet";
import { CircleQuestion, Alert, BlockQuote } from "grommet-icons";

import styled from "styled-components";

const FaQ = () => {
  const [isopen, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          pad='large'
          className='FaQHeader'
        >
          <h2>FAQ</h2>
        </Box>

        <Box
          fill
          justify='center'
          align='center'
          gap='large'
          className='FaqContainer'
        >
          <FaqIntro>
            라이팅젤 유저들이 많이 찾는 질문을 확인해보세요.
            <BlockQuote size='medium' />
          </FaqIntro>

          <Box fill className='Faq-Content'>
            <div className='Faq-Title'>
              <h2>
                <CircleQuestion /> 계정
              </h2>
            </div>
            <Accordion className='Faq-Accordion' multiple>
              <AccordionPanel
                label='Q. 계정을 삭제하려면 어떻게 해야 하나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    라이팅젤 웹사이트 우측 상단 마이페이지 [사람모양 아이콘]
                    &gt; [마이페이지]에서 [회원 정보 수정]을 클릭하셔서 계정
                    삭제(탈퇴)하실 수 있습니다.
                  </p>

                  <p>
                    계정 삭제 시, 멤버십 가입 내역도 삭제됩니다. 멤버십에
                    가입하여 서비스를 이용하는 중에 계정 삭제(탈퇴)를 하면 더
                    이상 이용이 불가합니다. 신중한 결정 부탁드립니다.
                  </p>
                </div>
              </AccordionPanel>
              <AccordionPanel
                label='Q. 이메일 주소를 변경하려면 어떻게 해야 하나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    라이팅젤 웹사이트 우측 상단 마이페이지 [사람모양 아이콘]
                    &gt; [마이페이지]에서 [회원 정보 수정]을 클릭하시면, 이메일
                    주소 변경이 가능합니다.
                  </p>
                </div>
              </AccordionPanel>
            </Accordion>
          </Box>

          <Box fill className='Faq-Content'>
            <div className='Faq-Title'>
              <h2>
                <CircleQuestion /> 멤버쉽
              </h2>
            </div>
            <Accordion className='Faq-Accordion' multiple>
              <AccordionPanel
                label='Q. 멤버십 구독 이용료는 언제 결제 되나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    라이팅젤 멤버십은 1개월/3개월/12개월의 정기 결제 서비스이며
                    멤버십을 시작한 날짜에 자동으로 정기 결제가 이루어집니다.
                  </p>
                  <p>(예: 11월 22일에 멤버십 시작 시, 결제일은 해당 월의 22일 )</p>
                  <p>
                    단, 결제 날짜가 특정 월에 포함되지 않은 날짜로 지정된 경우
                    해당 월의 마지막 날에 결제됩니다.
                  </p>
                  <p>(예: 7월 31일에 멤버십
                    시작 시, 31일이 포함되지 않은 달에는 해당 월의 마지막 날
                    결제)</p>
                </div>
              </AccordionPanel>
              <AccordionPanel
                label='Q. 멤버십을 해지하려면 어떻게 해야 하나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    더 이상 멤버십 이용을 원하지 않으실 경우, 다음 결제 예정일에
                    결제가 이루어지지 않도록 직접 해지하실 수 있습니다.
                  </p>
                  <p>
                    라이팅젤 웹사이트 우측 상단 마이페이지 [사람모양 아이콘]
                    &gt; [마이페이지]에서 구독 상품 항목에 있는 [멤버십 해지]를
                    클릭하시면, 다음 결제 예정일부터 결제가 이루어지지 않습니다.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionPanel
                label='Q. 멤버십 이용료 환불 규정이 궁금해요.'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    결제일로부터 7일이 지난 경우, 콘텐츠 이용 취소가 불가합니다.
                    결제일로부터 7일이 지나지 않았고 서비스이력이 없는 경우,
                    콘텐츠 이용 취소 및 전액 환불이 가능합니다. 결제 취소 및
                    환불은 환불 신청 접수 후 7영업일 이내에 처리합니다.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionPanel
                label='Q. 멤버십 이용료 환불 절차를 알려주세요.'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    콘텐츠 이용을 취소하고자 하는 이용자(결제일로부터 7일이
                    지나지 않았고 서비스이력이 없는 경우만 가능)는 서비스 취소
                    신청서를 작성하여 support@appplatform.co.kr로 보냅니다.
                    신청서에는 취소 사유, 이용자 연락처(이메일 주소, 휴대폰
                    번호) 등을 기입합니다.
                  </p>
                  <p>
                    취소 신청서가 접수된 후, 해당 이용자의 서비스 이력을
                    확인하여 취소 가능 여부를 확인합니다. 취소가 가능한 경우,
                    7영업일 이내에 이용대금 결제와 동일한 방법으로 환불이
                    됩니다.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionPanel
                label='Q. 멤버십을 구독하는 사용자 계정을 공유 혹은 양도할 수 있나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    라이팅젤 멤버십 계정은 공유와 양도 모두{" "}
                    <span>
                      <b>불가</b>
                    </span>
                    합니다.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionPanel
                label='Q. 새로운 서비스가 오픈될 때마다 알림을 받을 수 있나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    가입해주신 계정(이메일 주소)으로 보내드리는 뉴스레터를 통해
                    새로운 소식을 알려드릴 예정입니다. 뉴스레터 구독에
                    동의해주시면 새로운 소식을 가장 빨리 접하실 수 있습니다.
                  </p>
                </div>
              </AccordionPanel>

              <AccordionPanel
                label='Q. 멤버십을 구독하는 사용자를 위한 서비스 이용 관련 교육을 제공하나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    서비스 이용 안내 혹은 글쓰기 관련 강의를 월 1회 진행하려고
                    계획하고 있습니다. 관련 소식은 뉴스레터를 통해 보내드리도록
                    하겠습니다.
                  </p>
                </div>
              </AccordionPanel>
            </Accordion>
          </Box>

          <Box fill className='Faq-Content'>
            <div className='Faq-Title'>
              <h2>
                <CircleQuestion /> 결제
              </h2>
            </div>
            <Accordion className='Faq-Accordion' multiple>
              <AccordionPanel
                label='Q. 결제 영수증은 어디서 확인할 수 있나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>추후 업데이트 예정</p>
                </div>
              </AccordionPanel>
              <AccordionPanel
                label='Q. 해외 카드 결제 가능한가요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    아쉽게도 현재는 국내(한국)에서 발급된 신용/체크카드로만
                    결제하실 수 있습니다. 추후 다양한 결제수단을 지원할 수
                    있도록 부지런히 노력하겠습니다.
                  </p>
                </div>
              </AccordionPanel>
              <AccordionPanel
                label='Q. 법인 카드 결제 가능한가요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>추후 업데이트 예정</p>
                </div>
              </AccordionPanel>
            </Accordion>
          </Box>

          <Box fill className='Faq-Content'>
            <div className='Faq-Title'>
              <h2>
                <CircleQuestion /> 이용문의
              </h2>
            </div>
            <Accordion className='Faq-Accordion' multiple>
              <AccordionPanel
                label='Q. 인공지능 활용한 글쓰기 서비스에 대해 제안하려면 어떻게 해야 하나요?'
                className='Faq-AccoPanel'
              >
                <div className='Faq-PanelContent'>
                  <p>
                    멤버십에 가입하신 분들을 위해 새로운 서비스를 계속 준비하고
                    있습니다. 제안하실 내용이 있으시면, 문의하기 또는
                    support@appplatform.co.kr로 보내주세요.
                  </p>

                  <p>
                    계정 삭제 시, 멤버십 가입 내역도 삭제됩니다. 멤버십에
                    가입하여 서비스를 이용하는 중에 계정 삭제(탈퇴)를 하면 더
                    이상 이용이 불가합니다. 신중한 결정 부탁드립니다.
                  </p>
                </div>
              </AccordionPanel>
            </Accordion>
          </Box>

          <FaqMore fill >
            <div className='support'>
              <h2>
                <Alert /> 궁금한 내용이 해결되지 않았다면?
              </h2>
            </div>
            <p><Link to='/ask'>문의하기</Link> 또는 <span>support@appplatform.co.kr</span>로 문의해주세요.</p>
          </FaqMore>
        </Box>
      </Box>
    </Layout>
  );
};

export default FaQ;

const FaqIntro = styled.div`
  padding: 48px 0 20px 0;
  /* font-weight: 900; */
  font-size: 24px;
  border-bottom: 1px solid #444;
  margin-bottom: 40px;
  font-family: "NeoDunggeunmo";
`;

const FaqMore = styled(Box)`
border: 1px solid #444;
border-radius : 10px;
background-color: #ffce1f;

.support {
  border-top-left-radius : 10px;
  border-top-right-radius: 10px;
  padding: 36px;

  > h2 {
    display:flex;
    align-items: center;

    font-size : 1.5rem;
    font-weight: 900;

    > svg {
        margin-right: 5px;
    }
}
}

> p {
  
  padding: 0 36px 36px 36px;

  > a {
    cursor: pointer;
    font-weight: 600;
  }

  > span {
    text-decoration: underline;
  }
}

`