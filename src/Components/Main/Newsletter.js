import React, {  useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout";
import { Box } from "grommet";
import ReactGA from "react-ga";
import TagManager from 'react-gtm-module';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import styled from "styled-components";

const NewsLetter = () => {
  ////const size = useContext(ResponsiveContext);
  const [isChecked, SetChecked] = useState(false);
  const [Email, SetEmail] = useState("");
  const [Name, SetName] = useState("");
  const [isEmail, SetIsEmail] = useState(false);
  const [ValiMessage, SetMessage] = useState("");

  console.log(isEmail);

  const HandleCheck = () => {
    SetChecked(!isChecked);
  };

  const HandleSubs = async (e) => {
    e.preventDefault();
    ReactGA.event({
      category: "button",
      action: "뉴스레터 구독",
      label: "newsletter",
    });

    // if(isEmail !== '' && Name !==''){
    if (isChecked) {
      //console.log('email',Email)
      const config = {
        method: "post",
        url: `https://veryshort.best:5051/api/v1/newsletter?email=${Email}&name=${Name}`,
        headers: { authentication: sessionStorage.getItem("token") },
      };

      await axios(config)
        .then((response) => {
          //console.log(response);
          toast.success("구독 신청이 완료 되었습니다!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("이메일 체크 및 개인정보 수집 및 이용에 동의해주세요");
    }
    // }else {
    //   toast.error('폼을 채워주세요!');
    // }
  };

  const ValidateEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const Valiemail = e.target.value;
    SetEmail(Valiemail);
    // console.log(email);
    // console.log(emailRegex.test(email));

    if (!emailRegex.test(Valiemail)) {
      SetMessage("올바른 이메일 형식이 아닙니다.😭");
      SetIsEmail(false);
    } else {
      SetMessage("올바른 이메일 형식이에요!👍");
      SetEmail(Valiemail);
      SetIsEmail(true);
    }
  };

  useEffect(() => {
    ReactGA.initialize("UA-212875619-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/newsletter',
        pageTitle: 'newsletter',
      },
    });

  },[])

  return (
    <Layout>
      <Box fill justify='center' align='center' className="BoxContainer">
        <div className='LetterHeader'>
          <h3>라이팅젤이 격주 1회 뉴스레터를 보내드립니다.</h3>
          <h4>인공지능 글쓰기 트렌드, 인공지능이 창작한 글,</h4>
          <h4>라이팅젤 주요 소식, 사용 방법 등을 알려 드립니다.</h4>
        </div>

        <Box fill justify='center' align='center' className="LetterBox">
          <div className='tingLetterImg'>
            <div className='speech'>
              <h2>팅젤이가 여러분에게</h2>
              <h2>뉴스레터를 가져다줄 거에요!</h2>
            </div>
            <img src='/tingLetter.png' alt='팅젤이'/>
          </div>
          <div className='FormInputs'>
            <input
              type='text'
              placeholder='이름 혹은 닉네임'
              value={Name}
              onChange={(e) => {
                SetName(e.target.value);
              }}
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div className='FormInputs'>
            <input
              type='text'
              placeholder='이메일'
              onChange={ValidateEmail}
              onFocus={ValidateEmail}
            />
            <p className={isEmail ? "correct" : "incorrect"}>{ValiMessage}</p>
          </div>
          <div className='CheckSubs'>
            <label>
              <input
                onClick={HandleCheck}
                type='checkbox'
                className='checkStyle'
              />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <button
              onClick={(e) => HandleSubs(e)}
              type='submit'
              disabled={!isEmail && !Name}
              className={isEmail && Name ? "subsBtn " : "error"}
            >
              {isEmail && Name
                ? "라이팅젤 레터 신청하기"
                : "빈 칸을 채워주세요!"}
            </button>
          </div>
          <Box fill justify='center' align='center' className='PrevLetter'>
          <div >
            <a target="_blank" rel="noreferrer" href='https://page.stibee.com/archives/149676'>
              지난 레터 보러가기
            </a>
          </div>
        </Box>
        </Box>


      </Box>
    </Layout>
  );
};

export default NewsLetter;
