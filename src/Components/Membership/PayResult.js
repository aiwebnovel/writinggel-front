import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../Layout";
import { Box, ResponsiveContext } from "grommet";

import * as configUrl from "../../config";
import { authService } from "../../firebaseConfig";

import styled from "styled-components";
import { toast } from "react-toastify";

const PayResult = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [profile, SetProfile] = useState({
    isBill: false,
    userName: "",
    plan: "",
    uid: "",
    email: "",
    create: "",
  });

  const { isBill, userName, plan, uid, email, create } = profile;

  const signOut = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userUid");
    await localStorage.removeItem("plan");
    await localStorage.removeItem("isBill");
    await localStorage.removeItem("create");

    await authService.signOut();
    window.location.reload();
  };

  const DeletePay = () => {
    if (window.confirm("구독을 취소하시겠습니까?")) {
      const config = {
        method: "delete",
        url: `${configUrl.SERVER_URL}/pay`,
        headers: { authentication: localStorage.getItem("token") },
      };
      axios(config)
        .then((response) => {
          console.log(response);
          toast.success(response.data.log, {
            icon: '😭',
            style:{backgroundColor:'#fff', color:'#000'},
             progressStyle:{backgroundColor:'#7D4CDB'}
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
          SetProfile({
            ...profile,
            isBill: data.isBill,
            userName: data.name,
            plan: data.plan,
            uid: data.uid,
            email: email,
            create: create,
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
        <Box fill className='paymentBox'>
          <Box className='paymentContent'>
            <div className='payBox'>
              <h4>주문번호</h4>
              <p>주문번호가 들어갈 예정입니다.</p>
            </div>
            <div className='payBox'>
              <h4>구독 상품</h4>
              <p>6개월 정기 결제</p>
            </div>
            <div className='payBox'>
              <h4>이용 기간</h4>
              <p>yyyy.mm.dd. hh:mm ~ yyyy.mm.dd. hh:mm</p>
            </div>
            <div className='payBox' style={{ backgroundColor: "#f9f9f9" }}>
              <h4>주문 총액</h4>
              <p>₩ 234,000</p>
            </div>
            <div className='payBox'>
              <h4>주문일시</h4>
              <p>yyyy-mm-dd hh:mm:ss</p>
            </div>
            <div className='payBox'>
              <h4>주문 상태</h4>
              <p>2021.11.03</p>
            </div>
            <div className='payBox'>
              <h4>결제 수단</h4>
              <p>2021.11.03 ~ 2022.11.03</p>
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
