import {
    Box,
    Grid,
    ResponsiveContext,
  } from "grommet";
  import  { Download, Update} from 'grommet-icons';
  import React, { useEffect, useContext, useState } from "react";
  import { useHistory, useParams, Link } from "react-router-dom";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import MBTI from './MBTI'
  
  import ServiceLayout from "../Layout";
  import styled from "styled-components";
  
  const LoveLetter = ({location}) => {
  
    const size = useContext(ResponsiveContext);
    const History = useHistory();
    let { result } = useParams();
    console.log('result', result);
    console.log('location', location);
  
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
        <Box
          justify='center'
          align='center'
          className='ServiceContainer'
          background='#f9f9f9'
          pad='large'
        >
            <div className='ResultBox'>
                <div className='ResultHeader'>
                    <div >Love Letter for <b>{result}</b></div>
                    <Link to="/app/loveletter">
                        <button>MBTI 다시 선택하기</button>
                    </Link>
                </div>
                <div className="ResultContent">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                <hr style={{textAlign:"left", margin:"20px 0"}}/>
                 It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    <div className="iconBox"><Download /></div>
                </div>
            </div>
            <div className="ResultIcon"><Update/></div>
        </Box>
      </ServiceLayout>
    );
  };
  
  export default LoveLetter;
  
