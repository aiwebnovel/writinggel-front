import { Box,ResponsiveContext } from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServiceLayout from "../Layout";
import styled from "styled-components";
import * as configUrl from "../../../config";
import Loading from "../../Loading";

import axios from 'axios'

const Discussion = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [input, SetInput] = useState('');
  const [OutputContent, SetOutputContent] = useState({
    ProsOutput:'',
    ConsOutput:''
  })
  const [option, SetOutputOption] = useState('')


  const { ProsOutput, ConsOutput} = OutputContent

  const SaveContent = async() => {
    //console.log(OutputContent)
    
    if(OutputContent){
      if(option === 'Pros'){
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/archive`,
          headers: { authentication: localStorage.getItem("token") },
          data: {
            story: ProsOutput,
            category:'찬반 논거',
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
              toast.error("해당 에러는 관리자에게 문의해주세요!");
            }
          });
        }

        if(option=== 'Cons') {
          const config = {
            method: "post",
            url: `${configUrl.SERVER_URL}/archive`,
            headers: { authentication: localStorage.getItem("token") },
            data: {
              story: ConsOutput,
              category:'찬반 논거',
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
                toast.error("해당 에러는 관리자에게 문의해주세요!");
              }
            });
        }



      }else {
        toast.info('저장할 결과가 없습니다!');  
      }

     


  }

    const ProsDiscussionAxios = async () => {

    if (input && input !== '') {
      SetOutputOption('Pros'); 
      SetLoading(true)
      const config = {
        method: 'post',
        url: `${configUrl.SERVER_URL}/writinggel/discussion`,
        headers: { 'authentication': localStorage.getItem("token"), },
        data : { option:option, story:input }
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
          SetOutputContent({...OutputContent,
            ProsOutput: response.data[0]
          });
          SetLoading(false)
        }
      })
      .catch(async (error) => {
        console.log(error);
      });
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  };


  const ConsDiscussionAxios = async (e) => {
    //console.log(e.target.name)
    
    if (input && input !== '') {
      SetOutputOption('Cons'); 
      SetLoading(true)
      const config = {
        method: 'post',
        url: `${configUrl.SERVER_URL}/writinggel/discussion`,
        headers: { 'authentication': localStorage.getItem("token"), },
        data : { option:option, story:input }
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
          SetOutputContent({...OutputContent,
            ConsOutput: response.data[0]
            });
           
            SetLoading(false)
        }
       
      })
      .catch(async (error) => {
        console.log(error);
      });
    } else {
      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  };


  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/service/discussion");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);


  return (
    <ServiceLayout>
       {isLoading && <Loading />}
      <Box
        className='DisContainer'
        justify='center'
        align='center'
        background='#f9f9f9'
        pad='large'
        gap="large"
      >
        <Box 
        align='center' className='DiscussInputBox'>
          <div className="InputAlign">
            <p>
              토론하고 싶은 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input type='text' placeholder='토론 주제를 적어주세요!' onChange={(e)=>{SetInput(e.target.value)}}/>
          </div>
        </Box>
        <Box direction='row-responsive' justify='center' align='center' gap='medium' className='DiscussOutputBox'>
          <div className="Agree">
            <button name='Pros' onClick = {()=> ProsDiscussionAxios()}>찬성 논거 찾기</button>
            <div className="outputArea">
              <div>{ProsOutput.split('\n').map((line)=>(
                  <span key={line}>{line}<br/></span>
              ))}</div>
              <Icon>
                <Download onClick={()=> {
                  SetOutputOption('Pros')
                  SaveContent()}}/>
              </Icon>
            </div>
          </div>
          <div className="Opposite">
            <button name='Cons' onClick = {(e)=> ConsDiscussionAxios(e)}>반대 논거 찾기</button>
            <div  className="outputArea">
            <div>{ConsOutput.split('\n').map((line)=>(
                  <span key={line}>{line}<br/></span>
              ))}</div>
              <Icon>
                <Download onClick={SaveContent}/>
              </Icon>
            </div>
          </div>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Discussion;

const Icon = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
cursor: pointer;
`