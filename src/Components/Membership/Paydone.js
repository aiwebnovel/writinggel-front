import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../Layout";
import { Box } from "grommet";

import * as configUrl from "../../config";

const PayDone = () => {

  const History = useHistory();



  const requestProfile = async() => {
    let user = await sessionStorage.getItem("token");

    if (user !== null) {
      axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: user },
        })
        .then((response) => {
          //console.log(response)
          // sessionStorage.setItem("userUid", response.data.uid);
          // sessionStorage.setItem("plan", response.data.plan);
          
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  useEffect(()=>{
    requestProfile();
  },[])


  return (
    <Layout>
      <Box justify='center' align='center' className='DoneContainer'>
        <Box className="DoneBox">
          <div className="DoneText">
          <h2>멤버십 가입이 완료되었습니다!</h2>
          <h3>결제 내역은 마이 페이지에서 확인하실 수 있습니다.</h3>
          </div>
          <div className='DoneButton'>
            <button><Link to='/mypage'>마이 페이지</Link></button>
            <button><Link to='/'>서비스 이용하기</Link></button>
          </div>
        </Box>
      </Box>
    </Layout>
  );
};

export default PayDone;
