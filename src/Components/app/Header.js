import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Header as HeaderLayout, Nav, Avatar } from "grommet";
import { Menu } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService, firebaseInstance } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  });

  const { userName, userImage } = profile;

  const requestProfile = useCallback(async () => {
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
        .catch((error) => {
          console.log(error);
        });
    }
  }, [profile]);

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
              <LinkBtn>멤버쉽 가입/변경</LinkBtn>
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
        <Box
          //768px 사이즈일 때 width 100%
          width={size === "small" && "100%"}
          //768px 사이즈가 아닐 때(pc버전만 height 100%)
          height={size !== "small" && "100%"}
          //768px 이상 이면 왼쪽에서 오른쪽으로, 이하면 위에서 아래로
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
                <LinkBtn>멤버쉽 가입/변경</LinkBtn>
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
                <Link to='/app/bloger'>블로그 글쓰기</Link>
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
                <Link to='/app/dailywrite'>일상 기록 질문 자판기</Link>
              </li>
              <li>
                <Link to='/app/storysrc'>이야기 재료 찾기</Link>
              </li>
            </ul>
          </Nav>
        </Box>
      )}
      {isShowMenu && (
        <div>
          <div className='ServiceAfterLogin'>
            <div className='ServiceUsername'>
              <p>{userName} 님</p>
            </div>
            <p className='ServicePlan'>
              {localStorage.getItem("plan") === "undefined"
                ? "Guest"
                : localStorage.getItem("plan")}
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
