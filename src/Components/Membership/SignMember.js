import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Bookmark } from "grommet-icons";

import CreditCardInput from "react-credit-card-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const SignMember = () => {
  const size = useContext(ResponsiveContext);

  const [cardNum, SetCardNum] = useState("");
  const [cardExpire, SetCardExpire] = useState("");
  const [cardCvc, SetCardCvc] = useState("");

  const handleChange = (e) => {
    toast.info("test 중입니다");
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


        <p style={pStyle}>
          1. 원하시는 멤버쉽 주기를 클릭해주세요.
        </p>
        <Box
        fill={size !== "small" ? false : true}
          pad="large"
        >
          <Grid
            fill={size !== "small" ? false : true}
            columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
            gap='large'
          >
            <div className='MemCardCon'>
              <div className='MemCardHead'>
                <BookmarkFilled size='medium' color='#3b2477' />
              </div>
              <div className='MemCardBody'>
                <h4>1개월 이용권</h4>
                <p>월 49,000원</p>
                <p>1개월마다 결제</p>
              </div>
            </div>
            <div className='MemCardCon'>
              <div className='MemCardHead'>
                <BookmarkFilled size='medium' color='#3b2477' />
              </div>
              <div className='MemCardBody'>
                <h4>6개월 이용권</h4>
                <p>월 39,000원</p>
                <p>(20%할인)</p>
                <p>
                  <span style={{ textDecoration: "line-through" }}>
                    294,000원
                  </span>{" "}
                  234,000원
                </p>
                <p>/6개월마다 결제</p>
              </div>
            </div>
            <div className='MemCardCon'>
              <div className='MemCardHead'>
                <BookmarkFilled size='medium' color='#3b2477' />
              </div>
              <div className='MemCardBody'>
                <h4>12개월 이용권</h4>
                <p>월 35,000원</p>
                <p>(30%할인)</p>
                <p>
                  <span style={{ textDecoration: "line-through" }}>
                    588,000원
                  </span>{" "}
                  420,000원
                </p>
                <p>12개월마다 결제</p>
              </div>
            </div>
          </Grid>
        </Box>
        <p style={pStyle}>2. 결제 정보를 입력해주세요.</p>
        <Box justify='center' align='center' pad="large">
          <div className='CreditBox'>
            <div className='creditCard'>
              <CreditCardInput
                cardNumberInputProps={{
                  value: cardNum,
                  onChange: handleChange(),
                  name: "cardNum",
                }}
                cardExpiryInputProps={{
                  value: cardExpire,
                  onChange: handleChange(),
                  name: "cardExpire",
                  onError: (err) => toast.error(err),
                }}
                cardCVCInputProps={{
                  value: cardCvc,
                  onChange: handleChange(),
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
                // value={this.state.buyerName}
                // onChange={this.handleChange}
                name='buyerName'
                maxLength='4'
              ></input>
            </div>

            <div className='ElementBox'>
              <p>비밀번호</p>
              <input
                className='PwElement'
                // value={this.state.cardPwd}
                // onChange={this.handleNumber}
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
                // value={this.state.idNum}
                // onChange={this.handleNumber}
                name='idNum'
                maxLength='6'
              ></input>
              <span>
                {" "}
                - <b>*******</b>
              </span>
            </div>
            {/* <div className='PriceBox'>
                  <p>₩{this.state.Price}</p>
                </div> */}
            <div style={payButton}>
              <button
                className='creditCardButton'
                //onClick={this.requestBill}
                onClick={() => {
                  toast.warn("🛠 공사 중 입니다!");
                }}
              >
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
    width: '100%',
    textAlign: 'center',
    marginTop: '40px',
    fontWeight: 900
}

const payButton = {
  textAlign: "center",
  paddingTop: "15px",
};
