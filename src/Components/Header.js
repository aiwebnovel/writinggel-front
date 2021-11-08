import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { Header as HeaderLayout, Nav, Avatar, Anchor } from "grommet";
import { User, Menu, Google, FacebookOption, Down } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService, firebaseInstance } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "./Modal";
import * as config from "../config";
import "../styles/header.scss";
import styled from "styled-components";

const Header = () => {
  const size = useContext(ResponsiveContext);

  const [isOpen, SetOpen] = useState(false);
  const [isShow, SetShow] = useState(false);
  const [isChecked, SetChecked] = useState(false);
  const [isUser, SetUser] = useState(false);
  const [isShowMenu, SetShowMenu] = useState(false);
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `User`,
  });
  const [MobileSubMenu, SetMobileSubMenu] = useState(false)

  const { userName, userImage } = profile;

  const signIn = async (event) => {
    if (isChecked === true) {
      // console.log('mount3')
      const {
        target: { name },
      } = event;
      let provider = new firebaseInstance.auth.GoogleAuthProvider();
      if (name === "Facebook") {
        provider = new firebaseInstance.auth.FacebookAuthProvider();
      } else if (name === "Google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      }
      // console.log('mount12')
      // refreshProfile()
      await authService
        .signInWithPopup(provider)
        .then(async (result) => {
          // console.log('mount13')
          console.log(result);
          /** @type {firebase.auth.OAuthCredential} */
          let credential = result.credential;
          let email = result.user.email;
          let create = result.user.metadata.creationTime;
          let token = credential.idToken;
        
          // console.log('mount4',credential)
          await localStorage.setItem("token", token);
          await localStorage.setItem("email", email);
          await localStorage.setItem("create", create);
          // await localStorage.getItem("token");
          // console.log('mount5')
          await requestProfile();
          await SetUser(true);
          await SetOpen(false);
          // console.log('mount6')
          refreshProfile();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      toast.error("이용약관 및 개인정보처리방침에 동의해주세요!");
    }
  };


  const requestProfile =  useCallback(async () => {
    // console.log('mount')
    // let user = await localStorage.getItem("token");
    // console.log('mount11')
    if (localStorage.getItem("token") !== null) {
    
      await axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: localStorage.getItem("token") },
        })
        .then((response) => {
          // console.log('previus', profile);
          SetProfile({
            ...profile,
            userName: response.data.name,
            userImage: response.data.photoURL,
          });
          // console.log('profile', profile);
          // console.log('mount7')
          localStorage.setItem("userUid", response.data.uid);
          localStorage.setItem("plan", response.data.plan);
          localStorage.setItem("isBill", response.data.isBill);
          // console.log('mount8')
         
        })
        .catch((error) => 
        {console.log(error)});
    }
  },[profile]);

  const refreshProfile = useCallback(async () => {
    // console.log('mount2')
    authService.onAuthStateChanged(async (user) => {
      if (authService.currentUser) {
        authService.currentUser
          .getIdToken()
          .then(async (data) => {
            await localStorage.setItem("token", data); 
            // console.log('mount9')
          })
          .catch(async (error) => {
            console.log(error);
          });
      }
    });
  },[]);

  const signOut = async() => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userUid");
    await localStorage.removeItem("plan");
    await localStorage.removeItem("isBill");
    await localStorage.removeItem("create");
    
    SetUser(false);
    SetShowMenu(false);
  
    await authService.signOut();
    window.location.reload();
  };

  const HandleMobile = () => {
    SetMobileSubMenu(!MobileSubMenu);
  }

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const HandleChecked = () => {
    SetChecked(!isChecked);
    console.log(isChecked);
  };

  const HandleShow = () => {
    SetShow(!isShow)
  };

  const showMenu = () => {
    SetShowMenu(!isShowMenu);

  };


  useEffect(() => {  
    refreshProfile();
  },[]);

  useEffect(()=>{
    requestProfile(); 
  },[])

  return (
    <>
      <HeaderLayout className='headerStyle'>
        <Nav>
          <Link to='/'>
            <img className='MainLogo' src='/logo.png' alt='logo' />
          </Link>
        </Nav>
        {size !== "small" ? (
          <Nav direction='row' className='Menus' gap='large' align='center'>
            <Link to='/explain'>
              <MemButton>멤버쉽 가입</MemButton>
            </Link>
            <Link to='/brand'>브랜드 소개</Link>
            <span className='DropMenu'>
              인공지능 글쓰기 서비스 <Down size='small' />
              <ul className='DropDown'>
              <li>
                  <Link to='/service/webnovel'>웹소설 창작</Link>
                </li>
                <li>
                  <Link to='/service/bloger'>블로그 글쓰기</Link>
                </li>
                <li>
                  <Link to='/service/fairytale'>동화 쓰기</Link>
                </li>
                <li>
                  <Link to='/service/firstsentence'>첫문장 자판기</Link>
                </li>
                <li>
                  <Link to='/service/lyrics'>영어 가사 쓰기</Link>
                </li>
                <li>
                  <Link to='/service/businessitem'>비지니스 아이디어</Link>
                </li>
                <li>
                  <Link to='/service/discussion'>찬반 논거</Link>
                </li>
                <li>
                  <Link to='/service/loveletter'>MBTI 연애편지</Link>
                </li>
                <li>
                  <Link to='/service/dailywrite'>일상 기록 질문 자판기</Link>
                </li>
                <li>
                  <Link to='/service/storysrc'>이야기 재료 찾기</Link>
                </li>
              </ul>
              </span>
            <Link to='/newsletter'>뉴스레터</Link>
            <Link to='/ask'>문의</Link>
            {localStorage.getItem("token") ? (
              <Anchor>
                <Avatar
                  src={userImage}
                  style={{ width: "40px", height: "40px" }}
                  onClick={showMenu}
                />
              </Anchor>
            ) : (
              <User color='brand' onClick={HandleModals} />
            )}
          </Nav>
        ) : (
          <Nav>
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        )}
      </HeaderLayout>
      {size === 'small' && isShow && (
        <>
          <Nav direction='column' className='MobileMenus' gap='large'>
            <Link to='/explain'>멤버쉽 가입</Link>
            <Link to='/brand'>브랜드 소개</Link>
            <span className='DropMenu' onClick={HandleMobile}>
              인공지능 글쓰기 서비스 <Down size='small' /></span>
                {MobileSubMenu && (
                <ul className='MobileDropDown'>
                <li>
                  <Link to='/service/webnovel'>웹소설 창작</Link>
                </li>
                <li>
                  <Link to='/service/bloger'>블로그 글쓰기</Link>
                </li>
                <li>
                  <Link to='/service/fairytale'>동화 쓰기</Link>
                </li>
                <li>
                  <Link to='/service/firstsentence'>첫문장 자판기</Link>
                </li>
                <li>
                  <Link to='/service/lyrics'>영어 가사 쓰기</Link>
                </li>
                <li>
                  <Link to='/service/businessitem'>비지니스 아이디어</Link>
                </li>
                <li>
                  <Link to='/service/discussion'>찬반 논거</Link>
                </li>
                <li>
                  <Link to='/service/loveletter'>MBTI 연애편지</Link>
                </li>
                <li>
                  <Link to='/service/dailywrite'>일상 기록 질문 자판기</Link>
                </li>
                <li>
                  <Link to='/service/storysrc'>이야기 재료 찾기</Link>
                </li>
              </ul>
                )}
            <Link to='/newsletter'>뉴스레터</Link>
            <Link to='/ask'>문의</Link>
            {localStorage.getItem("token") ? (
              <Link to='/mypage'>My page</Link>
            ) : (
              <span onClick={HandleModals}>Login</span>
            )}
          </Nav>
        </>
      )}
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals} title='Login'>
        <div className='AvatarBox'>
          <img src='/user.png' alt='singinUser' className='loginAvatar' />
        </div>

        <div className='signBox'>
          <button onClick={signIn} className='googleButton'>
            <Google color='plain' size='medium' /> Sign in with Google
          </button>

          <div className='signBox'>
            <button className='facebookButton'>
              <FacebookOption color='plain' size='medium' /> Sign in with
              Facebook
            </button>
          </div>
          <div className='isChecked'>
            <input
              type='checkbox'
              name='agree'
              value={isChecked}
              onClick={HandleChecked}
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

      {isShowMenu && (
        <div>
          <div className='afterLogin'>
            <div className='Username'>
              <p>{userName} 님</p>
            </div>
            <p className="plan">
                {localStorage.getItem("plan") === "undefined"
                  ? "Guest"
                  : localStorage.getItem("plan")}
              </p> 
            <hr style={{width:'100%',color:'#3b2477'}}/>
            <div className="afterLoginBottom">

              <p><Link to='/'>팅젤 보관함</Link></p>
                <p><Link to='/mypage'>마이 페이지</Link></p>
                <button onClick={signOut}>로그아웃</button>
              </div>
            </div>
          </div>
      
      )}
    </>
  );
};

export default Header;

const MemButton = styled.button`
  border: 1px solid #dedede;
  background-color: #fff;
  padding: 5px 20px;
  cursor: pointer;
`;
