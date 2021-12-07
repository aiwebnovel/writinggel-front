import React, {  useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../Layout";
import { Box } from "grommet";
import moment from 'moment';


import * as configUrl from "../../config";
import styled from "styled-components";
import { toast } from "react-toastify";

const PayResult = () => {
  //const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [profile, SetProfile] = useState({
    isBill: false,
    userName: "",
    plan: "",
    uid: "",
    email: "",
    create: "",
  });

  const { isBill, plan, stopPay, billStart, payId, exp } = profile;

  const DeletePay = () => {
    if (window.confirm("구독을 취소하시겠습니까?")) {
      const config = {
        method: "delete",
        url: `${configUrl.SERVER_URL}/pay`,
        headers: { authentication: localStorage.getItem("token") },
      };
      axios(config)
        .then((response) => {
          localStorage.setItem('isBill', false)
          console.log(response);
          toast.success(response.data.log, {
            style: { backgroundColor: "#fff", color: "#000" },
            progressStyle: { backgroundColor: "#7D4CDB" },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const create = localStorage.getItem("create");

    if (loginCheck !== null) {
      axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: loginCheck },
        })
        .then((response) => {
          // console.log(response.data);
          let data = response.data;

          let billFormat = moment(data.billStartDate).format('YYYY-MM-DD');
          let MonthLater = moment(data.billStartDate).add(data.plan,'months').toDate();
          let formatMonth = moment(MonthLater).format('YYYY-MM-DD');

            SetProfile({
              ...profile,
              isBill: data.isBill,
              userName: data.name,
              plan: data.plan,
              uid: data.uid,
              email: email,
              create: create,
              billStart: billFormat,
              payId: data.lastPayTid,
              exp: formatMonth,
              stopPay: data.stopPayWish,
              beforePlan: data.plan_before
            });
        
          // console.log(isBill, userName,plan,uid,email)
        });
    } else {
      History.replace("/");
    }
  }, []);

  return (
    <Layout>
      <Box fill justify='center' align='center' className='BoxContainer'>
        <Box fill background='#3b2477' color='#fff' className='MypageHeader'>
          <h2>결제 내역</h2>
        </Box>
        {localStorage.getItem("isBill") === false ? (
          <div>결제 내역이 없습니다!</div>
        ) : (
          <Box fill className='paymentBox'>
            <Box className='paymentContent'>
              <div className='payBox'>
                <h4>주문번호</h4>
                <p>{payId}</p>
              </div>
              <div className='payBox'>
                <h4>구독 상품</h4>
                <p>{plan}개월 정기결제</p>
              </div>
              <div className='payBox'>
                <h4>이용 기간</h4>
                <p>{`${moment(billStart).format('YYYY-MM-DD')} ~ ${exp}`}</p>
              </div>
              <div className='payBox' style={{ backgroundColor: "#f9f9f9" }}>
                <h4>주문 총액</h4>
                {plan === '1' && <p>₩ 25,000</p>}
                {plan === '3' && <p>₩ 60,000</p>}
                {plan === '6' && <p>₩ 90,000</p>}
                {plan === 'free' && !stopPay && <p>없음</p>}
                {stopPay && <p>구독 취소</p>}
              </div>
              <div className='payBox'>
                <h4>주문일시</h4>
                <p>{billStart}</p>
              </div>
              <div className='payBox'>
                <h4>주문 상태</h4>
                <p>{!stopPay ? `${plan}개월 결제 중` : `구독 취소`}</p>
              </div>
              <div className='payBox'>
                <h4>결제 수단</h4>
                <p>{isBill && '신용카드/체크카드'}</p>
              </div>
            </Box>
            <BtnContent>
              <button className='cancelBtn' onClick={DeletePay}>
                구독 취소
              </button>
              <button className='listBtn'>
                <Link to='/mypage'>목록보기</Link>
              </button>
            </BtnContent>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default PayResult;

const BtnContent = styled(Box)`
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;

  > button {
    width: 200px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 15px 0;
  }
`;
