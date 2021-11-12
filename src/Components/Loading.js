import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "grommet";


const Loading = () => {

  return (
        <Box fill justify='center' align='center' className='lodingBox'>
          <div>
          <img src='/couch.png' alt='카우치' />
          <p>Now Loading...</p>
          </div>
        </Box>

  );
};

export default Loading;

