import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderLayout, Nav } from "grommet";
import { User, Menu } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import "../styles/header.scss";
import styled from "styled-components";

const Header = () => {

  const size = useContext(ResponsiveContext)
  
  const SignIn = () => {
    console.log("Login");
  };

  return (
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

          <User color='brand' onClick={SignIn} />
        </Nav>
      ) : (
        <Nav>
          <Menu color='brand' size='medium' />
        </Nav>
      )}
    </HeaderLayout>
  );
};

export default Header;

const Button = styled.button`
  border: 1px solid #dedede;
  background-color: #fff;
  padding: 5px 20px;
  cursor: pointer;
`;
