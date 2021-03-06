import React from 'react'
import { Footer as FooterLayout, Box} from 'grommet';
import {Facebook, Instagram, Twitter, Youtube} from 'grommet-icons'
import styled from 'styled-components'

import '../styles/footer.scss'

const Footer = () => {

    return(
        <>
        <FooterLayout className="MobileFooterContainer" direction="row" background="light-2" pad="large" style={footerStyle}>
          <Box direction="row" gap="medium" className="MobileFooter">
              <div className="InfoBox">
                <p><b>(주)앱플랫폼</b></p>
                <p>대표 : 김춘남</p>
                <p>사업자 번호 : 115-87-01388</p>
                <p>통신판매신고번호 : 제2021-서울서초-4241호</p>
                <p>전화 : 02-6959-4330</p>
                <p>운영시간 : 평일 09:30~17:30</p>
              </div>
    
              <div className="InfoBox">
                <p><b>주소</b></p>    
                <p>서울 서초구 반포대로28길</p>
                <p>56-6, 3층 301호</p>   
                <p>301, 56-6, Banpo-daero 28-gil, </p>
                <p>Seocho-gu, Seoul, Korea</p>
              </div>
        </Box>   
        <Box direction="row" gap="medium"  className="MobileFooter">
              <div className="InfoBox">
                <p><b>정책</b></p>   
                <a target="_blank" rel="noreferrer noopener" href="https://www.notion.so/appplatform/d99f247a66d141bbbdf227739861a0a2">개인정보 처리방침</a>
                <a target="_blank" rel="noreferrer noopener" href="https://appplatform.notion.site/8be8232fff0341799cf8c13728610b6b">이용약관</a>
                <a href="mailto:support@appplatform.co.kr">support@appplatform.co.kr </a>
              </div>
    
              <img src='/logo.png' alt="footer_logo" className="footer-logo"/>
        </Box>
        </FooterLayout>
        <FooterLayout className="Mobilefooter MobileCopyRight" background="light-3" pad="medium" justify="center" align="center">
          <p className="copyRight">©Appplatform, Inc All Rights Reserved</p>
          <Box direction="row" gap="small" className="Icon">
          <a target="_blank" rel="noreferrer noopener" href="https://facebook.com/ai.tinytingel/"><Facebook size="medium"/></a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/tinytingel/"><Instagram size="medium"/></a>
          <a target="_blank" rel="noreferrer noopener" href="https://twitter.com/tinytingel"><Twitter size="medium"/></a>
          <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCZA1B4QdPgG0WI3OigXWmdw"><Youtube size="medium"/></a>
          </Box>
          
        </FooterLayout>
        </>
    )
}

export default Footer;


const footerStyle = {
    justifyContent: 'center',
    alignItems: 'center'
  }
