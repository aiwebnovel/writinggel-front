import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderLayout, Nav } from "grommet";
import { User, Menu, Google, FacebookOption } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import Modal from "./Modal";
import "../styles/header.scss";
import styled from "styled-components";

const Header = () => {
  const size = useContext(ResponsiveContext);

  const [isOpen, SetOpen] = useState(false);


  const controllModals = () => {
    SetOpen(!isOpen)
  }
  

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
            <Link to='/brand'>브랜드소개</Link>
            <Link to='/webnovelDetail'>서비스</Link>
            <Link to='/newsletter'>뉴스레터</Link>
            <Link to='/ask'>문의</Link>

            <User color='brand' onClick={controllModals}/>
          </Nav>
        ) : (
          <Nav>
            <Menu color='brand' size='medium' />
          </Nav>
        )}
      </HeaderLayout>

      <Modal
        open={isOpen}
        close={controllModals}
        title='Login'
      >
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
