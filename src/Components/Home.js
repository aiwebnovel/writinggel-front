import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "./Layout";
import {
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  ResponsiveContext,
} from "grommet";
import ScrollToTop from "../routes/ScrollToTop";

import LinkObject from "./app/LinkObject";
import "../styles/Main.scss";
import TagManager from 'react-gtm-module';

const Home = () => {

  const check = sessionStorage.getItem('token');
  const size = useContext(ResponsiveContext);
  const history = useHistory();

  const FreeUse = () => {
    if(check !== null) {
      history.push('/app/firstsentence');
    } else {
      history.push('/login');
    }
   
  }


  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/',
        pageTitle: '홈',
      },
    });

  },[])


  return (
      <Layout>
      <ScrollToTop/>
        <Box justify='center' align='center' className='MainHome'>
          <Grid
            columns={size !== "small" ? { count: 4, size: "auto" } : "100%"}
            gap='medium'
            fill={size !== "small" ? false : true}
          >
            <Card background='#372874' height='small' onClick={FreeUse} style={{cursor:"pointer", color:'#fff'}}> 
              <CardBody className='cardTitle' justify='center'>
                <p>인공지능 글쓰기</p>
                <p>무료체험 해보기</p>
                <p>(15회)</p>
              </CardBody>
            </Card>
            {LinkObject.map((item) => (
              <Link to={item.detail || "/"} key={item.id}>
                <Card background='#f9f9f9' height='small' style={{cursor:"pointer"}}>
                  <CardHeader className='cardTop'>
                    {/* <Magic color='#fff' /> */}
                  </CardHeader>
                  <CardBody className='cardTitle' justify='center'>
                    {item.title}
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>
        </Box>
      </Layout>

  );
};

export default Home;
