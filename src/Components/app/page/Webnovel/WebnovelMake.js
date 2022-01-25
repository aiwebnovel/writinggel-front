import React, { useState } from "react";
import ServiceLayout from "../../Layout";

import { Box } from "grommet";
import Synopsis from "./Synopsis";
import NovelIntro from "./NovelIntro";
import NovelFollow from "./NovelFollow";


const WebnovelMake = () => {
  const [index, setIndex] = useState(0);
  const onActive = (nextIndex) => setIndex(nextIndex);

  const TabList = {
      0: <Synopsis/>,
      1: <NovelIntro/>,
      2: <NovelFollow/>,
  }

  return (
    <ServiceLayout>
    <Box className='ServiceContainer' align='center' background='#f9f9f9'>
        <div>
            <button className={ index === 0 ? 'active'  : ''} onClick={()=> onActive(0)}>
                <div>
                    <span>줄거리 쓰기</span>
                </div>
            </button>
            <button className={ index === 1 ? 'active'  : ''} onClick={() => onActive(1)}>
                <div>
                    <span></span>도입부 쓰기
                </div>
            </button>
            <button className={ index === 2 ? 'active'  : ''} onClick={()=> onActive(2)}>
                <div>
                    <span>이어 쓰기</span>
                </div>
            </button>
        </div>

        <Box >
            {TabList[index]}
        </Box>


    </Box>
    </ServiceLayout>
  );
};

export default WebnovelMake;
