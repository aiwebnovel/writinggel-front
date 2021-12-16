import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Box } from "grommet";
import { Google, FacebookOption } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService, firebaseInstance } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Loading from './SmallLoading';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../routes/ScrollToTop";
import TagManager from 'react-gtm-module';

import * as config from "../config";
import "../styles/header.scss";
import styled from "styled-components";

const Login = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `User`,
    isBill: "",
    Plan: "",
  });


  const [LoginInput, SetLoginInput] = useState({
    LogEmail: "",
    LogPassword: "",
  });

  const {LogEmail, LogPassword} = LoginInput;


  const LoginChange = (e) => {
    SetLoginInput({...LoginInput, [e.target.name] : e.target.value})
    
  };

  const GoLogin = (e) => {
    e.preventDefault();
    console.log('login');
    SetLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, LogEmail, LogPassword)
      .then(async(userCredential) => {
        const user = userCredential.user;

        console.log(user);

        const splitEmail = user.email.split('@');
        let create = user.metadata.creationTime;

        const token = user.accessToken;
        const userName = splitEmail[0];
        await localStorage.setItem("token", token);
        await localStorage.setItem("userName", userName);
        await localStorage.setItem("email", user.email);
        await localStorage.setItem("create", create);

        await SetLoading(false);
        await History.replace('/');
     
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const userNotFound = errorMessage.indexOf('user-not-found');
        const invalidEmail  = errorMessage.indexOf('invalid-email');
        const wrongPassword  = errorMessage.indexOf('wrong-password');
        console.log(errorCode, errorMessage,userNotFound, invalidEmail);
        SetLoading(false);
        
        if(userNotFound !== -1) {
          toast.error('삭제 되었거나 등록되지 않은 유저입니다ㅠㅠ');
          SetLoading(false);
        }

        if(invalidEmail !== -1) {
          toast.error('올바른 이메일 형식이 아닙니다ㅠㅠ');
          SetLoading(false);
        }

        if(wrongPassword !== -1) {
          toast.error('비밀번호가 맞지 않습니다ㅠㅠ');
          SetLoading(false);
        }
      })
      ;

  }


  const signIn = async (e) => {
   
      let name = e.target.name;
      // let provider = new firebaseInstance.auth.GoogleAuthProvider();
      if (name === "Facebook") {
        SetLoading(true);
        let provider = new firebaseInstance.auth.FacebookAuthProvider();
       
        await authService
          .signInWithPopup(provider)
          .then(async (dataFacebook) => {
    

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

            await refreshProfile();
            SetLoading(false);
            await History.replace('/');
          })
          .catch((error) => {
            console.log(error);
            SetLoading(false);
            if (
              error.code === "auth/account-exists-with-different-credential"
            ) {
              toast.error(
                "이미 구글로 로그인했던 계정입니다. 동일한 이메일 주소를 사용하여 여러 계정을 만들 수 없습니다."
              );
              SetLoading(false);
            }
          })
;
      } else if (name === "Google") {
        SetLoading(true);
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        //await authService.signInWithRedirect(provider)
        await authService
          .signInWithPopup(provider)
          .then(async (dataGoogle) => {

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
            SetLoading(false);
            History.replace('/');

          })
          .catch((error) => {
            console.log(error);
            SetLoading(false);
            if (
              error.code === "auth/account-exists-with-different-credential"
            ) {
              toast.error(
                "이미 페이스북으로 로그인했던 계정입니다. 동일한 이메일 주소를 사용하여 여러 계정을 만들 수 없습니다."
              );
              SetLoading(false);
            }
          });
      
    } 
  };

  const requestProfile = useCallback(async () => {

    //console.log(localStorage.getItem("token"));

    if (localStorage.getItem("token") !== null) {
      await axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response)
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

      console.log(user, authService.currentUser);
      //if (authService.currentUser) {
          // .getIdToken()
          // .then(async (data) => {
          //   await localStorage.setItem("token", data);
          // })
          // .catch(async (error) => {
          //   console.log(error);
          // });
      //}
    });
  }, []);

    
  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/login',
        pageTitle: '로그인',
      },
    });

  },[])

  return (
    <>{isLoading && <Loading/>}
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
          <form className='Form'>
            <div className='LoginFormField'>
              <div>
                <label>이메일</label>
                <input
                  placeholder='example@naver.com'
                  required
                  name='LogEmail'
                  onChange={LoginChange}
                />
              </div>
              <div>
                <label>비밀번호</label>
                <input
                  type='password'
                  placeholder='password'
                  required
                  name='LogPassword'
                  onChange={LoginChange}
                />
              </div>
            </div>

            <LogBtn type='submit' onClick={GoLogin}>로그인</LogBtn>
          </form>
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
    </>
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
