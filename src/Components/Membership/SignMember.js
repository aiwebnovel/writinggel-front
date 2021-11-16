import React, { useContext, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Layout from "../Layout";
import { Box, Grid, Paragraph, ResponsiveContext } from "grommet";
import { Bookmark } from "grommet-icons";

import * as configUrl from '../../config';

import CreditCardInput from "react-credit-card-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const SignMember = () => {
  const size = useContext(ResponsiveContext);
  const history = useHistory();

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

  const [Plan, SetPlan] = useState('');

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

  // 결제 post
  const RequestBill = async() => {
    let user = await localStorage.getItem("token");
    console.log(Price, Plan);
    if(user !== null ){
      if(selected1 === false && selected2 === false && selected3 === false) {
        toast.error('멤버쉽을 선택해주세요!');
      }else {
        console.log('결제');
        const now = new Date();
        const option = {
          arsUseYn: "N",
          buyerName: buyerName, //등록자 이름
          cardExpire:
            cardExpire.split(" / ")[1] +
            cardExpire.split(" / ")[0], //유효기간
          cardNum: cardNum.replaceAll(" ", ""), //카드번호 (숫자)
          cardPwd: cardPwd, //카드 비밀번호 앞 2 자리
          idNum: idNum, //주민번호 앞 6 자리
          mid: "pgapppla1m", //상점 아이디
          moid:
            now.getFullYear() +
            "" +
            (now.getMonth() + 1) +
            now.getDate() +
            now.getHours() +
            now.getMinutes() +
            now.getSeconds(), //가맹점 주문번호
          userId: (await localStorage.getItem("userUid")) + Math.random(),
        };
        console.log(option);
        await axios
          .post(`https://api.innopay.co.kr/api/regAutoCardBill`, option)
          .then((response) => {
            let data = response.data;
             console.log('test',data);
            if (data.resultCode === "F113") {
              toast.error(`error : ${data.resultMsg}!`);
            }
            if (data.resultCode === "9999") {
              toast.error(
                "해당 카드 번호로 3회 실패된 이력이 있어 다음 날 요청 가능합니다😭"
              );
            }
  
            if (data.resultCode === "0000") {
              let plans = parseInt(Plan);
              console.log(plans);
              console.log(data.billKey);
              console.log(buyerName);

              const config = {
                method: 'post',
                url: `${configUrl.SERVER_URL}/pay`,
                headers: { 'authentication': localStorage.getItem("token"), },
                data : { billKey: data.billKey,
                    name: buyerName,
                    plan: plans,
                  }
              };
              console.log(config.data)
              
             axios(config)
                .then((response) => {
                  console.log("response", response);
                  toast.success("결제가 완료 됐습니다!");
                 
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              throw new Error();
            }
    
          })
          .catch((error) => {
            console.log(error);
      
          });
      //history.push('/payment')
  
       
      }
    }else {
    toast.warn("로그인을 먼저 해주세요!");
    }
   


  };

  const HandleSelected = (e) => {
    console.log(e.target.name.split(" "));

    let month = e.target.name.split(" ")[0];
    let price = e.target.name.split(" ")[1];


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
    <Layout>
      <Box fill justify='center' align='center'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          className='SignInHeader'
          justify='center'
          align='baseline'
          pad='medium'
        >
          <h3>멤버쉽 가입하기</h3>
        </Box>

        <p style={pStyle}>1. 원하시는 멤버쉽 주기를 클릭해주세요.</p>
        <Box fill={size !== "small" ? false : true} pad='large'>
          <Grid
            fill={size !== "small" ? false : true}
            columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
            gap='large'
          >
 
            <div
              className={
                selected1 ? "SignMemCardCon selected" : "SignMemCardCon"
              }
            >
              <div className='SignMemCardHead'>
                <BookmarkFilled size='medium' color='#3b2477' />
              </div>
              <div className='SignMemCardBody'>
                <img src='/tinggle.png' alt='이미지' />
                <h4>1개월 이용권</h4>
                <p style={{fontWeight: 600}}>월 19,000원</p>
                <p>1개월마다 결제</p>
                <ChoiceBtn
                  name='1 19000'
                  onClick={(e) => HandleSelected(e)}
                >
                  선택
                </ChoiceBtn>
              </div>
            </div>
            <div
              className={
                selected2 ? "SignMemCardCon selected" : "SignMemCardCon"
              }
            >
              <div className='SignMemCardHead'>
                <BookmarkFilled size='medium' color='#3b2477' />
              </div>
              <div className='SignMemCardBody'>
                  <h4>3개월 이용권</h4>
                  <p>월 16,000원</p>
                  <p style={{fontWeight: 600}}>
                    48,000원
                  </p>
                  <p>/3개월마다 결제</p>
                <ChoiceBtn
                  name='3 48,000'
                  onClick={(e) => HandleSelected(e)}
                >
                  선택
                </ChoiceBtn>
              </div>
            </div>
            <div
              className={
                selected3 ? "SignMemCardCon selected" : "SignMemCardCon"
              }
            >
              <div className='SignMemCardHead'>
                <BookmarkFilled size='medium' color='#3b2477' />
              </div>
              <div className='SignMemCardBody'>
                 <h4>6개월 이용권</h4>
                  <p>월 10,000원</p>
                  <p style={{fontWeight: 600}}>
                    60,000원
                  </p>
                  <p>6개월마다 결제</p>
                <ChoiceBtn
                  name='6 60,000'
                  onClick={(e) => HandleSelected(e)}
                >
                  선택
                </ChoiceBtn>
              </div>
            </div>
          </Grid>
        </Box>
        <p style={pStyle}>2. 결제 정보를 입력해주세요.</p>
        <Box justify='center' align='center' pad='large'>
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
                onBlur={(e)=>{if(e.target.value === ''){
                  toast.info('이름을 써주세요.', {
                    icon: '😭',
                    style:{backgroundColor:'#fff', color:'#000'},
                     progressStyle:{backgroundColor:'#7D4CDB'}
                    });
                }}}
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
                onBlur={(e)=>{if(e.target.value === ''){
                  toast.info('비밀번호를 써주세요.', {
                    icon: '😭',
                    style:{backgroundColor:'#fff', color:'#000'},
                     progressStyle:{backgroundColor:'#7D4CDB'}
                    });
                }}}
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
                onBlur={(e)=>{if(e.target.value === ''){
                  toast.info('주민번호를 써주세요.', {
                    icon: '😭',
                    style:{backgroundColor:'#fff', color:'#000'},
                     progressStyle:{backgroundColor:'#7D4CDB'}
                    });
                }}}
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
  );
};

export default SignMember;

const BookmarkFilled = styled(Bookmark)`
  path[fill="none"] {
    fill: #3b2477;
  }
`;

const pStyle = {
  width: "100%",
  textAlign: "center",
  marginTop: "40px",
  fontWeight: 900,
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
