import { Box, ResponsiveContext } from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from '../../../routes/ScrollToTop';
import Modal from "../../SmallModal";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import * as configUrl from "../../../config";
import Loading from "../../Loading";
import TagManager from 'react-gtm-module';
import axios from "axios";

const Discussion = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [count, SetCount] = useState("");
  const [isBill, SetBill] = useState("");
  const [isLoading, SetLoading] = useState(false);
  const [input, SetInput] = useState("");
  const [OutputContent, SetOutputContent] = useState({
    ProsOutput: "",
    ConsOutput: "",
  });

  const [isOpen, SetOpen] = useState(false);

  const HandleModals = () => {
    SetOpen(!isOpen);
  };

  const { ProsOutput, ConsOutput } = OutputContent;

  const SaveContent = async (options) => {
    //console.log(options)

    if (OutputContent) {
      if (options === "Pros") {
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/archive`,
          headers: { authentication: sessionStorage.getItem("token") },
          data: {
            story: ProsOutput[0],
            category: "찬반 논거 토론",
          },
        };

        await axios(config)
          .then(async (response) => {
            toast.success(`${response.data.log}`);
          })
          .catch(async (error) => {
            console.log(error);
            SetLoading(false);
            if (error.response.status === 403) {
              toast.error("보관함이 꽉 찼습니다!");
            }

            if (error.response.status === 500) {
              toast.error("여러 번 시도 후에도 똑같은 오류가 뜰 시, 해당 에러는 관리자에게 문의해주세요!");
            }
          });
      }

      if (options === "Cons") {
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/archive`,
          headers: { authentication: sessionStorage.getItem("token") },
          data: {
            story: ConsOutput[0],
            category: "찬반 논거 토론",
          },
        };

        await axios(config)
          .then(async (response) => {
            toast.success(`${response.data.log}`);
          })
          .catch(async (error) => {
            console.log(error);
            SetLoading(false);
            if (error.response.status === 403) {
              toast.error("보관함이 꽉 찼습니다!");
            }

            if (error.response.status === 500) {
              toast.error("여러 번 시도 후에도 똑같은 오류가 뜰 시, 해당 에러는 관리자에게 문의해주세요!");
            }
          });
          
          
      }
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  const ProsDiscussionAxios = async (e) => {
    if (count === 0 && isBill === false) {
      SetOpen(true);
    } else {
    if (input && input !== "") {
     // console.log(e.target.name)
      
      let ProsOption = e.target.name;
      //console.log(ProsOption);
      SetLoading(true);
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/discussion`,
        headers: { authentication: sessionStorage.getItem("token") },
        data: { option: ProsOption, story: input },
      };

      await axios(config)
        .then(async (response) => {
          //console.log(response.data);
          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            SetOutputContent({ ...OutputContent, ProsOutput: response.data });
            SetLoading(false);
          }
        })
        .catch(async (error) => {
          console.log(error);
          SetLoading(false)
          if (error.response.status === 403) {
            toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          }
          if (error.response.status === 412) {
            toast.error("새로고침 혹은 재로그인 해주세요!");
          }
          if (error.response.status === 429) {
            toast.error("요청이 너무 많습니다! 잠시 후에 다시 시도해주세요!");
          }
          if (error.response.status === 500) {
            toast.error("새로고침 혹은 다시 로그인 해주세요! 같은 메세지가 반복될 시 메일로 문의해주세요!");
          }
        });
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  }
  };

  const ConsDiscussionAxios = async (e) => {
    //console.log(e.target.name)
    if (count === 0 && isBill === false) {
      SetOpen(true);
    } else {
    if (input && input !== "") {
      //console.log(e.target.name)
  
      let ConsOption= e.target.name;
      //console.log(ConsOption);
      SetLoading(true);
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/discussion`,
        headers: { authentication: sessionStorage.getItem("token") },
        data: { option: ConsOption, story: input },
      };

      await axios(config)
        .then(async (response) => {
          //console.log(response.data);
          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
            );
            SetLoading(false);
          } else {
            SetOutputContent({ ...OutputContent, ConsOutput: response.data });
            SetLoading(false);
          }
        })
        .catch(async (error) => {
          console.log(error);
          SetLoading(false);
          if (error.response.status === 403) {
            toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          }
         if (error.response.status === 412) {
            toast.error("새로고침 혹은 재로그인 해주세요!");
          }
          if (error.response.status === 429) {
            toast.error("요청이 너무 많습니다! 잠시 후에 다시 시도해주세요!");
          }
          if (error.response.status === 500) {
            toast.error("새로고침 혹은 다시 로그인 해주세요! 같은 메세지가 반복될 시 메일로 문의해주세요!");
          }
        });
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  }
  };

    useEffect(()=>{

    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: '/app/discussion',
        pageTitle: '찬반 논거',
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
      History.push("/service/discussion");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <>
    <ServiceLayout>
       <ScrollToTop/>
      {isLoading && <Loading />}
      <Box
        className='DisContainerVh'
        justify='center'
        align='center'
        background='#f9f9f9'
        gap='large'
      >
        <Box align='center' className='DiscussInputBox'>
          <div className='InputAlign'>
            <p>
              토론하고 싶은 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type='text'
              placeholder='토론 주제를 적어주세요!'
              onChange={(e) => {
                SetInput(e.target.value);
              }}
            />
          </div>
        </Box>
        <Box
          direction='row-responsive'
          justify='center'
          align='center'
          gap='medium'
          className='DiscussOutputBox'
        >
          <div className='Agree'>
            <button name='Pros' onClick={(e)=> ProsDiscussionAxios(e)}>
              찬성 논거 찾기
            </button>
            <div className='outputArea'>
              <div className="AreaBox">
                <div>
                  {/* {ProsOutput &&
                    ProsOutput[0].split("\n").map((line, index) => (
                      <span key={line !== '' ? line: index}>
                        {line}
                        <br />
                      </span>
                    ))} */}
                  
                  {ProsOutput &&
                    ProsOutput[0]}
                </div>
                <div>
                  {/* {ProsOutput &&
                    ProsOutput[1].split("\n").map((line, index) => (
                      <span key={line !== '' ? line: index}>
                        {line}
                        <br />
                      </span>
                    ))} */}
                      
                  {ProsOutput &&
                    ProsOutput[1]}
                </div>
              </div>
              <Icon>
                <Download
                  onClick={() => {
                    let options = 'Pros'
                    SaveContent(options);
                  }}
                />
              </Icon>
            </div>
          </div>
          <div className='Opposite'>
            <button name='Cons' onClick={(e)=> ConsDiscussionAxios(e)}>
              반대 논거 찾기
            </button>
            <div className='outputArea'>
              <div className="AreaBox">
                <div>
                  {/* {ConsOutput &&
                    ConsOutput[0].split("\n").map((line, index) => (
                      <span key={line !== '' ? line: index}>
                        {line}
                        <br />
                      </span>
                    ))} */}
                      
                  {ConsOutput &&
                    ConsOutput[0]}
                </div>
                <div>
                  {/* {ConsOutput &&
                    ConsOutput[1].split("\n").map((line, index) => (
                      <span key={line !== '' ? line : index}>
                        {line}
                        <br />
                      </span>
                    ))} */}
                      {ConsOutput &&
                    ConsOutput[1]}
                </div>
              </div>
              <Icon>
                <Download onClick={()=> {
                  let options = 'Cons'
                  SaveContent(options)}} />
              </Icon>
            </div>
          </div>
        </Box>
      </Box>
    </ServiceLayout>
    <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleModals}>취소</button>
          <Link to='/signIn'><button>멤버십 가입하기</button></Link>
        </div>
        
      </Modal>
    </>
  );
};

export default Discussion;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;
