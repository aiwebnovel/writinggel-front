import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Header as HeaderLayout, Nav, Avatar, Anchor, Button } from "grommet";
import { Menu, Down } from "grommet-icons";
import { ResponsiveContext } from "grommet";
import { OuterClick } from "react-outer-click";

import { authService } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as config from "../config";
import "../styles/header.scss";
import styled from "styled-components";

const Header = () => {
  const size = useContext(ResponsiveContext);
  const check = localStorage.getItem("token");
  const provider = localStorage.getItem('provider');

  const [isShow, SetShow] = useState(false);
  const [isShowMenu, SetShowMenu] = useState(false);
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `/user_colored.png`,
    isBill: "",
    Plan: "",
  });
  const [MobileSubMenu, SetMobileSubMenu] = useState(false);

  const { userName, userImage, isBill, Plan } = profile;

  const refreshProfile = useCallback(async () => {
    authService.onAuthStateChanged(async (user) => {
      //console.log("user", user);
      if (user) {
        await authService.currentUser
          .getIdToken()
          .then(async (data) => {
            await localStorage.setItem("token", data);
          })
          .catch(async (error) => {
            console.log(error);
            toast.error("새로고침하거나 다시 로그인 해주세요!");
          });
      }
    });
  }, []);

  const requestProfile = useCallback(async () => {

    if (check !== null) {
      await axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: check },
        })
        .then((response) => {
          
          SetProfile({
            ...profile,
            userName:  response.data.name,
            userImage: response.data.photoURL,
            isBill: response.data.isBill,
            Plan: response.data.plan
          });
    
     
          localStorage.setItem("userUid", response.data.uid);
          localStorage.setItem("plan", response.data.plan);
          localStorage.setItem("isBill", response.data.isBill);
          
        })
        .catch((error) => {
          if(error.response.status === 412) {
            toast.error('새로고침하거나 다시 로그인 해주세요!') 
            //window.location.reload();  
          }
          // toast.error(error.message);
        });
    }
  }, []);

  const GetProfile = useCallback(async () => {
    if (check !== null) {
      await axios
        .get(`${config.SERVER_URL}/login`, {
          headers: { authentication: check },
        })
        .then(async (response) => {
          console.log(response.data);

          SetProfile({
            ...profile,
            userName:response.data.name,
            isBill: response.data.isBill,
            Plan: response.data.plan,
          });

          localStorage.setItem("token", check);
          localStorage.setItem("userUid", response.data.uid);
          localStorage.setItem("plan", response.data.plan);
          localStorage.setItem("isBill", response.data.isBill);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 412) {
            toast.error("새로고침하거나 다시 로그인 해주세요");
          }
        });
    }
  }, []);


  const signOut = async () => {

    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userUid");
    await localStorage.removeItem("plan");
    await localStorage.removeItem("isBill");
    await localStorage.removeItem("create");
    await localStorage.removeItem("exp");
    await localStorage.removeItem("moid");
    await localStorage.removeItem("time");
    await localStorage.removeItem("userName");
    await localStorage.removeItem("userImage");
    await localStorage.removeItem("provider");


    SetShowMenu(false);

    await authService.signOut();
    window.location.reload();
  };

  const HandleMobile = () => {
    SetMobileSubMenu(!MobileSubMenu);
  };

  const HandleShow = () => {
    SetShow(!isShow);
  };

  const showMenu = () => {
    SetShowMenu(!isShowMenu);
  };

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  useEffect(() => {
    if (provider === "password") {
      GetProfile();
    } else if (provider === "google.com" || "facebook.com") {
      requestProfile();
    }
  }, [provider, GetProfile, requestProfile]);

  // useEffect(() => {
  //   let userAgent = navigator.userAgent;
  //   let check = userAgent.indexOf("KAKAOTALK" || "NAVER");
  //   let checkInsta = userAgent.indexOf("Instagram");
  //   let checkFB = userAgent.indexOf("FB");

  //   if (check !== -1 || checkInsta !== -1 || checkFB !== -1) {
  //     //toast.info(`${userAgent}`);
  //     History.push("/check");
  //   } else {
  //     return;
  //   }
  // }, [History]);

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
            <Link to='/signIn' className={isBill ? "displayNone" : "MenusLink"}>
              {" "}
              <MemButton>멤버십 가입</MemButton>
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
                  <Link to='/service/dailywrite'>일상기록 질문 카드뽑기</Link>
                </li>
                <li>
                  <Link to='/service/storysrc'>이야기 재료 찾기</Link>
                </li>
              </ul>
            </span>
            <Link to='/newsletter'>뉴스레터</Link>
            <Link to='/faq'>FAQ</Link>
            {/* <Link to='/ask'>문의</Link> */}
            {localStorage.getItem("token") ? (
              <Anchor>
                <Avatar
                  referrerpolicy='no-referer'
                  src={userImage && userImage}
                  style={{ width: "40px", height: "40px" }}
                  onClick={showMenu}
                />
              </Anchor>
            ) : (
              <Link to='/login'>
                <Button>로그인</Button>
              </Link>
            )}
          </Nav>
        ) : (
          <Nav>
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        )}
      </HeaderLayout>
      {size === "small" && isShow && (
        <OuterClick
          onOuterClick={() => {
            SetShow(false);
          }}
        >
          <Nav direction='column' className='MobileMenus'>
            <Link to='/signIn' className={isBill && "displayNone"}>
              멤버십 가입
            </Link>
            <Link to='/brand'>브랜드 소개</Link>
            <span className='DropMenu' onClick={HandleMobile}>
              인공지능 글쓰기 서비스 <Down size='small' />
            </span>
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
                  <Link to='/service/dailywrite'>일상기록 질문 카드뽑기</Link>
                </li>
                <li>
                  <Link to='/service/storysrc'>이야기 재료 찾기</Link>
                </li>
              </ul>
            )}
            <Link to='/newsletter'>뉴스레터</Link>
            {/* <Link to='/ask'>문의</Link> */}
            <Link to='/faq'>FAQ</Link>
            {localStorage.getItem("token") ? (
              <>
                <Link to='/tingbox'>팅젤 보관함</Link>
                <Link to='/mypage'>마이 페이지</Link>
              </>
            ) : (
              <Link to='/login' style={{ cursor: "pointer", fontWeight: 600 }}>
                로그인
              </Link>
            )}
          </Nav>
        </OuterClick>
      )}

      {isShowMenu && (
        <div>
          <div className='afterLogin'>
            <div className='Username'>
              <p>
                {userName !== "Guest"
                  ? userName
                  : localStorage.getItem("userName")}{" "}
                님
              </p>
            </div>
            <p className='plan'>
              {localStorage.getItem("plan") === "free"
                ? "free"
                : `${Plan}개월 구독`}
            </p>
            <hr style={{ width: "100%", color: "#3b2477" }} />
            <div className='afterLoginBottom'>
              <p>
                <Link to='/tingbox'>팅젤 보관함</Link>
              </p>
              <p>
                <Link to='/mypage'>마이 페이지</Link>
              </p>
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
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: #b1b5e6;
    font-weight: 600;
  }
`;
