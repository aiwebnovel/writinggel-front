import {
    Box,
    Grid,
    ResponsiveContext,
    Accordion,
    AccordionPanel,
  } from "grommet";
  import { Update, Close, Add, Download } from "grommet-icons";
  import React, { useEffect, useContext, useState } from "react";
  import { useHistory } from "react-router-dom";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  import ServiceLayout from "../Layout";
  import styled from "styled-components";
  
  const Storysrc= () => {
    
    const size = useContext(ResponsiveContext);
    const History = useHistory();
  
    const [isSider, SetSider] = useState(false);
    const handleSider = () => {
      SetSider(!isSider);
    };
  
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
        <Box className='ServiceContainerVh' background='#f9f9f9'>
            이야기 재료
        </Box>       
      </ServiceLayout>
    );
  };
  
  export default Storysrc;
  
