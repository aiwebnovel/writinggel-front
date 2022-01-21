import { Box } from "grommet";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";

const Newscontent = () => {
  const History = useHistory();



  return (
    <ServiceLayout>
      <Box className="ServiceContainer" justify='center' align='center' background="#f9f9f9">
        <Box>
          Comming Soon!
        </Box> 
      </Box>
    </ServiceLayout>
  );
};

export default Newscontent;
