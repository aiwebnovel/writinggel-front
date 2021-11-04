import {
  Box,
  Grid,
  ResponsiveContext,
  Card,
  CardBody,
  CardHeader,
} from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";

const Businessitem = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

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
      <Box
        className='ServiceContainer'
        justify='center'
        align='center'
        background='#f9f9f9'
        pad='large'
        gap="large"
      >
        <Box
          direction='row-responsive'
          justify='center'
          align='center'
          className='itemInputBox'
        >
          <div className='busiItem'>
            <p>
              사업 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input type='text' placeholder='사업 주제를 적어주세요!' />
          </div>
          <button>사업 아이템 찾기</button>
        </Box>
        <Box  fill={size !== "small" ? false : true}>
          <Grid
            gap='medium'
            columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
          >
            <Card style={{backgroundColor:'#fff', borderRadius:0}}>
              <CardHeader className='SerCardHead'>아이템</CardHeader>
              <CardBody className='SerCardBody'>결과가 들어갈 거에요</CardBody>
              <div className='SerCardFoot'>
                <Download />
              </div>
            </Card>
            <Card style={{backgroundColor:'#fff', borderRadius:0}}>
              <CardHeader className='SerCardHead'>아이템</CardHeader>
              <CardBody className='SerCardBody'>결과가 들어갈 거에요</CardBody>
              <div className='SerCardFoot'>
                <Download />
              </div>
            </Card>
            <Card style={{backgroundColor:'#fff', borderRadius:0}}>
              <CardHeader className='SerCardHead'>아이템</CardHeader>
              <CardBody className='SerCardBody'>결과가 들어갈 거에요</CardBody>
              <div className='SerCardFoot'>
                <Download />
              </div>
            </Card>
          </Grid>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Businessitem;
