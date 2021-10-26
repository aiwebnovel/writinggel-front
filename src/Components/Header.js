import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/brand">브랜드소개</Link>
            <Link to="/webnovelDetail">Webnovel</Link>
            <Link to="/newsletter">newsletter</Link>
            <Link to="/ask">문의하기</Link>
            <Link to="/faq">faQ</Link>
            <Link to="/explainMember">멤버쉽 소개</Link>
                   
        </div>
    )
}

export default Header;