import React, { useState } from "react";
import ServiceLayout from "../../Layout";

import { Box } from "grommet";
import Synopsis from "./Synopsis";
import NovelIntro from "./NovelIntro";
import NovelFollow from "./NovelFollow";
import styled from "styled-components";


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
    <Box className='ServiceContainer' align='center' background='#f9f9f9' style={{paddingTop: '60px'}}>
        <Tabs>
            <button className={ index === 0 ? 'active'  : 'TabBtn'} onClick={()=> onActive(0)}>
                <div>
                    <span>줄거리 쓰기</span>
                </div>
            </button>
            <button className={ index === 1 ? 'active'  : 'TabBtn'} onClick={() => onActive(1)}>
                <div>
                    <span></span>도입부 쓰기
                </div>
            </button>
            <button className={ index === 2 ? 'active'  : 'TabBtn'} onClick={()=> onActive(2)}>
                <div>
                    <span>이어 쓰기</span>
                </div>
            </button>
        </Tabs>

        <TabContent fill>
            {TabList[index]}
        </TabContent>


    </Box>
    </ServiceLayout>
  );
};

export default WebnovelMake;

const Tabs = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;

    padding-right : 10px;
    border-bottom : 1px solid #444;
`

const TabContent = styled(Box)`
    background-color : #fff;
`