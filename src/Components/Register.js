import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Box } from "grommet";
import { Google, FacebookOption } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService, firebaseInstance } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  sendEmailVerification,
  deleteUser,
} from "@firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../routes/ScrollToTop";
import TagManager from "react-gtm-module";
import Loading from "./SmallLoading";
import firebase from "firebase/compat";

import * as configUrl from "../config";
import "../styles/header.scss";
import styled from "styled-components";

const Register = () => {
  const { Kakao, naver } = window;
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [isInApp, SetInApp] = useState(false);

  const [RegistInput, SetRegistInput] = useState({
    RegEmail: "",
    RegPassword: "",
    CheckPassword: "",
    RegName: "",
  });

  const [ValiMessage, SetMessage] = useState({
    EmailMessage: "",
    PasValiMessage: "특수문자,숫자 포함(최대 20자)",
    CheckMessage: "",
  });

  const [isEmail, SetIsEmail] = useState(false);
  const [isPassword, SetIsPassword] = useState(false);
  const [isCheckPw, SetIsCheckPw] = useState(false);

  const { EmailMessage, PasValiMessage, CheckMessage } = ValiMessage;
  const { RegEmail, RegPassword, CheckPassword, RegName } = RegistInput;

  const NameChange = (e) => {
    SetRegistInput({ ...RegistInput, [e.target.name]: e.target.value });
    //console.log(RegName);
  };

  const EmailChange = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    let ValiEmail = e.target.value;

    if (!emailRegex.test(ValiEmail)) {
      SetMessage({
        ...ValiMessage,
        EmailMessage: "올바른 이메일 형식이 아닙니다.😭",
      });
      SetIsEmail(false);
    } else {
      SetMessage({
        ...ValiMessage,
        EmailMessage: "올바른 이메일 형식이에요!👍",
      });
      SetRegistInput({ ...RegistInput, RegEmail: ValiEmail });
      SetIsEmail(true);
    }
  };

  const PasswordChange = (e) => {
    const PasRegex =
      /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    let ValiPassword = e.target.value;

    if (!PasRegex.test(ValiPassword)) {
      SetMessage({
        ...ValiMessage,
        PasValiMessage: "올바른 비밀번호가 아닙니다.😭",
      });
      SetIsPassword(false);
    } else {
      SetMessage({ ...ValiMessage, PasValiMessage: "올바른 비밀번호에요!👍" });
      SetRegistInput({ ...RegistInput, RegPassword: ValiPassword });
      SetIsPassword(true);
    }
  };

  const CheckPwChange = (e) => {
    let CheckPw = e.target.value;

    if (CheckPw !== RegPassword) {
      SetMessage({
        ...ValiMessage,
        CheckMessage: "비밀번호가 일치하지 않습니다😭",
      });
      SetIsCheckPw(false);
    } else {
      SetMessage({ ...ValiMessage, CheckMessage: "비밀번호가 일치합니다!👍" });
      SetRegistInput({ ...RegistInput, CheckPassword: CheckPassword });
      SetIsCheckPw(true);
    }
  };

  const GoRegister = () => {
    if (isEmail && isPassword && isCheckPw && RegName) {
      SetLoading(true);
      const auth = getAuth();
      auth.languageCode = "ko";
      console.log(auth.currentUser);

      createUserWithEmailAndPassword(auth, RegEmail, RegPassword)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const token = user.accessToken;

          //console.log(user, token);

          updateProfile(user, {
            displayName: RegName,
          })
            .then(async () => {
              const config = {
                method: "get",
                url: `${configUrl.SERVER_URL}/signup`,
                headers: {
                  authentication: token,
                },
              };

              await axios(config)
                .then(async (response) => {
                  //console.log(response);
                  await sendEmailVerification(auth.currentUser)
                    .then((res) => {
                      console.log(res, auth.currentUser);
                      History.push("/welcome");
                      SetLoading(false);
                      setTimeout(toast.info("메일이 발송되었습니다."), 3000);
                    })
                    .catch((err) => {
                      console.log(err);
                      History.push("/noticeverify");
                      SetLoading(false);
                      setTimeout(
                        toast.error("메일이 발송되지 않았습니다."),
                        3000
                      );
                    });
                })
                .catch((error) => {
                  console.log(error);
                  SetLoading(false);
                  if (error.response.data.errorCode === 108) {
                    toast.error(
                      "이미 가입된 유저 또는 가입 불가능한 정보입니다😭"
                    );
                    SetLoading(false);
                  }
                });
            })
            .catch((error) => {
              console.log(error);
              SetLoading(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const errorIndex = errorMessage.indexOf("email-already-in-us");

          console.log(errorCode, errorMessage, errorIndex);
          if (errorIndex !== -1) {
            toast.error("이미 누군가 쓰고 있는 이메일 입니다.😭");
            SetLoading(false);
          } else {
            toast.error(errorMessage);
          }
        });
    } else {
      toast.error("빈 칸이 있거나 유효하지 않은 정보가 있습니다!");
    }
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
              let email = dataFacebook.user.email;
              let create = dataFacebook.user.metadata.creationTime;
              let token = credentials.accessToken;
              let username = user.displayName;
              let userPhoto = user.photoURL;
              //console.log('result',credentials, email,create,token, id);

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
                      console.log(response);
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
                        toast.error(
                          "이미 가입된 유저 또는 가입 불가능한 정보입니다😭"
                        );
                        }
                      if (error.response.data.errorCode === 108) {
                        toast.error(
                          "이미 가입된 유저 또는 가입 불가능한 정보입니다😭"
                        );
                        SetLoading(false);
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
                  "이미 구글로 로그인했던 계정입니다. 동일한 이메일 주소를 사용하여 여러 계정을 만들 수 없습니다."
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
      setPersistence(authService, browserSessionPersistence).then(async () => {
        await authService
          .signInWithPopup(provider)
          .then(async (dataGoogle) => {
            //console.log(dataGoogle);
            let credential = dataGoogle.credential;
            let user = dataGoogle.user;

            let token = credential.idToken;
            let providerId = credential.providerId;
            let email = user.email;
            let create = user.metadata.creationTime;
            let username = user.displayName;
            let userPhoto = user.photoURL;
            //console.log(token);

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
                    console.log(response);
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
                      toast.error(
                        "이미 가입된 유저 또는 가입 불가능한 정보입니다😭"
                      );
                      SetLoading(false);
                      // if (error.response.data.errorCode === 108) {
                      //   toast.error(
                      //     "이미 가입된 유저 또는 가입 불가능한 정보입니다😭"
                      //   );
                      SetLoading(false);
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
                "이미 페이스북으로 로그인했던 계정입니다. 동일한 이메일 주소를 사용하여 여러 계정을 만들 수 없습니다."
              );
              SetLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            SetLoading(false);
          });
      });
    }
  };

  const SignInKakao = () => {
    console.log("kakao");

    Kakao.Auth.authorize({
      redirectUri: "https://tinytingel.ai/oauth",
    });
  };

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
        pagePath: "/regist",
        pageTitle: "회원가입",
      },
    });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Box className='RegisterContainer'>
        <ScrollToTop />
        <div className='loginHeader'>
          <Link to='/'>
            <img src='/logo2.png' alt='로그인 이미지' />
          </Link>
        </div>
        <Box className='RegBox'>
          <Box>
            <div className='RegTitle'>
              {/* <img src='/tinggle.png' alt='회원가입 이미지'/> */}
              <h2>회원가입</h2>
              <h3>가입 하시면 더 많은 서비스를 즐기실 수 있어요!</h3>
              <h4 style={{ marginTop: "10px" }}>
                <span style={{ color: "red" }}>*</span> 회원가입과 동시에 인증용
                메일이 전송됩니다.
              </h4>
              <h4 style={{ marginBottom: "30px" }}>
                <span style={{ color: "red" }}>*</span> 반드시 유효한 메일
                주소로 가입해주세요!
              </h4>
            </div>
            <div className='Form'>
              <div className='RegFormField'>
                {" "}
                <div>
                  <label>이름</label>
                  <input
                    placeholder='이름'
                    required
                    name='RegName'
                    onChange={NameChange}
                    onFocus={NameChange}
                  />
                </div>
                <div>
                  <label>이메일</label>
                  <input
                    placeholder='E-mail'
                    required
                    name='RegEmail'
                    onChange={EmailChange}
                    onFocus={EmailChange}
                  />
                  <p className={isEmail ? "RegCorrect" : "RegIncorrect"}>
                    {EmailMessage}
                  </p>
                  {/* <Verify>
                    <button onClick={HandleVerify}>이메일 인증</button>
                  </Verify> */}
                </div>
                <div>
                  <label>비밀번호</label>
                  <input
                    placeholder='password'
                    type='password'
                    required
                    name='RegPassword'
                    onChange={PasswordChange}
                    onFocus={PasswordChange}
                  />
                  <p className={isPassword ? "RegCorrect" : "RegIncorrect"}>
                    {PasValiMessage}
                  </p>
                </div>
                <div>
                  <label>비밀번호 확인</label>
                  <input
                    placeholder='password'
                    type='password'
                    required
                    name='CheckPassword'
                    onChange={CheckPwChange}
                    onFocus={CheckPwChange}
                  />
                  <p className={isCheckPw ? "RegCorrect" : "RegIncorrect"}>
                    {CheckMessage}
                  </p>
                </div>
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
                  에&nbsp;동의합니다.
                </p>
              </div>
              <RegBtn onClick={GoRegister}>회원가입</RegBtn>
            </div>
            <p className='LoginLink'>
              라이팅젤 회원이신가요? <Link to='/login'>로그인</Link>
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
                    <Google color='plain' />
                    구글로 시작하기
                  </button>
                )}
                <button
                  id='kakao-login-btn'
                  className='kakaoButton'
                  name='kakao'
                  onClick={SignInKakao}
                >
                  <img src='/kakao_symbol.png' alt='kakao' />
                  <span>카카오로 시작하기</span>
                </button>
                <button
                  className='facebookButton'
                  name='Facebook'
                  onClick={(e) => signIn(e)}
                >
                  <FacebookOption color='plain' /> 페이스북으로 시작하기
                </button>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;

const MemButton = styled.button`
  border: 1px solid #dedede;
  background-color: #fff;
  padding: 5px 20px;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: #b1b5e6;
    font-weight: 600;
  }
`;

const LogBtn = styled.button`
  background-color: #b1b5e6;
  color: #444;
  padding: 5px 15px;
  outline: 0;
  border: 1px solid #b1b5e6;
  margin: 25px 0 15px 0;
  width: 100%;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    font-weight: 600;
  }
`;

const RegBtn = styled.button`
  background-color: #ffce1f;
  color: #444;
  padding: 10px 15px;
  outline: 0;
  border: 1px solid #ffce1f;
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

const Verify = styled.div`
  > button {
    width: 100%;
    background-color: #b1b5e6;
    border: 1px solid #b1b5e6;
    font-weight: 600;
    padding: 5px 8px;
    font-size: 1rem;
    margin-top: 5px;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      font-weight: 600;
      background-color: #ff9300;
      border: 1px solid #ff9300;
    }
  }
`;
