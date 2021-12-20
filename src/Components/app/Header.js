import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Header as HeaderLayout, Nav, Avatar } from "grommet";
import { Menu } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OuterClick } from "react-outer-click";

import * as config from "../../config";
import "../../styles/Service.scss";
import styled from "styled-components";

const Header = () => {
  const size = useContext(ResponsiveContext);

  const check = localStorage.getItem("token");
  const provider = localStorage.getItem('provider');

  const [isShow, SetShow] = useState(false);
  const [isUser, SetUser] = useState(false);
  const [isShowMenu, SetShowMenu] = useState(false);
  // const [provider, SetProvider] = useState('');
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `/user_colored.png`,
    isBill:'',
    Plan:''
  });

  const { userName, userImage, isBill, Plan } = profile;


  const refreshProfile = useCallback(async () => {

    authService.onAuthStateChanged(async (user) => {
      //console.log(user)
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

    if (localStorage.getItem("token") !== null) {
      await axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: localStorage.getItem("token") },
        })
        .then((response) => {
          // console.log('previus', profile);
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
          }
        });
    }
  }, [profile]);


  const GetProfile = useCallback(async() => {
    if(check !== null) {
    await axios
      .get(`${config.SERVER_URL}/login`, {
        headers: { authentication: check },
      })
      .then(async(response) => {
        console.log(response.data);
      
        SetProfile({
          ...profile,
          userName: localStorage.getItem('userName'),
          isBill: response.data.isBill,
          Plan: response.data.plan,
        });

        localStorage.setItem("token", localStorage.getItem('token'));
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
  },[]);

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

  useEffect(()=>{

    if(provider === 'password'){
      GetProfile();
    } else if(provider === 'google.com' || 'facebook.com') {
      requestProfile();
    }
  },[])


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
            <Link to='/signIn' className={isBill ? "displayNone" : "MobileMenusLink"}>
              <LinkBtn>멤버십 가입</LinkBtn>
            </Link>
            < HowToLink href="https://appplatform.notion.site/99f9b5fb95d84477b9e2aa343fb97055" target='_blank' rel="noreferrer">사용 방법</ HowToLink>
            <Avatar
              src={userImage}
              style={{ width: "40px", height: "40px"}}
              onClick={showMenu}
              
            />
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        ) : (
          <Nav direction='row' gap={size !== 'small' ? 'large':'medium'} align='center'>
            < HowToLink href="https://appplatform.notion.site/99f9b5fb95d84477b9e2aa343fb97055" target='_blank' rel="noreferrer">사용 방법</ HowToLink>
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        )}
      </HeaderLayout>
      {isShow && (
        <OuterClick onOuterClick={(event) => {
          SetShow(false);}}>
        <Box
          style={size === "small" ? {width: '100%'} : {height:'100%'}}
          animation={
            size !== "small"
              ? { type: "slideLeft", duration: 300 }
              : { type: "slideDown", duration: 500 }
          }
          className='ServiceMenus'
          align='center'
          pad='large'
        >
          <Nav direction='column' gap='large' className='ServiceDropMenu'>
            {size === 'small' &&
              <Nav direction='row' gap='medium' align='center' justify={size ==='small' && 'between'}>
              <Link to='/signIn' className={isBill && 'displayNone'}>
                <LinkBtn>멤버십 가입</LinkBtn>
              </Link>
              <Avatar
                src={userImage && userImage}
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
  transition: all 300ms ease;
`;


const HowToLink = styled.a`
background-color: #b1b5e6;
outline: 0;
padding: 2px 8px;
border-radius: 5px;
font-size : 15px;

@media screen and (max-width:768px) {
  font-size : 13px;
}

`