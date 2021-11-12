import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, ResponsiveContext } from "grommet";
import {Cube} from 'grommet-icons'

import * as config from "../../../config";
import { authService } from "../../../firebaseConfig";

import styled from "styled-components";

const TingBox = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isSave, SetSave] = useState("");

  const [profile, SetProfile] = useState({
    isBill: false,
    userName: "",
    plan: "",
    uid: "",
    email: "",
    create: "",
  });

  const { isBill, userName, plan, uid, email, create } = profile;

  const signOut = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userUid");
    await localStorage.removeItem("plan");
    await localStorage.removeItem("isBill");
    await localStorage.removeItem("create");

    await authService.signOut();
    window.location.reload();
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const create = localStorage.getItem("create");

    if (loginCheck !== null) {
      axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: loginCheck },
        })
        .then((response) => {
          // console.log(response.data);
          let data = response.data;
          SetProfile({
            ...profile,
            isBill: data.isBill,
            userName: data.name,
            plan: data.plan,
            uid: data.uid,
            email: email,
            create: create,
          });
          // console.log(isBill, userName,plan,uid,email)
        });
    } else {
      History.replace("/");
    }
  }, []);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box fill background='#3b2477' color='#fff' className='MypageHeader'>
          <h2>팅젤 보관함</h2>
        </Box>
        <Box fill className='tingContainer' >
          {isSave ? (
            <Box>서비스 종류 나올 곳</Box>
          ) : (
            <Box fill className='tingContent' justify='center' align='center'>
              <div>
                <img src='couch.png' alt='없음' />
                <p>보관된 내용이 없습니다!</p>
              </div>
             <Link to='/'><button>서비스 이용하러 가기</button></Link>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default TingBox;
