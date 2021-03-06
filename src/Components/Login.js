import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Box } from "grommet";
import { Google, FacebookOption } from "grommet-icons";
import { authService, firebaseInstance } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import * as configUrl from "../config";
import Loading from "./SmallLoading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../routes/ScrollToTop";
import TagManager from "react-gtm-module";

import "../styles/header.scss";
import styled from "styled-components";
import moment from "moment";

const Login = () => {
  const { Kakao, naver } = window;
  //const naverRef = useRef();

  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [isInApp, SetInApp] = useState(false);

  const [LoginInput, SetLoginInput] = useState({
    LogEmail: "",
    LogPassword: "",
  });

  const { LogEmail, LogPassword } = LoginInput;

  const LoginChange = (e) => {
    SetLoginInput({ ...LoginInput, [e.target.name]: e.target.value });
  };

  const GoLogin = (e) => {
    e.preventDefault();
    //console.log("login");
    SetLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, LogEmail, LogPassword)
          .then(async (userCredential) => {
            const user = userCredential.user;
            const creationTime = user.metadata.creationTime;
            const formatCreation = moment(creationTime).format("YYYY-MM-DD");
            const startVerifyDate = moment("09 Feb 2022").format("YYYY-MM-DD");

            console.log(formatCreation, startVerifyDate);

            if (startVerifyDate <= formatCreation && !user.emailVerified) {
              SetLoading(false);
              toast.error("????????? ????????? ???????????? ???????????????. ");
            } else {
              const splitEmail = user.email.split("@");
              let providerId = user.providerData[0].providerId;
              let create = user.metadata.creationTime;
              let displayName = user.displayName;

              const token = user.accessToken;
              const userName = splitEmail[0];

              if (user.displayName !== null) {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("userName", displayName);
                sessionStorage.setItem("email", user.email);
                sessionStorage.setItem("create", create);
                sessionStorage.setItem("provider", providerId);
              } else {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("userName", userName);
                sessionStorage.setItem("email", user.email);
                sessionStorage.setItem("create", create);
                sessionStorage.setItem("provider", providerId);
              }
              await SetLoading(false);
              History.replace("/");
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const userNotFound = errorMessage.indexOf("user-not-found");
            const invalidEmail = errorMessage.indexOf("invalid-email");
            const wrongPassword = errorMessage.indexOf("wrong-password");
            console.log(errorCode, errorMessage, userNotFound, invalidEmail);
            SetLoading(false);

            if (userNotFound !== -1) {
              toast.error("?????? ???????????? ???????????? ?????? ?????????????????????");
              SetLoading(false);
            }

            if (invalidEmail !== -1) {
              toast.error("????????? ????????? ????????? ??????????????????");
              SetLoading(false);
            }

            if (wrongPassword !== -1) {
              toast.error(
                "??????????????? ?????? ????????????. ?????? ???????????? ???????????? ???????????? ????????? ????????????????"
              );
              SetLoading(false);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = async (e) => {
    let name = e.target.name;
    // let provider = new firebaseInstance.auth.GoogleAuthProvider();
    if (name === "Facebook") {
      SetLoading(true);
      let provider = new firebaseInstance.auth.FacebookAuthProvider();

      setPersistence(authService, browserSessionPersistence)
        .then(async () => {
          await authService
            .signInWithPopup(provider)
            .then(async (dataFacebook) => {
              //console.log(dataFacebook);

              let credentials = dataFacebook.credential;
              let user = dataFacebook.user;
              let providerId = dataFacebook.credential.providerId; //facebook.com
              let email = user.email;
              let create = user.metadata.creationTime;
              let token = credentials.accessToken;
              let username = user.displayName;
              let userPhoto = user.photoURL;
              //console.log('result',token);

              await authService.currentUser
                .getIdToken()
                .then(async (data) => {
                  //console.log(data);
                  const config = {
                    method: "get",
                    url: `${configUrl.SERVER_URL}/signup`,
                    headers: {
                      authentication: data,
                    },
                  };

                  await axios(config)
                    .then(async (response) => {
                     //console.log(response);
                      await sessionStorage.setItem("token", token);
                      await sessionStorage.setItem("email", email);
                      await sessionStorage.setItem("create", create);
                      await sessionStorage.setItem("provider", providerId);
                      await sessionStorage.setItem("userName", username);
                      await sessionStorage.setItem("userImage", userPhoto);
                      SetLoading(false);
                      History.push("/welcomeSns");
                    })
                    .catch((error) => {
                      console.log(error.response);
                      SetLoading(false);
                      if (error.response.status === 403) {
                        sessionStorage.setItem("token", token);
                        sessionStorage.setItem("email", email);
                        sessionStorage.setItem("create", create);
                        sessionStorage.setItem("provider", providerId);
                        sessionStorage.setItem("userName", username);
                        sessionStorage.setItem("userImage", userPhoto);

                        SetLoading(false);
                        setTimeout(History.replace("/"), 3000);
                      }
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              console.log(error);
              SetLoading(false);
              if (
                error.code === "auth/account-exists-with-different-credential"
              ) {
                toast.error(
                  "?????? ????????? ??????????????? ???????????????. ????????? ????????? ????????? ???????????? ?????? ????????? ?????? ??? ????????????."
                );
                SetLoading(false);
              }
            });
        })
        .catch((error) => {
          console.log(error);
          SetLoading(false);
        });
    } else if (name === "Google") {
      SetLoading(true);
      let provider = new firebaseInstance.auth.GoogleAuthProvider();
      //await authService.signInWithRedirect(provider)

      setPersistence(authService, browserSessionPersistence).then(async () => {
        await authService.signInWithPopup(provider).then(async (dataGoogle) => {
          //console.log(dataGoogle);
          let credential = dataGoogle.credential;
          let user = dataGoogle.user;

          let token = credential.idToken;
          let providerId = credential.providerId;
          let email = user.email;
          let create = user.metadata.creationTime;
          let username = user.displayName;
          let userPhoto = user.photoURL;

          await authService.currentUser
            .getIdToken()
            .then(async (data) => {
              //console.log(data);
              const config = {
                method: "get",
                url: `${configUrl.SERVER_URL}/signup`,
                headers: {
                  authentication: data,
                },
              };
              await axios(config)
                .then(async (response) => {
                  //console.log(response);
                  await sessionStorage.setItem("token", token);
                  await sessionStorage.setItem("email", email);
                  await sessionStorage.setItem("create", create);
                  await sessionStorage.setItem("provider", providerId);
                  await sessionStorage.setItem("userName", username);
                  await sessionStorage.setItem("userImage", userPhoto);
                  SetLoading(false);
                  History.push("/welcomeSns");
                })
                .catch((error) => {
                  console.log(error.response);
                  SetLoading(false);
                  if (error.response.status === 403) {
                    SetLoading(false);
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("create", create);
                    sessionStorage.setItem("provider", providerId);
                    sessionStorage.setItem("userName", username);
                    sessionStorage.setItem("userImage", userPhoto);

                    SetLoading(false);
                    setTimeout(History.replace("/"), 3000);
                  }
                });
            })
            .catch((error) => {
              console.log(error);
              SetLoading(false);
              if (
                error.code === "auth/account-exists-with-different-credential"
              ) {
                toast.error(
                  "?????? ?????????????????? ??????????????? ???????????????. ????????? ????????? ????????? ???????????? ?????? ????????? ?????? ??? ????????????."
                );
                SetLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
              SetLoading(false);
            });
        });
      });
    }
  };

  const LoginKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: "https://tinytingel.ai/oauth",
      //redirectUri: "https://1d54-183-98-33-132.ngrok.io/oauth",
    });
  };

  // const InitNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: "kvEjoe_5dXM5a94N_FVv",
  //     callbackUrl: "http://localhost:3000/naver/oauth",
  //     isPopup: false,
  //     callbackHandle: true,
  //     loginButton: { color: "green", type: 3, height: "50" },
  //   });
  //   naverLogin.init();
  //   naverLogin.logout();
  // };

  // useEffect(() => {
  //   InitNaverLogin();
  // }, []);

  useEffect(() => {
    let userAgent = navigator.userAgent;
    let check = userAgent.indexOf("KAKAOTALK");
    let checkNaver = userAgent.indexOf("NAVER");
    let checkInsta = userAgent.indexOf("Instagram");
    let checkFB = userAgent.indexOf("FB");

    if (
      check !== -1 ||
      checkNaver !== -1 ||
      checkInsta !== -1 ||
      checkFB !== -1
    ) {
      SetInApp(true);
    } else {
      return;
    }
  }, [isInApp]);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/login",
        pageTitle: "?????????",
      },
    });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Box className='LoginContainer'>
        <ScrollToTop />
        <div className='loginHeader'>
          <Link to='/'>
            <img src='/logo2.png' alt='????????? ?????????' />
          </Link>
        </div>
        <Box fill className='LoginBox' justify='center'>
          <Box>
            <div className='loginTitle'>
              <h2>?????????</h2>
              <p>????????? ??? ???????????? ???????????? ???????????????!</p>
            </div>
            <form className='Form'>
              <div className='LoginFormField'>
                <div>
                  <label>?????????</label>
                  <input
                    placeholder='example@naver.com'
                    required
                    name='LogEmail'
                    onChange={LoginChange}
                  />
                </div>
                <div>
                  <label>????????????</label>
                  <input
                    type='password'
                    placeholder='password'
                    required
                    name='LogPassword'
                    onChange={LoginChange}
                  />
                </div>
              </div>

              <LogBtn type='submit' onClick={GoLogin}>
                ?????????
              </LogBtn>
            </form>
            <p className='RegiLink'>
              ?????? ????????? ???????????????? <Link to='/regist'>????????????</Link>
            </p>
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
                {!isInApp && (
                  <button
                    className='googleButton'
                    name='Google'
                    onClick={(e) => signIn(e)}
                  >
                    <Google color='plain' /> ?????? ?????????
                  </button>
                )}
                <button
                  id='kakao-login-btn'
                  className='kakaoButton'
                  name='kakao'
                  onClick={LoginKakao}
                >
                  <img src='/kakao_symbol.png' alt='kakao' />
                  <span>????????? ?????????</span>
                </button>
                <button
                  className='facebookButton'
                  name='Facebook'
                  onClick={(e) => signIn(e)}
                >
                  <FacebookOption color='plain' /> ???????????? ?????????
                </button>
                {/* <div
                  id='naverIdLogin'
                  ref={naverRef}
                  style={{ display: "none" }}
                ></div>
                <button
                  className='NaverButton'
                  name='naver'
                  onClick={() => {
                    //console.log(naverRef.current.children)
                    naverRef.current.children[0].click();
                  }}
                >
                  <img src='/btnG_naver.png' alt='naver' />
                  <span>????????? ?????????</span>
                </button> */}
              </div>

              <div className='isChecked'>
                <p>
                  <a
                    href='https://appplatform.notion.site/8be8232fff0341799cf8c13728610b6b'
                    target='_blank'
                    rel='noreferrer'
                  >
                    ????????????
                  </a>
                  ???&nbsp;
                  <a
                    href='https://www.notion.so/appplatform/d99f247a66d141bbbdf227739861a0a2'
                    target='_blank'
                    rel='noreferrer'
                  >
                    ????????????????????????
                  </a>
                  ??? ???????????????&nbsp;???????????????.
                </p>
              </div>
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
