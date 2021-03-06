import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import ServiceLayout from "../../Layout";
import ScrollToTop from "../../../../routes/ScrollToTop";
import * as configUrl from "../../../../config";

import TagManager from "react-gtm-module";
import { Box, ResponsiveContext } from "grommet";
import { toast } from "react-toastify";
import styled from "styled-components";

//웹소설 창작 패키지에서 제일 먼저 나오는 화면
const WebnovelPack = () => {
  const size = useContext(ResponsiveContext);

  const History = useHistory();
  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");

  useEffect(() => {
    const loginCheck = sessionStorage.getItem("token");

    if (loginCheck !== null) {
      axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: sessionStorage.getItem("token") },
        })
        .then((res) => {
          // console.log(res)
          let count = res.data.membership_count;
          SetCount(count);
          SetBill(res.data.isBill);
        });
    } else {
      History.push("/service/webnovel");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, [History]);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/app/makenovel",
        pageTitle: "웹소설 창작 패키지",
      },
    });
  }, []);

  return (
    <ServiceLayout>
      <ScrollToTop />
      <Box
        className="ServiceContainerVh"
        background='#f9f9f9'
        align='center'
        justify='center'
      >
        <BoxContainer
          justify='center'
          align='center'
          direction={size !== "small" ? "row" : "column"}
          gap='small'
        >
          <LinkBox
            to={{
              pathname: "/app/makenovel",
              state: {
                index: 0,
              },
            }}
          >
            <div>줄거리 쓰기</div>
          </LinkBox>
          <LinkBox
            to={{
              pathname: "/app/makenovel",
              state: {
                index: 1,
              },
            }}
          >
            <div>도입부 쓰기</div>
          </LinkBox>
          <LinkBox
            to={{
              pathname: "/app/makenovel",
              state: {
                index: 2,
              },
            }}
          >
            <div>이어쓰기</div>
          </LinkBox>
        </BoxContainer>
      </Box>
    </ServiceLayout>
  );
};

export default WebnovelPack;

const BoxContainer = styled(Box)`
  width: 100%;

  @media screen and (max-width: 768px) {
    height: 100vh;
}
`;

const LinkBox = styled(Link)`
  > div {
    background-color: #372874;
    color: #fff;
    text-align: center;
    width: 200px;
    padding: 20px;
    font-size: 1.2rem;
    transition: all 300ms ease;

    &:hover {
      background-color: #b1b5e6;
      color: #444;
    }
  }
`;
