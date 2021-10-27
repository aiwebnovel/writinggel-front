import React, {useContext} from "react";
import Layout from "./Layout";
import { Box, Grid, Card, CardBody, CardHeader, ResponsiveContext } from "grommet";
import { Magic} from "grommet-icons";
import "../styles/Main.scss";

const Home = () => {
    
    const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <Box 
      justify="center"
      align="center"
      className="MainHome"
      >
        <Grid
          columns={ size !== "small" ? { count: 4, size: "auto" } : '100%'}
          gap='medium'
          fill={size !== 'small' ? false : true}
        >
          <Card background='#f9f9f9'>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>웹소설 창작</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>블로그 쓰기</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>동화창작</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>뉴스레터 콘텐츠 기획</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>영어 시 쓰기</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>비지니스 아이디어</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>연애편지 쓰기</CardBody>
          </Card>
          <Card>
            <CardHeader className='cardTop'>
              <Magic color='#fff' />
            </CardHeader>
            <CardBody className='cardTitle'>첫문장 자판기</CardBody>
          </Card>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
