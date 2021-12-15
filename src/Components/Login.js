import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Box } from "grommet";
import { Google, FacebookOption } from "grommet-icons";
import { ResponsiveContext } from "grommet";
import { authService, firebaseInstance } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../routes/ScrollToTop";

import * as config from "../config";
import "../styles/header.scss";
import styled from "styled-components";

const Login = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isChecked, SetChecked] = useState(false);

  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `User`,
    isBill: "",
    Plan: "",
  });

  const [RegistInput, SetRegistInput] = useState({
    RegEmail: "",
    RegPassword: "",
  });
  const [LoginInput, SetLoginInput] = useState({
    LogEmail: "",
    LogPassword: "",
  });

  const [isEmail, SetIsEmail] = useState(false);
  const [isPassword, SetIsPassword] = useState(false);
  const [ValiMessage, SetMessage] = useState("");
  const [PasValiMessage, SetPasMessage] =
    useState("특수문자,숫자를 꼭 넣어주세요.");

  const { RegEmail, RegPassword } = RegistInput;
  const { LogEmail, LogPassword } = LoginInput;
  const { userName, userImage, isBill, Plan } = profile;

  const LoginChange = () => {
    console.log("Regi change");
  };

  const RegistChange = (e) => {
    SetRegistInput({ ...RegistInput, [e.target.name]: e.target.value });

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(RegEmail)) {
      SetMessage("올바른 이메일 형식이 아닙니다.😭");
      SetIsEmail(false);
    } else {
      SetMessage("올바른 이메일 형식이에요!👍");
      SetIsEmail(true);
    }

    const PasRegex =
      /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (!PasRegex.test(RegPassword)) {
      SetPasMessage("올바른 비밀번호가 아닙니다.😭");
      SetIsPassword(false);
    } else {
      SetPasMessage("올바른 비밀번호에요!👍");
      SetIsPassword(true);
    }

    console.log(RegEmail, RegPassword);
  };

  const signIn = async (e) => {
    if (isChecked === true) {
      let name = e.target.name;
      // let provider = new firebaseInstance.auth.GoogleAuthProvider();
      if (name === "Facebook") {
        let provider = new firebaseInstance.auth.FacebookAuthProvider();
        //await authService.signInWithRedirect(provider)
        await authService
          .signInWithPopup(provider)
          .then(async (dataFacebook) => {
            //console.log(dataFacebook);
            //const credential = FacebookAuthProvider.credentialFromResult(dataFacebook);
            //console.log('cre', credential);

            let credentials = dataFacebook.credential;
            //let id = dataFacebook.credential.providerId //facebook.com
            let email = dataFacebook.user.email;
            let create = dataFacebook.user.metadata.creationTime;
            let token = credentials.accessToken;
            //console.log('result',credentials, email,create,token, id);

            await localStorage.setItem("token", token);
            await localStorage.setItem("email", email);
            await localStorage.setItem("create", create);

            await requestProfile();

            refreshProfile();
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            if (
              error.code === "auth/account-exists-with-different-credential"
            ) {
              toast.error(
                "이미 구글로 로그인했던 계정입니다. 동일한 이메일 주소를 사용하여 여러 계정을 만들 수 없습니다."
              );
            }
          });
      } else if (name === "Google") {
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        //await authService.signInWithRedirect(provider)
        await authService
          .signInWithPopup(provider)
          .then(async (dataGoogle) => {
            //console.log(dataGoogle)

            let credential = dataGoogle.credential;
            let email = dataGoogle.user.email;
            let create = dataGoogle.user.metadata.creationTime;
            let token = credential.idToken;
            //console.log('result',credential, email,create,token);

            await localStorage.setItem("token", token);
            await localStorage.setItem("email", email);
            await localStorage.setItem("create", create);

            await requestProfile();

            refreshProfile();
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            if (
              error.code === "auth/account-exists-with-different-credential"
            ) {
              toast.error(
                "이미 페이스북으로 로그인했던 계정입니다. 동일한 이메일 주소를 사용하여 여러 계정을 만들 수 없습니다."
              );
            }
          });
      }
    } else {
      toast.error("이용약관 및 개인정보처리방침에 동의해주세요!");
    }
  };

  const requestProfile = useCallback(async () => {
    if (localStorage.getItem("token") !== null) {
      await axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: localStorage.getItem("token") },
        })
        .then((response) => {
          SetProfile({
            ...profile,
            userName: response.data.name,
            userImage: response.data.photoURL,
            isBill: response.data.isBill,
            Plan: response.data.plan,
          });

          localStorage.setItem("userUid", response.data.uid);
          localStorage.setItem("plan", response.data.plan);
          localStorage.setItem("isBill", response.data.isBill);
          localStorage.setItem("userName", response.data.name);
          localStorage.setItem("userImage", response.data.photoURL);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 412) {
            toast.error("새로고침하거나 다시 로그인 해주세요!");
          }
        });
    }
  }, [profile]);

  const refreshProfile = useCallback(async () => {
    authService.onAuthStateChanged(async (user) => {
      if (authService.currentUser) {
        authService.currentUser
          .getIdToken()
          .then(async (data) => {
            await localStorage.setItem("token", data);
          })
          .catch(async (error) => {
            console.log(error);
          });
      }
    });
  }, []);

  return (
    <Box className='LoginContainer'>
      <ScrollToTop />
      <div className='loginHeader'>
        <Link to='/'>
          <img src='/logo2.png' alt='로그인 이미지' />
        </Link>
      </div>
      <Box className='LoginBox'>
        <Box>
          <div className='loginTitle'>
            <h2>로그인</h2>
            <p>로그인 후 라이팅젤 서비스를 즐겨보세요!</p>
          </div>
          <div className='Form'>
            <div className='LoginFormField'>
              <div>
                <label>이메일</label>
                <input
                  placeholder='example@naver.com'
                  required
                  onChange={LoginChange}
                />
              </div>
              <div>
                <label>비밀번호</label>
                <input
                  type='password'
                  placeholder='password'
                  required
                  onChange={LoginChange}
                />
              </div>
            </div>

            <LogBtn>로그인</LogBtn>
          </div>
          <div style={{ textAlign: "center", margin: "20px 0 25px 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Line></Line>
              <p style={{ padding: "0 12px", color: "#aaa" }}>or</p>
              <Line></Line>
            </div>
          </div>
          <div className='signBox'>
            <div className='SnsSignBox'>
              <button
                className='googleButton'
                name='Google'
                onClick={(e) => signIn(e)}
              >
                <Google color='plain' /> 구글로 시작하기
              </button>

              <button
                className='facebookButton'
                name='Facebook'
                onClick={(e) => signIn(e)}
              >
                <FacebookOption color='plain' /> 페이스북으로 시작하기
              </button>
            </div>
            <div className='isChecked'>
              <p>
                <a
                  href='https://appplatform.notion.site/8be8232fff0341799cf8c13728610b6b'
                  target='_blank'
                  rel='noreferrer'
                >
                  이용약관
                </a>
                과&nbsp;
                <a
                  href='https://www.notion.so/appplatform/d99f247a66d141bbbdf227739861a0a2'
                  target='_blank'
                  rel='noreferrer'
                >
                  개인정보처리방침
                </a>
                을 확인하였고&nbsp;동의합니다.
              </p>
            </div>
            <p>
              아직 회원이 아니신가요? <Link to='/regist'>회원가입</Link>
            </p>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

const LogBtn = styled.button`
  background-color: #b1b5e6;
  color: #444;
  padding: 10px 15px;
  outline: 0;
  border: 1px solid #b1b5e6;
  margin: 25px 0 15px 0;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  transition: all 300ms ease;

  &:hover {
    font-weight: 600;
    color: #fff;
    background-color: #ff9300;
    border: 1px solid #ff9300;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 50%;
  border-bottom: 1px solid #aaa;
`;
