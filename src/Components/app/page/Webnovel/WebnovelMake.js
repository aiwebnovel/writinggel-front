import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useLocation , useHistory} from "react-router-dom";
import ServiceLayout from "../../Layout";
import * as configUrl from '../../../../config';

import { Box } from "grommet";
import Synopsis from "./Synopsis";
import NovelIntro from "./NovelIntro";
import NovelFollow from "./NovelFollow";
import styled from "styled-components";
import ScrollToTop from "../../../../routes/ScrollToTop";

import { toast } from "react-toastify";

const WebnovelMake = () => {

const location = useLocation();
const History = useHistory();
const firstIndex = location.state.index;
// const isBill = location.state.isBill;
// const count = location.state.count;


console.log(location);
const [count, SetCount] = useState("");
const [isBill, SetBill] = useState("");

const [index, setIndex] = useState(firstIndex);
 const onActive = (nextIndex) => setIndex(nextIndex);

  const TabList = {
      0: <Synopsis isBill={isBill} count={count}/>,
      1: <NovelIntro isBill={isBill} count={count} onActive={onActive}/>,
      2: <NovelFollow isBill={isBill} count={count} />,
  }


  useEffect(() => {
    const loginCheck = sessionStorage.getItem("token");

    if (loginCheck !== null || index !== undefined) {
      
        axios
        .get(`${configUrl.SERVER_URL}/profile`, {
          headers: { authentication: sessionStorage.getItem("token") },
        })
        .then((res) => {
         // console.log(res)
          let count = res.data.membership_count;
          SetCount(count);
          SetBill(res.data.isBill);
        });
     
    } else {
      History.push("/service/webnovel");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, [History]);

  return (
    <ServiceLayout>
    <ScrollToTop />
    <Box className='ServiceContainer' align='center' background='#f9f9f9' style={{paddingTop: '60px'}}>
        <Tabs>
            <button className={ index === 0 ? 'active'  : 'TabBtn'} 
           onClick={()=> onActive(0)}
            >
                <div>
                    <span>줄거리 쓰기</span>
                </div>
            </button>
            <button className={ index === 1 ? 'active'  : 'TabBtn'} 
            onClick={() => onActive(1)}
            >
                <div>
                    <span></span>도입부 쓰기
                </div>
            </button>
            <button className={ index === 2 ? 'active'  : 'TabBtn'} 
            onClick={()=> onActive(2)}
            >
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
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin:0;

    padding-right : 10px;
    border-bottom : 1px solid #444;
`

const TabContent = styled(Box)`
    background-color : #fff;

`