import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, ResponsiveContext } from "grommet";

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
      <Box 
        justify='center' 
        align='center' 
        className='BoxContainer'
      >
        <Box 
          fill 
          background='#3b2477' 
          color='#fff' 
          className='MypageHeader'
        >
          <h2>팅젤 보관함</h2>
        </Box>
        <Box 
          fill 
          className='tingContainer' 
          justify='center' 
          align='center'
        >
          {!isSave ? (
            <Box fill className='tingContent'>
              <div className='ListTitle'>
                <h3>최근 저장된 콘텐츠</h3>
              </div>
              {/* SaveList -> map으로 돌려야 */}
              <Box
                fill
                className='SaveList'
                direction={size !== "small" ? "row" : "column"}
              >
                <Box
                  direction={size !== "small" ? "column" : "row"}
                  align='center'
               
                  className='titleAbutton'
                >
                  <h3>웹소설</h3>
                  <div>
                    <button>복사</button>
                    <button style={{ backgroundColor: '#FF635C',border: '1px solid #FF635C', color:'#fff'}}>삭제</button>
                  </div>
                </Box>
                <Grid
                  fill
                  columns={
                    size !== "small" ? { count: 2, size: "small" } : "100%"
                  }
                  gap='medium'
                >
                  <div>
                    디즈니코리아는 보다 많은 소비자들이 편리하고 다양한 방법으로
                    디즈니+를 즐길 수 있도록 국내 파트너사와의 협업에도 박차를
                    가하고 있다. LG유플러스와 IPTV 및 모바일 제휴, KT와는 모바일
                    제휴를 진행하며 통신사 이용자들은 신규 요금제를 통해
                    디즈니+를 이용할 수 있다. 또한 SC제일은행과 현대카드 등
                    파트너사와 함께 다양한 소비자 프로모션도 실시한다.
                  </div>
                  <div>
                    Sed accumsan mi in lacus ultricies accumsan. Morbi mollis
                    volutpat tortor vel tempor. Pellentesque varius egestas
                    tellus et euismod. Suspendisse potenti. Phasellus tempus sem
                    eu enim feugiat elementum. Vestibulum in elementum neque.
                    Sed pulvinar dui lorem, vitae ullamcorper mauris iaculis et.
                  </div>
                </Grid>
              </Box>
              <Box
                fill
                className='SaveList'
                direction={size !== "small" ? "row" : "column"}
              >
                <Box
                  direction={size !== "small" ? "column" : "row"}
                  align='center'
                  className='titleAbutton'
                >
                  <h3>블로그</h3>
                  <div>
                    <button>복사</button>
                    <button style={{ backgroundColor: '#FF635C',border: '1px solid #FF635C', color:'#fff'}}>삭제</button>
                  </div>
                </Box>
                <Grid
                  fill
                  columns={
                    size !== "small" ? { count: 2, size: "small" } : "100%"
                  }
                  gap='medium'
                >
                  <div>
                    제목 2. 소개(배경) 3. 모뎀 대 네트워크(내 필요에 가장 적합한
                    모뎀/네트워크, 둘 사이의 차이점은 무엇입니까?) 4. 휴대폰
                    선택(네트워크 사업자별 휴대폰 리뷰) 5.결론
                  </div>
                  <div>
                    Title 2. Introduction (background) 3. Modem vs Network (what
                    modem/network is best for my needs, what are the differences
                    between the two?) 4. Cell phone choices (review of phones by
                    network provider) 5. Conclusion
                  </div>
                </Grid>
              </Box>
            </Box>
          ) : (
            <Box fill className='tingNoContent' justify='center' align='center'>
              <div>
                <img src='couch.png' alt='없음' />
                <p>보관된 내용이 없습니다!</p>
              </div>
              <Link to='/'>
                <button>서비스 이용하러 가기</button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default TingBox;
