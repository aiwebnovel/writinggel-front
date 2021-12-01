import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Header as HeaderLayout, Nav, Avatar } from "grommet";
import { Menu } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService, firebaseInstance } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OuterClick } from "react-outer-click";

import * as config from "../../config";
import "../../styles/Service.scss";
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
    isBill:'',
    Plan:''
  });

  const { userName, userImage, isBill, Plan } = profile;

  const requestProfile = useCallback(async () => {

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
            isBill: response.data.isBill,
            Plan: response.data.plan
          });
          // console.log('profile', profile);
     
          localStorage.setItem("userUid", response.data.uid);
          localStorage.setItem("plan", response.data.plan);
          localStorage.setItem("isBill", response.data.isBill);
          localStorage.setItem('userName', response.data.name);
          localStorage.setItem('userImage', response.data.photoURL);
        })
        .catch((error) => {
          console.log(error);
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

  const signOut = async () => {
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

  const HandleShow = () => {
    SetShow(!isShow);
  };

  const showMenu = () => {
    SetShowMenu(!isShowMenu);
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    requestProfile();
  }, []);

  return (
    <>
      <HeaderLayout className='ServiceHeader' align='center'>
        <Nav className='MainLogo2'>
          <Link to='/'>
            <img src='/logo2.png' alt='logo' />
          </Link>
        </Nav>
        {size !== "small" ? (
          <Nav direction='row' gap='medium' align='center'>
            <Link to='/explain'>
              <LinkBtn>멤버십 가입</LinkBtn>
            </Link>
            <Avatar
              src={userImage}
              style={{ width: "40px", height: "40px" }}
              onClick={showMenu}
            />
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        ) : (
          <Nav>
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        )}
      </HeaderLayout>
      {isShow && (
        <OuterClick onOuterClick={(event) => {
          // event.preventDefault();
          //console.log("Clicked outside");
          SetShow(false);}}>
        <Box
          style={size === "small" ? {width: '100%'} : {height:'100%'}}
          animation={
            size !== "small"
              ? { type: "slideLeft", duration: 300 }
              : { type: "slideDown", duration: 300 }
          }
          className='ServiceMenus'
          align='center'
          pad='large'
        >
          <Nav direction='column' gap='large' className='ServiceDropMenu'>
            {size === 'small' &&
              <Nav direction='row' gap='medium' align='center' justify={size ==='small' && 'between'}>
              <Link to='/explain'>
                <LinkBtn>멤버십 가입/변경</LinkBtn>
              </Link>
              <Avatar
                src={userImage}
                style={{ width: "40px", height: "40px" }}
                onClick={showMenu}
              />
            </Nav>
              }
            <ul className='ServiceDropDown'>
              <li>
                <Link to='/app/webnovel'>릴레이 웹소설 쓰기</Link>
              </li>
              <li>
                <Link to='/app/bloger/idea'>블로그 글쓰기</Link>
              </li>
              <li>
                <Link to='/app/fairytale'>동화 쓰기</Link>
              </li>
              <li>
                <Link to='/app/firstsentence'>첫문장 자판기</Link>
              </li>
              <li>
                <Link to='/app/lyrics'>영어 가사 쓰기</Link>
              </li>
              <li>
                <Link to='/app/businessitem'>비지니스 아이디어</Link>
              </li>
              <li>
                <Link to='/app/discussion'>찬반 논거</Link>
              </li>
              <li>
                <Link to='/app/loveletter'>MBTI 연애편지</Link>
              </li>
              <li>
                <Link to='/app/dailywrite'>일상기록 질문 카드뽑기</Link>
              </li>
              <li>
                <Link to='/app/storysrc'>이야기 재료 찾기</Link>
              </li>
            </ul>
          </Nav>
        </Box>
        </OuterClick>
      )}
      {isShowMenu && (
        <div>
          <div className='ServiceAfterLogin'>
            <div className='ServiceUsername'>
              <p>{userName} 님</p>
            </div>
            <p className='ServicePlan'>
              {localStorage.getItem("plan") === "free"
                ? "free"
                : `${Plan}개월 구독`}
            </p>
            <hr style={{ width: "100%", color: "#3b2477" }} />
            <div className='ServiceAfterLoginBottom'>
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

const LinkBtn = styled.button`
  background-color: #fff;
  border: 2px solid #3b2477;
  outline: 0;
  color: #3b2477;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
`;
