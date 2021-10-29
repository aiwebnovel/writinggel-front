import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderLayout, Nav } from "grommet";
import { User, Menu, Google, FacebookOption, Down } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import Modal from "./Modal";
import "../styles/header.scss";
import styled from "styled-components";

const Header = () => {
  const size = useContext(ResponsiveContext);

  const [isOpen, SetOpen] = useState(false);
  const [isShow, SetShow] = useState(false);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const HandleShow = () => {
    SetShow(!isShow);
  };

  return (
    <>
      <HeaderLayout className='headerStyle'>
        <Nav>
          <Link to='/'>
            <img className='MainLogo' src='/logo.png' alt='logo' />
          </Link>
        </Nav>
        {size !== "small" ? (
          <Nav direction='row' className='Menus' gap='large'>
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

            <User color='brand' onClick={HandleModals} />
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

            <span onClick={HandleModals}>Login</span>
          </Nav>
        </>
      )}
      <Modal open={isOpen} close={HandleModals} title='Login'>
        <div className='AvatarBox'>
          <img src='/user.png' alt='singinUser' className='loginAvatar' />
        </div>

        <div className='signBox'>
          <button className='googleButton'>
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
              // value={this.state.isChecked}
              // onClick={this.isChecked}
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

export default Header;

const Button = styled.button`
  border: 1px solid #dedede;
  background-color: #fff;
  padding: 5px 20px;
  cursor: pointer;
`;
