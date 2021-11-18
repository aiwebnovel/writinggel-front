import { Box, Grid, ResponsiveContext } from "grommet";

import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MBTI from "./MBTI";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Loading from "../../Loading";

const LoveLetter = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [UserMbti, SetUser] = useState('');
  const [isLoading, SetLoading] = useState(false);

  const HandleUserMbti = (user) => {
    if(user){
      SetUser(user);
    }else {
      console.log('유저를 선택해주세요!');
    }

  }

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <ServiceLayout>
       {isLoading && <Loading />}
      <Box
        justify='center'
        align='center'
        className='MbtiContainerVh'
        background='#f9f9f9'
        gap='medium'
      >
        {!UserMbti && (
          <>
        <MainTitle>🌟 당신의 MBTI를 선택해주세요.</MainTitle>
        <Grid
          columns={size !== "small" ? { count: 4, size: "auto" } : '100%'}
          gap='medium'
          fill={size !== "small" ? false : true}
        >
          {MBTI.map((mbti) => (
              <Card
                key={`user${mbti.content}`}
                className='MbtiCard1'
                onClick={()=>{
                  let user = mbti.content;
                  HandleUserMbti(user);
                }}
              >
                {mbti.content}
              </Card>
          ))}
        </Grid>
        </>)}
        {UserMbti && (
          <>
        <MainTitle>💌 연애편지를 받을 사람의 MBTI를 선택하세요.</MainTitle>
        <Grid
          columns={size !== "small" ? { count: 4, size: "auto" } :'100%'}
          gap='medium'
          fill={size !== "small" ? false : true}
        >
          {MBTI.map((mbti) => (
            <Link
              to={{
                pathname: `loveletter/${mbti.link}`,
                state: {
                  lover: mbti.content,
                  user: UserMbti
                },
              }}
            >
              <Card
                key={mbti.content}
                className='MbtiCard2'
                onClick={() => console.log("console", mbti.link)}
              >
                {mbti.content}
              </Card>
            </Link>
          ))}
        </Grid>
        </>)}
      </Box>
    </ServiceLayout>
  );
};

export default LoveLetter;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  padding: 30px 0;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #444;
  width: 200px;
  padding: 48px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

`;
