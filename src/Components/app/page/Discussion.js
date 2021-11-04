import { Box } from "grommet";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";

const Discussion = () => {
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
      <Box className="ServiceContainer" justify='center' align='center' background="#f9f9f9">
        <Box>
          찬반 논거
        </Box> 
      </Box>
    </ServiceLayout>
  );
};

export default Discussion;
