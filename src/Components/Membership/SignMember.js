import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Bookmark, StatusGood, Trigger, CreditCard } from "grommet-icons";
import Loading from "../SmallLoading";
import TagManager from "react-gtm-module";
import ScrollToTop from "../../routes/ScrollToTop";

import * as configUrl from "../../config";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { css } from "styled-components";
import { useHistory } from "react-router";
import Modal from "../SmallModal";
import moment from 'moment';

const SignMember = () => {
  const size = useContext(ResponsiveContext);
  const history = useHistory();
  const element = useRef();
  const element3 = useRef();
  const element6 = useRef();

  const styles = {
    inputWrapper: {
      base: css`
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #ededed;
        border-color: #ededed;
        box-shadow: none;
      `,
      errored: css`
        border-color: unset;
        box-shadow: unset;
        border: 0;
        border-bottom: 1px solid #f45752;
      `,
      focused: css`
        border-color: unset;
        box-shadow: unset;
        border-bottom: 1px solid #372874;
        outline: 0;
      `,
    },
    input: {
      errored: css`
        color: #f45752;
      `,
      cardNumber: css`
        font-size: 16px;
      `,
    },
    errorText: {
      base: css`
        color: #f45752;
      `,
    },
  };

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    wrapperProps,
  } = usePaymentInputs();

  const { IMP } = window;
  const [isOpen, SetOpen] = useState(false);

  const [isLoading, SetLoading] = useState(false);
  const [Selected, SetSelected] = useState({
    selected1: false,
    selected2: false,
    selected3: false,
  });

  const [isCredit, setCreditPay] = useState(false);
  const [isKakao, setKakaopay] = useState(false);

  const [Price, SetPrice] = useState("");
  const [card, SetCard] = useState({
    cardNum: "",
    cardExpire: "",
    cardCvc: "",
  });

  const [buyerName, SetName] = useState("");
  const [userNumber, SetNumber] = useState({
    cardPwd: "",
    idNum: "",
  });

  const [Plan, SetPlan] = useState('');

  const { selected1, selected2, selected3 } = Selected;
  const { cardNum, cardExpire, cardCvc } = card;
  const { cardPwd, idNum } = userNumber;

  const HandleChange = (e) => {
    //console.log(cardNum);
    SetCard({ ...card, [e.target.name]: e.target.value });

    if (e.target.name === "buyerName") {
      SetName(e.target.value);
    }
  };

  const HandleNumber = (e) => {
    //console.log(e.target.value, e.target.name);
    if (isNaN(e.target.value) === false) {
      SetNumber({ ...userNumber, [e.target.name]: e.target.value });
    } else {
      toast.error("숫자를 적어주세요!");
    }
  };

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  // 결제 post
  const RequestBill = async () => {
    let user = await sessionStorage.getItem("token");
    //console.log(Price, Plan);
    if (user !== null) {
      if (selected1 === false && selected2 === false && selected3 === false) {
        //toast.error("멤버십을 선택해주세요!");
        SetOpen(true);
      } else {
        //console.log("결제");

        const now = new Date();
        let moidNum =
          now.getFullYear() +
          "" +
          (now.getMonth() + 1) +
          now.getDate() +
          now.getHours() +
          now.getMinutes() +
          now.getSeconds(); //가맹점 주문번호

        const option = {
          arsUseYn: "N",
          buyerName: buyerName, //등록자 이름
          cardExpire: cardExpire.split(" / ")[1] + cardExpire.split(" / ")[0], //유효기간
          cardNum: cardNum.replaceAll(" ", ""), //카드번호 (숫자)
          cardPwd: cardPwd, //카드 비밀번호 앞 2 자리
          idNum: idNum, //주민번호 앞 6 자리
          mid: "pgapppla1m", //상점 아이디
          moid: moidNum, //가맹점 주문번호,
          userId: (await sessionStorage.getItem("userUid")) + Math.random(),
        };
        // console.log(option);
        await axios
          .post(`https://api.innopay.co.kr/api/regAutoCardBill`, option)
          .then(async (response) => {
            let data = response.data;
            // console.log("test", data);
            await sessionStorage.setItem("moid", data.moid);

            if (data.resultCode === "F112") {
              toast.error(`error : ${data.resultMsg}!`);
            }

            if (data.resultCode === "F113") {
              toast.error(`error : ${data.resultMsg}!`);
            }
            if (data.resultCode === "9999") {
              toast.error(
                "해당 카드 번호로 3회 실패된 이력이 있어 다음 날 요청 가능합니다😭"
              );
            }

            if (data.resultCode === "0000") {
              SetLoading(true);
              let plans = parseInt(Plan);
              //console.log(plans);
              //let prices = parseInt(Price);
              let key = data.billKey;
              const config = {
                method: "post",
                url: `${configUrl.SERVER_URL}/pay`,
                headers: { authentication: sessionStorage.getItem("token") },
                data: {
                  billKey: key,
                  plan: plans,
                  name: buyerName,
                },
              };

              axios(config)
                .then(async (res) => {
                  SetLoading(false);
                  // console.log(res);

                  await history.push("/result");
                  setTimeout(toast.success(`${res.data.log}`), 3000);
                })
                .catch((error) => {
                  console.log(error);
                  SetLoading(false);
                  toast.error(`error! 혹시 이미 결제된 계정 아닌가요?`);
                });
            } else {
              throw new Error();
            }
          })
          .catch((error) => {
            console.log(error);
            SetLoading(false);
            //toast.error("결제 실패!");
          });
        //history.push('/payment')
      }
    } else {
      toast.warn("로그인을 먼저 해주세요!");
    }
  };

  const HandleSelected = (element) => {
    //console.log(e.target.name.split(" "));
    //console.log(element.current.name.split(" "));
    let month = element.current.name.split(" ")[0];
    let price = element.current.name.split(" ")[1];

    if (month === "1") {
      SetSelected({
        ...Selected,
        selected1: true,
        selected2: false,
        selected3: false,
      });
      SetPrice(price);
      SetPlan(month);
    }

    if (month === "3") {
      SetSelected({
        ...Selected,
        selected1: false,
        selected2: true,
        selected3: false,
      });
      SetPrice(price);
      SetPlan(month);
    }

    if (month === "6") {
      SetSelected({
        ...Selected,
        selected1: false,
        selected2: false,
        selected3: true,
      });
      SetPrice(price);
      SetPlan(month);
    }
  };

  const KakaoPay = () => {
    const user = sessionStorage.getItem("token");

    if (user !== null) {
      if (selected1 === false && selected2 === false && selected3 === false) {
        //toast.error("멤버십을 선택해주세요!");
        SetOpen(true);
      } else {
        const now = new Date();
        //const moidNum =moment(now).format('YYMMDDhhmmss');
        const moidNum = moment(now).unix();
        const uid = sessionStorage.getItem("userUid");
        console.log(moidNum);

        IMP.init("imp33624147");
        IMP.request_pay(
          {
            pg: "kakaopay",
            //pay_method: "kakaopay", // 기능 없음.
            merchant_uid: `${uid}_${Plan}_${moidNum}`, // 상점에서 관리하는 주문 번호
            name: "라이팅젤 멤버십",
            amount: 0, // 빌링키 발급만 진행하며 결제승인을 하지 않습니다.
            customer_uid: `customer_${uid}`, // 필수 입력
            buyer_email: sessionStorage.getItem("email"),
            buyer_name: sessionStorage.getItem("userName"),

            m_redirect_url: "https://tinytingel.ai/pay_redirect",
          },
          async (rsp) => {
            if (rsp.success) {
              //callback
              console.log(rsp);
              const config = {
                method: "post",
                url: `${configUrl.SERVER_URL}/pay/iamport`,
                headers: { authentication: sessionStorage.getItem("token") },
                data: {
                  billKey: rsp.customer_uid,
                  plan: parseInt(Plan),
                  name: sessionStorage.getItem("userName"),
                },
              };
              console.log(rsp, rsp.customer_uid);
              SetLoading(true);
              await axios(config)
                .then((res) => {
                  console.log(res);
                  toast.success(res.data.log);
                  SetLoading(false);
                })

                .catch((err) => {
                  console.log(err, err.response.data);
                  if (err.response.status === 403) {
                    SetLoading(false);
                    history.push("/fail");
                    toast.error(err.response.data.errorDescription);
                  } 
                  if(err.response.status === 500) {
                    SetLoading(false);
                    history.push("/fail");
                    toast.error(err.response.data.errorDescription);
                  }
               
                });
            } else {
              history.push("/fail");
              console.log(rsp, rsp.error_msg);
              toast.error(rsp.error_msg);
            }
          }
        );
      }
    } else {
      toast.warn("로그인을 먼저 해주세요!");
    }
  };

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/signIn",
        pageTitle: "멤버십 가입",
      },
    });
  }, []);

  return (
    <>
      <Layout>
        <ScrollToTop />
        {isLoading && <Loading />}
        <Box fill justify='center' align='center'>
          <Box
            fill
            background='#3b2477'
            color='#fff'
            className='SignInHeader'
            justify='center'
            align='baseline'
          >
            <h3>멤버십 가입하기</h3>
          </Box>

          <div className='TextCon'>
            <h2>
              <InfoFilled />
              멤버십에 가입 하시면 인공지능 기반 글쓰기 지원 서비스를 무제한
              이용하실 수 있습니다.
            </h2>
            <ExplainTextBox>
              <StatusFilled color='#fff' size='large' />
              <ExplainText>
                <h4>① 100% 인공지능 창작, 표절 &amp; 저작권 걱정 NO</h4>
                <p>
                  모든 결과물은 기존 창작물에서 가져오는 것이 아니라, 인공지능이
                  완전히 새롭게 창작하는 것이므로 표절 문제에서 자유롭습니다.
                  저작권 역시 해당 사용자(멤버십)에게 귀속됩니다.
                </p>
              </ExplainText>
            </ExplainTextBox>

            <ExplainTextBox>
              <StatusFilled color='#fff' size='large' />
              <ExplainText>
                <h4>② 계속 새로운 서비스 출시, 무제한 사용</h4>
                <p>
                  앞으로 매달 1~2개 이상의 서비스를 새롭게 개발/출시할
                  예정입니다. 멤버십에 가입하시면, 사용 기간 내 출시되는
                  서비스는 모두 무제한으로 사용하실 수 있습니다.
                </p>
              </ExplainText>
            </ExplainTextBox>

            <ExplainTextBox>
              <StatusFilled color='#fff' size='large' />
              <ExplainText>
                <h4>
                  ③ 교육(인공지능 글쓰기, 콘텐츠 만들기 등) &amp; 커뮤니티 활동
                </h4>
                <p>
                  인공지능을 활용한 글쓰기, 전자책 등 개인 콘텐츠 만들기 등 관련
                  교육을 월 1회 받을 수 있고, 그 외 온·오프라인에서 함께
                  창작활동을 할 수 있습니다.
                </p>
              </ExplainText>
            </ExplainTextBox>
          </div>
          <Box className='Sign-select'>
            <Box justify='center' align='center'>
              <h4>1. 멤버십 선택</h4>

              <Grid
                fill={size !== "small" ? false : true}
                columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
                gap='large'
                className='SignCardGrid'
              >
                <div
                  className={
                    selected1 ? "SignMemCardCon selected" : "SignMemCardCon"
                  }
                  onClick={() => HandleSelected(element)}
                >
                  <div className='SignMemCardHead'>
                    <span></span>
                    <BookmarkFilled size='medium' color='#3b2477' />
                  </div>
                  <div className='SignMemCardBody'>
                    <h3>1개월 이용권</h3>
                    <h4 style={{ marginBottom: "20px" }}>월 25,000원</h4>
                    <p>1개월마다 결제</p>
                    <br />
                    <ChoiceBtn ref={element} name='1 25,000'>
                      선택
                    </ChoiceBtn>
                  </div>
                </div>
                <div
                  className={
                    selected2 ? "SignMemCardCon selected" : "SignMemCardCon"
                  }
                  onClick={() => HandleSelected(element3)}
                >
                  <div className='SignMemCardHead'>
                    <span>20% 할인</span>
                    <BookmarkFilled size='medium' color='#3b2477' />
                  </div>
                  <div className='SignMemCardBody'>
                    <h3>3개월 이용권</h3>
                    <h4>월 20,000원</h4>
                    <p style={{ marginBottom: "20px", fontSize: "15px" }}>
                      <span>75,000</span> 60,000원
                    </p>
                    <p>3개월마다 결제</p>
                    <ChoiceBtn ref={element3} name='3 60,000'>
                      선택
                    </ChoiceBtn>
                  </div>
                </div>
                <div
                  className={
                    selected3 ? "SignMemCardCon selected" : "SignMemCardCon"
                  }
                  onClick={() => HandleSelected(element6)}
                >
                  <div className='SignMemCardHead'>
                    <span>40% 할인</span>
                    <BookmarkFilled size='medium' color='#3b2477' />
                  </div>
                  <div className='SignMemCardBody'>
                    <h3>6개월 이용권</h3>
                    <h4>월 15,000원</h4>
                    <p style={{ marginBottom: "20px", fontSize: "15px" }}>
                      <span>150,000</span> 90,000원
                    </p>
                    <p>6개월마다 결제</p>
                    <ChoiceBtn ref={element6} name='6 90,000'>
                      선택
                    </ChoiceBtn>
                  </div>
                </div>
              </Grid>
            </Box>
          </Box>

          <Box justify='center' align='center' className='SignMethodCon'>
            <h4>2. 결제 방식</h4>
            <Box
              direction='row'
              gap='small'
              className='SignMethodBox'
              justify='center'
              align='center'
            >
              <button
                onClick={() => {
                  setCreditPay(false);
                  setKakaopay(true);
                }}
                className='kakaoPayBtn'
              >
                <img src='payment_icon_yellow_small.png' alt='카카오페이' />
                <span>카카오페이</span>
              </button>
              <button
                className='creditNormal'
                onClick={() => {
                  setKakaopay(false);
                  setCreditPay(true);
                }}
              >
                <CreditCard />
                <span>신용카드</span>
              </button>
            </Box>
            {!isCredit && isKakao && (
              <div className='KakaoPayContainer'>
                <div>
                  <PayInfo>
                    <h4>멤버십 </h4>
                    <p>
                      {selected1 && "1개월 이용권"}
                      {selected2 && "3개월 이용권"}
                      {selected3 && "6개월 이용권"}
                    </p>
                  </PayInfo>
                  <PayInfo>
                    <h4>결제 </h4>
                    <p>{Price}</p>
                  </PayInfo>
                </div>
                <button onClick={KakaoPay}>결제하기</button>
              </div>
            )}
            {isCredit && !isKakao && (
              <>
                <div className='CreditBox'>
                  <h4>카드 정보 입력</h4>
                  <div className='creditCard'>
                    <PaymentInputsWrapper
                      {...wrapperProps}
                      styles={{ ...styles }}
                    >
                      <svg {...getCardImageProps({ images })} />
                      <input
                        {...getCardNumberProps({ onChange: HandleChange })}
                        value={cardNum}
                        name='cardNum'
                        maxLength='20'
                      />
                    </PaymentInputsWrapper>
                    <div className='cardExNcvc'>
                      <PaymentInputsWrapper styles={{ ...styles }}>
                        <input
                          {...getExpiryDateProps({ onChange: HandleChange })}
                          value={cardExpire}
                          name='cardExpire'
                        />
                      </PaymentInputsWrapper>
                      <PaymentInputsWrapper styles={{ ...styles }}>
                        <input
                          {...getCVCProps({ onChange: HandleChange })}
                          value={cardCvc}
                          name='cardCvc'
                        />
                      </PaymentInputsWrapper>
                    </div>
                  </div>

                  <div className='ElementBox'>
                    <p>이름</p>
                    <input
                      className='LabelElement'
                      value={buyerName || ""}
                      onChange={HandleChange}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          toast.info("이름을 써주세요.", {
                            icon: "😭",
                            style: { backgroundColor: "#fff", color: "#000" },
                            progressStyle: { backgroundColor: "#7D4CDB" },
                          });
                        }
                      }}
                      name='buyerName'
                    ></input>
                  </div>

                  <div className='ElementBox'>
                    <p>비밀번호</p>
                    <input
                      className='PwElement'
                      value={cardPwd}
                      onChange={HandleNumber}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          toast.info("비밀번호를 써주세요.", {
                            icon: "😭",
                            style: { backgroundColor: "#fff", color: "#000" },
                            progressStyle: { backgroundColor: "#7D4CDB" },
                          });
                        }
                      }}
                      name='cardPwd'
                      maxLength='2'
                    ></input>
                    <span>
                      <b>**</b>
                    </span>
                  </div>

                  <div className='ElementBox'>
                    <p>생년월일 6글자</p>
                    <input
                      className='BuyerElement'
                      value={idNum}
                      onChange={HandleNumber}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          toast.info("생년월일을 써주세요.", {
                            icon: "😭",
                            style: { backgroundColor: "#fff", color: "#000" },
                            progressStyle: { backgroundColor: "#7D4CDB" },
                          });
                        }
                      }}
                      name='idNum'
                      maxLength='6'
                    ></input>
                  </div>
                </div>
                <div className='PayCheck'>
                  <PayInfo>
                    <h4>멤버십 </h4>
                    <p>
                      {selected1 && "1개월 이용권"}
                      {selected2 && "3개월 이용권"}
                      {selected3 && "6개월 이용권"}
                    </p>
                  </PayInfo>
                  <PayInfo>
                    <h4>결제 </h4>
                    <p>{Price}</p>
                  </PayInfo>
                  <button className='creditCardButton' onClick={RequestBill}>
                    결제하기
                  </button>
                </div>
              </>
            )}
          </Box>
          <Box fill background='#f9f9f9' className='ExplainSign'>
            <div className='ExplainSign-Content'>
              <h4>
                <StatusGood />
                멤버십 안내
              </h4>
              <p>
                멤버십 가입을 위한 결제가 완료되면, 곧바로 서비스를 이용하실 수
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
            <div className='ExplainSign-Content'>
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
      <Modal open={isOpen} close={HandleModals}>
        <ConfirmDiv>
          <h3>원하시는 멤버십 주기를 선택해주세요!</h3>
          <ConfirmBtn onClick={HandleModals}>확인</ConfirmBtn>
        </ConfirmDiv>
      </Modal>
    </>
  );
};

export default SignMember;

const BookmarkFilled = styled(Bookmark)`
  path[fill="none"] {
    fill: #3b2477;
  }
`;

const ConfirmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const ConfirmBtn = styled.button`
  background-color: #ffce1f;
  border: 1px solid #ffce1f;
  padding: 5px 15px;
  font-size: 1rem;
  width: 150px;
  cursor: pointer;
  color: #444;
`;

const ChoiceBtn = styled.button`
  width: 100%;
  background-color: #372874;
  border: 1px solid #372874;
  color: #fff;
  padding: 3px;
  font-size: 18px;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const PayInfo = styled.div`
  // background-color: $white-2;
  background-color: #fff;
  border: 1px solid #372874;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  > h4 {
    font-weight: 600;
  }
`;

const ExplainTextBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  > svg {
    @media screen and (max-width: 680px) {
      display: none;
    }
  }
`;

const ExplainText = styled.div`
  > h4 {
    font-weight: 600;
  }

  > h4,
  p {
    margin: 0;
    padding: 0 10px;
  }
`;

const StatusFilled = styled(StatusGood)`
  path[fill="none"] {
    fill: #3b2477;
  }
`;

const InfoFilled = styled(Trigger)`
  path[fill="none"] {
    fill: #ffce1f;
  }
`;
