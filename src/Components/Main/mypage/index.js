import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, ResponsiveContext } from "grommet";

import * as config from "../../../config";
import { authService } from "../../../firebaseConfig";

import styled from "styled-components";
import Modal from "../../SmallModal";

const Mypage = () => {
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
  const [isOpen, SetOpen] = useState(false);

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


  const HandleModals = () => {
    SetOpen(!isOpen);
  }

  const HandleDelete = () => {
    SetOpen(true);

  }

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const create = localStorage.getItem("create");

    if (loginCheck !== null) {
      axios
        .get(`${config.SERVER_URL}/profile`, {
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
    <>
    <Layout>
      <Box fill justify='center' align='center'>
        <Box fill background='#3b2477' color='#fff' className='MypageHeader'>
          <h2>마이 페이지</h2>
        </Box>
        <Box
          width='100%'
          height={size !== "small" ? "80vh" : "100%"}
          pad='large'
          direction={size !== "small" ? "row" : "column"}
          align='center'
          justify='between'
          className='MypageContent'
        >
          <Box className='UserContent'>
            <div className='dataBox'>
              <p>이름</p>
              <p>{userName}</p>
            </div>
            <div className='dataBox'>
              <p>아이디</p>
              <p>{email}</p>
            </div>
            <div className='dataBox'>
              <p>회원가입 일시</p>
              <p>{create}</p>
            </div>
            <div className='dataBox'>
              <p>결제 내역</p>
              <p style={{ textDecoration: "underline" }}>
                {isBill === true ? (
                  <Link to='/mypage/payment'>보러가기</Link>
                ) : (
                  "결제 내역이 없어요!"
                )}
              </p>
            </div>
            <hr style={{ width: "100%" }} />
            <div className='dataBox'>
              <p>구독 상품</p>
              <div className='payData'>
                <p>{localStorage.getItem('plan') === 'free' ? '결제한 구독 상품이 없습니다!' : `${localStorage.getItem('plan')}개월 구독 상품`}</p>
                <div>
                  {localStorage.getItem('plan') !== 'free' && (
                    <>
                  <Link to='/signIn'>
                  <button>멤버십 변경</button>
                  </Link>
                  <button onClick={HandleDelete}>멤버십 해제</button>
                  </>)}
                </div>
              </div>
            </div>
            <div className='dataBox'>
              <p>구독 시작일</p>
              <p>2021.11.03</p>
            </div>
            <div className='dataBox'>
              <p>이용 기간</p>
              <p>2021.11.03 ~ 2022.11.03</p>
            </div>
            <div className='dataBox'>
              <p>다음 결제 예정일</p>
              <p>없음</p>
            </div>
            <div className='dataBox'>
              <p>결제 예정 금액</p>
              <p>없음</p>
            </div>
            <div className='dataBox'>
              <p>결제 수단</p>
              <p>없음</p>
            </div>
          </Box>
          <Box className='BtnContent'>
            <button className='modifyBtn'>
              <Link to='/mypage/modify'>회원 정보 수정</Link>
            </button>
            <button onClick={signOut} className='MypageLogout'>
              로그아웃
            </button>
          </Box>
        </Box>
      </Box>
    </Layout>
    <Modal open={isOpen} close={HandleModals} >
      <div>
        <div>
        <p>멤버십을 해지하시겠어요?</p>
        <p>해지 후에도 현 결제 주기 마지막 날까지는 이용할 수 있습니다.</p>
        </div>
        <div>
          <button>계속 이용하기</button>
          <button>해지 하기</button>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default Mypage;
