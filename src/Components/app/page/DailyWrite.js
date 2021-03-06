import { Box, Grid, ResponsiveContext } from "grommet";
import {Cycle, Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from '../../../routes/ScrollToTop';

import ServiceLayout from "../Layout";
import styled from "styled-components";
import Modal from "../../Modal";
import SmallModal from '../../SmallModal';
import * as configUrl from "../../../config";
import TagManager from 'react-gtm-module';
import axios from "axios";

const Dailywrite = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [isOpen, SetOpen] = useState(false);
  const [CountModal, SetCountModal] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [OutputContent, SetOutputContent] = useState(["", ""]);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const HandleSmallModals = () => {
    SetCountModal(!CountModal);
  };

  const DailywriteAxios = async () => {
    if (count === 0 && isBill === false) {
      SetOpen(false);
      SetCountModal(true);
     
    } else {
    SetOutputContent(["", ""]);
    SetOpen(true);
    SetLoading(true);
    const config = {
      method: "post",
      url: `${configUrl.SERVER_URL}/writinggel/lifequestion`,
      headers: { authentication: sessionStorage.getItem("token") },
    };

    await axios(config)
      .then(async (response) => {
        console.log('response', response.data)
        if(response.data[0] === ''){
          toast.error('결과물에 유해한 내용이 들어가 버렸어요. 😭  `재시도 해주세요!');
      
      }else {
        SetOutputContent(response.data);
      }
        
      })
      .catch(async (error) => {
        console.log(error);
        if (error.response.status === 403) {
          toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
            icon: "⚠️",
            progressStyle: { backgroundColor: "#7D4CDB" },
          });
          SetOpen(false);
        }
        if (error.response.status === 412) {
          toast.error("새로고침 혹은 재로그인 해주세요!");
          SetOpen(false);
        }
        if (error.response.status === 429) {
          toast.error("요청이 너무 많습니다! 잠시 후에 다시 시도해주세요!");
          SetOpen(false);
        }
        if (error.response.status === 500) {
          toast.error("새로고침 혹은 다시 로그인 해주세요! 같은 메세지가 반복될 시 메일로 문의해주세요!");
          SetOpen(false);
        }
      }).finally(()=>{
        SetLoading(false);
      });
    }
  };

  const SaveContent = async() => {
    
    if(OutputContent){
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: sessionStorage.getItem("token") },
        data: {
          story: OutputContent[0],
          category:'일상 기록 질문',
        }
      };

      await axios(config)
        .then(async (response) => {
         
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);
          if(error.response.status === 403) {
            toast.error('보관함이 꽉 찼습니다!');
          }

          if (error.response.status === 500) {
            toast.error("여러 번 시도 후에도 똑같은 오류가 뜰 시, 해당 에러는 관리자에게 문의해주세요!");
          }
        });
      }else {
        toast.info('저장할 결과가 없습니다!');  
      }


  }

  useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/app/dailywrite',
        pageTitle: '일상기록 질문',
      },
    });

  },[])


  useEffect(() => {
    const loginCheck = sessionStorage.getItem("token");
    const provider = sessionStorage.getItem('provider');

    if (loginCheck !== null) {
    
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
      History.push("/service/dailywrite");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <>
      <ServiceLayout>
      <ScrollToTop/>
        <Box
          className='DailyContainerVh'
          background='#f9f9f9'
          justify='center'
          align='center'
          gap='large'
        >
          <Grid
            columns={
              size !== "small"
                ? { count: 4, size: "auto" }
                : { count: 2, size: "auto" }
            }
            gap='medium'
            // fill={size !== "small" ? false : true}
          >
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
            <Card>
              <img src='/logo.png' alt='로고' />
            </Card>
          </Grid>

          <DailyBtn
            onClick={() => {
              DailywriteAxios();
            }}
          >
            일상기록 질문 카드뽑기
          </DailyBtn>
        </Box>
      </ServiceLayout>
      <Modal open={isOpen} close={HandleModals}>
        {isLoading ? (
          <LoadingCard>
            <img src='/lantern.png' alt='카우치' />
            <p>Now Loading...</p>
          </LoadingCard>
        ) : (
          <ResultCard>
            <div className='cardImg'>
              <img src='/logo.png' alt='로고' />
            </div>
            <div>{OutputContent[0]}</div>
            <hr style={{ margin: "20px 0" }} />
            <div> {OutputContent[1]}</div>
            <div className='DailyiconBox'>
           <Cycle onClick={DailywriteAxios}/> <Download onClick={SaveContent}/>
            </div>
          </ResultCard>
        )}
      </Modal>
      <SmallModal onClick={HandleSmallModals} open={CountModal} close={HandleModals}>
        <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleSmallModals}>취소</button>
          <Link to='/signIn'><button>멤버십 가입하기</button></Link>
        </div>
        
      </SmallModal>
    </>
  );
};

export default Dailywrite;

const LoadingCard = styled.div`
  text-align: center;
  animation-name: bounce;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  font-family: 'NeoDunggeunmo';
  padding: 20px;

  >img {
      width: 200px;

      @media screen and (max-width: 768px) {
        width: 150px;
      }
  }

  >p {
      margin-top: 15px
  }

  @keyframes bounce {
    0% {
        transform: translateY(0px)
    }

    40% {
        transform: translateY(-40px);
    }

    100% {
        transform: translateY(0px);
    }
}
`;

const Card = styled.div`
  border: 1px solid #444;
  background-color: #fff;
  width: 150px;
  display: flex;
  //justify-content: center;
  //align-items: center;
  padding: 20px 8px;

  > img {
    width: 100%;
  }

  @media screen and (max-width: 300px) {
    width: 100px;
  }
`;

const DailyBtn = styled.button`
  background-color: #3b2477;
  color: #fff;
  width: 200px;
  font-size: 1rem;
  padding: 10px 15px;
  border: 1px solid #3b2477;
  cursor: pointer;
`;

const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: keep-all;


  > div {
    width: 100%;
    max-width: 500px;
    text-align: center;
  }

  .cardImg {
    text-align: center;
    margin-bottom: 10px;

    > img {
      width: 120px;
    }
  }
`;
