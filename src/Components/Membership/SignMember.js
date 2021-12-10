import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import Layout from "../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Bookmark } from "grommet-icons";
import Loading from "../Loading";

import * as configUrl from "../../config";

import CreditCardInput from "react-credit-card-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useHistory } from "react-router";
import Modal from "../SmallModal";

const SignMember = () => {
  const size = useContext(ResponsiveContext);
  const history = useHistory();
  const element = useRef();
  const element3 = useRef();
  const element6 = useRef();

  const [isOpen, SetOpen] = useState(false);

  const [isLoading, SetLoading] = useState(false);
  const [Selected, SetSelected] = useState({
    selected1: false,
    selected2: false,
    selected3: false,
  });
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

  const [Plan, SetPlan] = useState("");

  const { selected1, selected2, selected3 } = Selected;
  const { cardNum, cardExpire, cardCvc } = card;
  const { cardPwd, idNum } = userNumber;


  const HandleChange = (e) => {
    console.log(cardNum);
    SetCard({ ...card, [e.target.name]: e.target.value });

    if (e.target.name === "buyerName") {
      SetName(e.target.value);
    }
  };

  const HandleNumber = (e) => {
    console.log(e.target.value, e.target.name);
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
    let user = await localStorage.getItem("token");
    console.log(Price, Plan);
    if (user !== null) {
      if (selected1 === false && selected2 === false && selected3 === false) {
        //toast.error("멤버십을 선택해주세요!");
        SetOpen(true);
      } else {
        console.log("결제");

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
          userId: (await localStorage.getItem("userUid")) + Math.random(),
        };
       // console.log(option);
        await axios
          .post(`https://api.innopay.co.kr/api/regAutoCardBill`, option)
          .then(async (response) => {
            let data = response.data;
           // console.log("test", data);
            await localStorage.setItem("moid", data.moid);

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
              console.log(plans);
              //let prices = parseInt(Price);
              let key = data.billKey;
              const config = {
                method: "post",
                url: `${configUrl.SERVER_URL}/pay`,
                headers: { authentication: localStorage.getItem("token") },
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

  //결제 변경

  // const ChangeBill = () => {
  //   console.log(Plan);
  //   if (Plan !== localStorage.getItem("plan")) {

  //     // if(window.confirm('변경하면 다음 결제 예정일 전까지 변경할 수 없습니다! 정말 변경하시겠습니까?')){

  //     // }
  //     SetLoading(true);
  //     let plans = parseInt(Plan);

  //     const config = {
  //       method: "put",
  //       url: `${configUrl.SERVER_URL}/pay`,
  //       headers: { authentication: localStorage.getItem("token") },
  //       data: {
  //         plan: plans,
  //       },
  //     };
  //     axios(config)
  //       .then((response) => {
  //         console.log(response);
  //         history.replace('/mypage')
  //         setTimeout(toast.success(response.data.log), 5000);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         if (error.response.status === 403) {
  //           toast.error("이미 결제된 내역 입니다!");
  //         }
  //       }).finally(()=>{
  //         SetLoading(false);
  //       });
  //   } else {
  //     toast.warn("기존에 쓰던 멤버십을 선택하셨습니다.");
  //   }
  // };

  const HandleSelected = (element) => {
    //console.log(e.target.name.split(" "));
    console.log(element.current.name.split(" "));
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



  return (
    <>
      <Layout>
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
          <Box fill={size !== "small" ? false : true}>
            <p style={pStyle}>1. 원하시는 멤버십 주기를 클릭해주세요.</p>
            <Grid
              fill={size !== "small" ? false : true}
              columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
              gap='large'
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

          <Box justify='center' align='center' pad='large'>
            <p style={pStyle}>2. 결제 정보를 입력해주세요.</p>
            <div className='CreditBox'>
              <div className='creditCard'>
                <CreditCardInput
                  cardNumberInputProps={{
                    value: cardNum,
                    onChange: HandleChange,
                    name: "cardNum",
                  }}
                  cardExpiryInputProps={{
                    value: cardExpire,
                    onChange: HandleChange,
                    name: "cardExpire",
                    onError: (err) => toast.error(err),
                  }}
                  cardCVCInputProps={{
                    value: cardCvc,
                    onChange: HandleChange,
                    name: "cardCvc",
                    onError: (err) => toast.error(err),
                  }}
                  fieldClassName='input'
                  fieldStyle={{
                    width: "100%",
                  }}
                  containerStyle={{
                    borderBottom: "1px solid #ededed",
                  }}
                />
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
                  maxLength='4'
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
                <p>주민번호</p>
                <input
                  className='BuyerElement'
                  value={idNum}
                  onChange={HandleNumber}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      toast.info("주민번호를 써주세요.", {
                        icon: "😭",
                        style: { backgroundColor: "#fff", color: "#000" },
                        progressStyle: { backgroundColor: "#7D4CDB" },
                      });
                    }
                  }}
                  name='idNum'
                  maxLength='6'
                ></input>
                <span>
                  {" "}
                  - <b>*******</b>
                </span>
              </div>
              <div className='PriceBox'>
                <p>₩{Price}</p>
              </div>
              <div style={payButton}>
                <button className='creditCardButton' onClick={RequestBill}>
                  결제하기
                </button>
              </div>
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
`;

const pStyle = {
  width: "100%",
  textAlign: "center",
  margin: "40px 0",
  fontWeight: 900,
  fontSize: "1.2rem",
};

const payButton = {
  textAlign: "center",
  paddingTop: "15px",
};

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
