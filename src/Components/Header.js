import React from 'react'
import { Link } from 'react-router-dom'
import {Header as HeaderLayout , Nav} from 'grommet'
import  {User, Login} from 'grommet-icons'

import '../styles/header.scss'


const Header = () => {

    const SignIn = () => {
        console.log('Login');
    }

    return(
        <HeaderLayout className='headerStyle'>
            <Nav>
            <img className="MainLogo" src="/logo.png" alt="logo"/>
            </Nav>
            <Nav direction="row">
            <Link to="/">Home</Link>
            <Link to="/brand">브랜드소개</Link>
            <Link to="/webnovelDetail">Webnovel</Link>
            <Link to="/newsletter">newsletter</Link>
            <Link to="/ask">문의하기</Link>
            <Link to="/faq">faQ</Link>
            <Link to="/explainMember">멤버쉽 소개</Link>
            <Login color='brand' onClick={SignIn}/>
            </Nav>
                   
        </HeaderLayout>
    )
}

export default Header;