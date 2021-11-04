import { Box } from "grommet";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";

const Webnovel = () => {
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
      <Box width='100%' height='100vh' justify='center' align='center'>
        <Box>
          웹노블
        </Box> 
      </Box>
    </ServiceLayout>
  );
};

export default Webnovel;
