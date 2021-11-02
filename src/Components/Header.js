import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [user, SetUser] = useState(false);
  const [isShowMenu, SetShowMenu] = useState(false);
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `유저`,
  });

  const { userName, userImage } = profile;

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const HandleChecked = () => {
    SetChecked(!isChecked);
    console.log(isChecked);
  };

  const HandleShow = () => {
    SetShow(!isShow);
  };

  const signIn = async (event) => {
    if (isChecked === true) {
      const {
        target: { name },
      } = event;
      let provider = new firebaseInstance.auth.GoogleAuthProvider();
      if (name === "Facebook") {
        provider = new firebaseInstance.auth.FacebookAuthProvider();
      } else if (name === "Google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      }
      await authService
        .signInWithPopup(provider)
        .then(async (result) => {
          console.log(result);
          /** @type {firebase.auth.OAuthCredential} */
          let credential = result.credential;
          let token = credential.idToken;

          await localStorage.setItem("token", token);
          SetUser(true);
          toast.success(`로그인 되었습니다!`);
          this.requestProfile();
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
    } else {
      toast.error("이용약관 및 개인정보처리방침에 동의해주세요!");
    }
  };

  const refreshProfile = async () => {
    authService.onAuthStateChanged(async (user) => {
      if (authService.currentUser) {
        authService.currentUser
          .getIdToken()
          .then(async (data) => {
            await localStorage.setItem("token", data);
          })
          .catch(async (error) => {
            //console.log(error);
          });
      }
    });
  };

  const requestProfile = async () => {
    let user = await localStorage.getItem("token");
    if (user !== null) {
      axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: user },
        })
        .then((response) => {
          console.log("res", response);
          SetUser(true);
          SetProfile({
            ...profile,
            userName: response.data.name,
            userImage: response.data.photoURL,
          });
          // setState({ userToken: response.data.token });
          // setState({ userTokenP: response.data.tokenP });
          // setState({ userImage: response.data.photoURL });
          localStorage.setItem("userUid", response.data.uid);
          localStorage.setItem("plan", response.data.plan);
          localStorage.setItem("isBill", response.data.isBill);

          this.closeModal();
        })
        .catch((error) => {});
    }
  };

  const showMenu = () => {
    SetShowMenu(!isShowMenu);
    // event.preventDefault();
    // event.stopPropagation();

    // if (isShowMenu) {
    //   SetShowMenu(false)
    //   document.removeEventListener("click", this.closeMenu);
    // } else {
    //   this.setState({ showMenu: true });
    //   document.addEventListener("click", this.closeMenu);
    // }
  };

  const signOut = () => {
    console.log("singOut");
  };

  useEffect(() => {
    refreshProfile();
    requestProfile();
  }, []);

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
              <Button>멤버쉽 가입</Button>
            </Link>
            <Link to='/brand'>브랜드 소개</Link>
            <span className='DropMenu'>
              인공지능 글쓰기 서비스 <Down size='small' />
              <ul className='DropDown'>
                <li>
                  <Link to='/webnovelDetail'>웹소설 창작</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>블로그 동화쓰기</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>동화 창작</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>뉴스레터 콘텐츠 기획</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>영어 시 쓰기</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>비지니스 아이디어</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>연애편지 쓰기</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>첫문장 자판기</Link>
                </li>
              </ul>
            </span>
            <Link to='/newsletter'>뉴스레터</Link>
            <Link to='/ask'>문의</Link>
            {localStorage.getItem("token") ? (
              <Anchor>
                <Avatar
                  src={userImage}
                  className='profileicon'
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
      {isShow && (
        <>
          <Nav direction='column' className='MobileMenus' gap='large'>
            <Link to='/explain'>멤버쉽 가입</Link>
            <Link to='/brand'>브랜드 소개</Link>
            <span className='DropMenu'>
              인공지능 글쓰기 서비스 <Down size='small' />
              <ul className='DropDown'>
                <li>
                  <Link to='/webnovelDetail'>웹소설 창작</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>블로그 동화쓰기</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>동화 창작</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>뉴스레터 콘텐츠 기획</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>영어 시 쓰기</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>비지니스 아이디어</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>연애편지 쓰기</Link>
                </li>
                <li>
                  <Link to='/webnovelDetail'>첫문장 자판기</Link>
                </li>
              </ul>
            </span>
            <Link to='/newsletter'>뉴스레터</Link>
            <Link to='/ask'>문의</Link>
            {localStorage.getItem("token") ? (
              <li>MY page</li>
            ) : (
              <span onClick={HandleModals}>Login</span>
            )}
          </Nav>
        </>
      )}
      <Modal open={isOpen} close={HandleModals} title='Login'>
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
        <div
        // ref={(element) => {
        //   this.dropdownMenu = element;
        // }}
        >
          <div className='afterLogin'>
            <div className='Username'>
              <p>{userName}</p>
            </div>
            <div>
              <p>
                {localStorage.getItem("plan") === "undefined"
                  ? "Guest"
                  : localStorage.getItem("plan")}
              </p>
              <div className='logout'>
                <Button primary label='logout' onClick={signOut}></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

const Button = styled.button`
  border: 1px solid #dedede;
  background-color: #fff;
  padding: 5px 20px;
  cursor: pointer;
`;
