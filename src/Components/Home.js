import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import {
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  ResponsiveContext,
} from "grommet";
import { User, Menu, Google, FacebookOption, Down } from "grommet-icons";
import ScrollToTop from "../routes/ScrollToTop";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "./Modal";
import * as config from "../config";

import { authService, firebaseInstance } from "../firebaseConfig";
import LinkObject from "./app/LinkObject";
import "../styles/Main.scss";
import TagManager from 'react-gtm-module';

const Home = () => {
  const [isChecked, SetChecked] = useState(false);
  const [isOpen, SetOpen] = useState(false);
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `User`,
    isBill: "",
    Plan: "",
  });

  const size = useContext(ResponsiveContext);
  const history = useHistory();

  const HandleModals = () => {
    let loginCheck = localStorage.getItem('token');
    if(!loginCheck) {
      SetOpen(!isOpen);
    }else {
      history.push('/app/firstsentence');
    }
 
  };

  const HandleChecked = (e) => {
    SetChecked(e.target.checked);
  };

  const signIn = async (e) => {
    if (isChecked === true) {
      let name = e.target.name;
      if (name === "Facebook") {
        let provider = new firebaseInstance.auth.FacebookAuthProvider();
        await authService
          .signInWithPopup(provider)
          .then(async (dataFacebook) => {
            //console.log(dataFacebook);

            let credentials = dataFacebook.credential;
            let email = dataFacebook.user.email;
            let create = dataFacebook.user.metadata.creationTime;
            let token = credentials.accessToken;

            await localStorage.setItem("token", token);
            await localStorage.setItem("email", email);
            await localStorage.setItem("create", create);

            await requestProfile();
            await SetOpen(false);

            refreshProfile();
            history.replace('/app/firstsentence');
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
           // console.log(dataGoogle);

            let credential = dataGoogle.credential;
            let email = dataGoogle.user.email;
            let create = dataGoogle.user.metadata.creationTime;
            let token = credential.idToken;
            //console.log("result", credential, email, create, token);

            await localStorage.setItem("token", token);
            await localStorage.setItem("email", email);
            await localStorage.setItem("create", create);

            await requestProfile();
            await SetOpen(false);

            refreshProfile();
            history.replace('/app/firstsentence');
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
  
  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/',
        pageTitle: '홈',
      },
    });

  },[])

  return (
    <>
      <Layout>
      <ScrollToTop/>
        <Box justify='center' align='center' className='MainHome'>
          <Grid
            columns={size !== "small" ? { count: 4, size: "auto" } : "100%"}
            gap='medium'
            fill={size !== "small" ? false : true}
          >
            <Card background='#372874' height='small' onClick={HandleModals} style={{cursor:"pointer", color:'#fff'}}> 
              <CardBody className='cardTitle' justify='center'>
                <p>인공지능 글쓰기</p>
                <p>무료체험 해보기</p>
                <p>(15회)</p>
              </CardBody>
            </Card>
            {LinkObject.map((item) => (
              <Link to={item.detail || "/"} key={item.id}>
                <Card background='#f9f9f9' height='small' style={{cursor:"pointer"}}>
                  <CardHeader className='cardTop'>
                    {/* <Magic color='#fff' /> */}
                  </CardHeader>
                  <CardBody className='cardTitle' justify='center'>
                    {item.title}
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>
        </Box>
      </Layout>
      <Modal
        onClick={HandleModals}
        open={isOpen}
        close={HandleModals}
        title='Login'
      >
        <div className='AvatarBox'>
          <img src='/user.png' alt='singinUser' className='loginAvatar' />
        </div>

        <div className='signBox'>
          <button
            className='googleButton'
            name='Google'
            onClick={(e) => signIn(e)}
          >
            <Google color='plain' size='medium' /> Sign in with Google
          </button>

          <div className='signBox'>
            <button
              className='facebookButton'
              name='Facebook'
              onClick={(e) => signIn(e)}
            >
              <FacebookOption color='plain' size='medium' /> Sign in with
              Facebook
            </button>
          </div>
          <div className='isChecked'>
            <input
              type='checkbox'
              name='agree'
              onClick={(e) => {
                HandleChecked(e);
              }}
              style={{ width: "18px", height: "18px", marginRight: "5px" }}
            />
            <a
              href='https://appplatform.notion.site/8be8232fff0341799cf8c13728610b6b'
              target='_blank'
              rel='noreferrer'
            >
              이용약관
            </a>
            과 &nbsp;
            <a
              href='https://www.notion.so/appplatform/d99f247a66d141bbbdf227739861a0a2'
              target='_blank'
              rel='noreferrer'
            >
              개인정보처리방침
            </a>
            에&nbsp;동의합니다.
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
