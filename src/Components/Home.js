import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Box, Grid, ResponsiveContext } from "grommet";
import ScrollToTop from "../routes/ScrollToTop";

import LinkObject from "./app/LinkObject";
import "../styles/Main.scss";
import TagManager from "react-gtm-module";
import styled from "styled-components";
import eventThumb from './event/fighting_gel_sns_square_img.jpg'

const Home = () => {
  const check = sessionStorage.getItem("token");
  const size = useContext(ResponsiveContext);
  const history = useHistory();

  const FreeUse = () => {
    if (check !== null) {
      history.push("/app/firstsentence");
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        pagePath: "/",
        pageTitle: "홈",
      },
    });
  }, []);

  return (
    <Layout>
      <ScrollToTop />
      <div className='MainHome'>
        <Grid
          columns={size !== "small" ? "220px" : "200px"}
          gap={size !== 'small' ? 'large' : 'medium'}
          fill
        >
          <Card
            onClick={() => history.push("/fightingGel")}
          
          >
            <img src={eventThumb} alt='이벤트'/>
          </Card>
          <Card
            onClick={FreeUse}
            style={{backgroundColor: '#ffce1f'}}
            //className="freeUse"
          >
            <CardBody>
              <p>인공지능 글쓰기</p>
              <p>무료체험 해보기</p>
              <p>(15회)</p>
            </CardBody>
          </Card>
          {LinkObject.map((item) => (
             <Link to={item.detail || "/"} key={item.id}>
            <Card>
                <CardBody>
                <img src='/pencli.png' alt='cardImage' />
                 <p>{item.title}</p>
                </CardBody>
            </Card>
            </Link>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default Home;


const Card = styled.div`
  background: #f9f9f9;
  border: 1px solid #444;
  cursor: pointer;
  height: 230px;
  display:flex;
  flex-direction: column;
  justify-content: center;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const CardBody = styled.div`
  text-align: center;
  font-family: 'NeoDunggeunmo';
  word-break: keep-all;

  > img {
    width: 30px;
  }

  // @media screen and (max-width: 768px) {
  //     padding: 30px;
  //     justify-content: center;
  //     word-break: keep-all; 
  // }
`
