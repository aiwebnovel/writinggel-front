import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Box, Spinner, Text } from "grommet";


const Loading = () => {

  return (
        <Box fill justify='center' align='center' className='SmallLodingBox'>
          <div>
          <Spinner />
          <Text>Loading...</Text>
          </div>
        </Box>

  );
};

export default Loading;

