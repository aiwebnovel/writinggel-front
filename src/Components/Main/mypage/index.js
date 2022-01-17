import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, ResponsiveContext } from "grommet";
import moment from "moment";

import * as configUrl from "../../../config";
import { authService } from "../../../firebaseConfig";
import { toast } from "react-toastify";
import TagManager from "react-gtm-module";
//import styled from "styled-components";
import Modal from "../../SmallModal";

const Mypage = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();
  const provider = sessionStorage.getItem("provider");
  console.log(provider)
  const { Kakao } = window;
  const kakao_token = Kakao.Auth.getAccessToken();

  const [profile, SetProfile] = useState({
    isBill: "",
    userName: "",
    plan: "",
    email: "",
    create: "",
    billStart: "",
    payId: "",
    exp: "",
    stopPay: "",
    beforePlan: "",
  });
  const [isOpen, SetOpen] = useState(false);

  const { isBill, userName, plan, stopPay, email, create, billStart, exp } =
    profile;

  const signOut = async () => {
    if (provider === "kakao") {
      Kakao.Auth.logout(() => {
        sessionStorage.clear();
        window.location.reload();
      });
    } else {
      await sessionStorage.clear();
      await authService.signOut();
      window.location.reload();
    }

    // await authService.signOut();
    // window.location.reload();
  };

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const HandleDelete = () => {
    if (window.confirm("멤버십을 해지하시겠습니까?")) {
      const config = {
        method: "delete",
        url: `${configUrl.SERVER_URL}/pay`,
        headers: { authentication: sessionStorage.getItem("token") },
      };
      axios(config)
        .then((response) => {
          sessionStorage.setItem("isBill", false);
          console.log(response);
          toast.success(response.data.log, {
            style: { backgroundColor: "#fff", color: "#000" },
            progressStyle: { backgroundColor: "#7D4CDB" },
          });
          SetOpen(false);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          toast.error(`${error}`);
        });
    }
  };

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/mypage",
        pageTitle: "마이페이지",
      },
    });
  }, []);

  useEffect(() => {
    const loginCheck = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("userName");
    const email = sessionStorage.getItem("email");
    const create = sessionStorage.getItem("create");

    if (loginCheck !== null) {
      if (provider === "kakao") {
        axios
          .get(`${configUrl.SERVER_URL}/login`, {
            headers: { authentication: kakao_token },
          })
          .then((response) => {
            let data = response.data;
            //console.log(data);

            let billFormat = moment(data.billStartDate).format("YYYY-MM-DD");
            let createFormat = moment(create).format("YYYY-MM-DD");
            let MonthLater = moment(data.billStartDate)
              .add(data.plan, "months")
              .toDate();
            let formatMonth = moment(MonthLater).format("YYYY-MM-DD");

            SetProfile({
              ...profile,
              isBill: data.isBill,
              userName: name,
              plan: data.plan,
              email: email,
              create: createFormat,
              billStart: billFormat,
              payId: data.lastPayTid,
              exp: formatMonth,
              stopPay: data.stopPayWish,
              beforePlan: data.plan_before,
            });
          })
          .catch((error) => {
            if (error.response.status === 412) {
              toast.error("새로고침하거나 다시 로그인 해주세요!");
              //window.location.reload();
            }
            // toast.error(error.message);
          });
      }
      if (provider === "google.com" || provider === "facebook.com") {
        axios
          .get(`${configUrl.SERVER_URL}/profile`, {
            headers: { authentication: loginCheck },
          })
          .then((response) => {
            console.log(response.data);
            let data = response.data;
            //console.log(data);
            let billFormat = moment(data.billStartDate).format("YYYY-MM-DD");
            let createFormat = moment(create).format("YYYY-MM-DD");
            let MonthLater = moment(data.billStartDate)
              .add(data.plan, "months")
              .toDate();
            let formatMonth = moment(MonthLater).format("YYYY-MM-DD");

            SetProfile({
              ...profile,
              isBill: data.isBill,
              userName: name,
              plan: data.plan,
              uid: data.uid,
              email: email,
              create: createFormat,
              billStart: billFormat,
              payId: data.lastPayTid,
              exp: formatMonth,
              stopPay: data.stopPayWish,
              beforePlan: data.plan_before,
            });
          });
      }
      else if (provider === "password") {
        const name = sessionStorage.getItem("userName");
        axios
          .get(`${configUrl.SERVER_URL}/login`, {
            headers: { authentication: loginCheck },
          })
          .then(async (response) => {
          
            let data = response.data;

            SetProfile({
              ...profile,
              userName: name,
              isBill: response.data.isBill,
              Plan: response.data.plan,
            });

            let billFormat = moment(data.billStartDate).format("YYYY-MM-DD");
            let createFormat = moment(create).format("YYYY-MM-DD");
            let MonthLater = moment(data.billStartDate)
              .add(data.plan, "months")
              .toDate();
            let formatMonth = moment(MonthLater).format("YYYY-MM-DD");

            SetProfile({
              ...profile,
              isBill: data.isBill,
              userName: sessionStorage.getItem('userName'),
              plan: data.plan,
              email: email,
              create: createFormat,
              billStart: billFormat,
              payId: data.lastPayTid,
              exp: formatMonth,
              stopPay: data.stopPayWish,
              beforePlan: data.plan_before,
            });
            //sessionStorage.setItem("token", check);
            //sessionStorage.setItem("userUid", response.data.uid);
            sessionStorage.setItem("userImage", "/user_colored.png");
            sessionStorage.setItem("plan", response.data.plan);
            sessionStorage.setItem("isBill", response.data.isBill);
          })
          .catch((error) => {
            console.log(error);

            if (error.response.status === 412) {
              toast.error("새로고침하거나 다시 로그인 해주세요");
            }
            if (error.response.status === 500) {
              toast.error("새로고침하거나 다시 로그인 해주세요");
            }
          });
      }
    } else {
      History.replace("/");
    }
  }, []);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (authService.currentUser) {
        authService.currentUser
          .getIdToken()
          .then(async (data) => {
            await sessionStorage.setItem("token", data);
          })
          .catch(async (error) => {
            toast.info(`로그인이 필요합니다!`, {
              style: { backgroundColor: "#fff", color: "#000" },
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          });
      }
    });
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
            justify='evenly'
            className='MypageContent'
          >
            <Box className='UserContent'>
              <div className='dataBox'>
                <p>이름</p>
                <p>
                  {userName
                    ? `${userName}님`
                    : `${sessionStorage.getItem("userName")}님`}
                </p>
              </div>
              <div className='dataBox'>
                <p>아이디</p>
                <p>{email ? email : sessionStorage.getItem('email') }</p>
              </div>
              <div className='dataBox'>
                <p>회원가입 일시</p>
                <p>{create ? create : sessionStorage.getItem('create')}</p>
              </div>
              <div className='dataBox'>
                <p>결제 내역</p>
                <p style={{ textDecoration: "underline" }}>
                  {plan > 0 ? (
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
                  <p>
                    {plan === '0' || plan === 'free'
                      ? "결제한 구독 상품이 없습니다!"
                      : `${plan}개월 구독 상품`}
                  </p>
                  <div>
                    {plan === "free" || plan === '0' ?
                    '🙅‍♀️' : <button onClick={HandleModals}>멤버십 해지</button>
                    }
                  </div>
                </div>
              </div>
              <div className='dataBox'>
                <p>구독 시작일</p>
                <p>{plan === 'free' || plan === '0' ? '없음' : billStart }</p>
              
              </div>
              <div className='dataBox'>
                <p>이용 기간</p>
                <p>{plan === 'free' || plan === '0' ? '없음 ': `${billStart} ~ ${exp}`}</p>
              </div>
              <div className='dataBox'>
                <p>다음 결제 예정일</p>
                <p>{plan === 'free' || plan === '0' && !stopPay ? '없음': exp}</p>
              </div>
              <div className='dataBox'>
                <p>결제 예정 금액</p>
                {plan === "1" && !stopPay && <p>₩ 25,000</p>}
                {plan === "3" && !stopPay && <p>₩ 60,000</p>}
                {plan === "6" && !stopPay && <p>₩ 90,000</p>}
                {plan === "free" && !stopPay && <p>없음</p>}
                {plan === '0' && <p>없음</p>}
                {stopPay && <p>없음</p>}
              </div>
              <div className='dataBox'>
                <p>결제 수단</p>
                <p>{plan === 'free' || plan === '0' ? "없음": "신용카드/체크카드" }</p>
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
      <Modal open={isOpen} close={HandleModals}>
        <div className='unSubBox'>
          <div className='unSubText'>
            <p>멤버십을 해지하시겠어요?</p>
            <p>해지 후에도 현재 결제 주기 마지막 날까지는</p>
            <p>이용할 수 있습니다.</p>
          </div>
          <div className='unSubBtn'>
            <button onClick={HandleModals}>계속 이용하기</button>
            <button onClick={HandleDelete}>해지 하기</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Mypage;
