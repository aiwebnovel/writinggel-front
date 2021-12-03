import {
  Box,
  Grid,
  ResponsiveContext,
  Card,
  CardBody,
  CardHeader,
} from "grommet";
import { Download } from "grommet-icons";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from '../../../routes/ScrollToTop';


import ServiceLayout from "../Layout";
import * as configUrl from "../../../config";
import Loading from "../../Loading";

import styled from "styled-components";
import axios from "axios";

const Businessitem = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [input, SetInput] = useState("");
  const [OutputContent, SetOutputContent] = useState(["", "", ""]);

  const BusinessitemAxios = async () => {
 
    if (input && input !== "") {
      SetLoading(true);
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/writinggel/businessitem`,
        headers: { authentication: localStorage.getItem("token") },
        data: { story: input },
      };

      await axios(config)
        .then(async (response) => {
          console.log(response.data);

          if (response.data[0] === "") {
            toast.error(
              "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
            );
          } else {
            SetOutputContent(response.data[0]);
           
          }
        })
        .catch(async (error) => {
          console.log(error); 
          if (error.response.status === 403) {
            toast.info("무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!", {
              icon: "⚠️",
              progressStyle: { backgroundColor: "#7D4CDB" },
            });
          }

          
          
        }).finally(()=>{
          SetLoading(false);
        });
    } else {

      setTimeout(toast.info("내용을 채워주세요!"), 300);
    }
  };

  const SaveContent = async (output) => {
    if (output) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: localStorage.getItem("token") },
        data: {
          story: output,
          category: "비즈니스 아이템",
        },
      };

      await axios(config)
        .then(async (response) => {
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("보관함이 꽉 찼습니다!");
          }

          if (error.response.status === 500) {
            toast.error("해당 에러는 관리자에게 문의해주세요!");
          }
        });
    } else {
      toast.info("저장할 결과가 없습니다!");
    }
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/service/businessitem");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, []);

  return (
    <ServiceLayout>
       <ScrollToTop/>
      {isLoading && <Loading />}
      <Box
        className='BuisContainerVh'
        justify='center'
        align='center'
        background='#f9f9f9'
        gap='large'
      >
        <Box
          direction={size !== "small" ? "row" : "column"}
          justify='center'
          align={size !== "small" ? "end" : "center"}
          className='itemInputBox'
          gap='medium'
        >
          <div className='busiItem'>
            <p>
              사업 주제<span style={{ color: "red" }}>*</span>
            </p>
            <input
              type='text'
              placeholder='사업 주제를 적어주세요! ex) 마스크 불편 해결, 비대면 요가 등'
              onChange={(e) => {
                SetInput(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              BusinessitemAxios();
            }}
          >
            사업 아이템 찾기
          </button>
        </Box>
        <Box fill={size !== "small" ? false : true}>
          <Grid
            gap='medium'
            columns={size !== "small" ? { count: 3, size: "auto" } : "100%"}
          >
            <Cards>
              <CardHeader className='SerCardHead'>아이템 1</CardHeader>
              <CardBody className='SerCardBody'>{OutputContent[0]}</CardBody>
              <div className='SerCardFoot'>
                <Download
                  onClick={() => {
                    let output = OutputContent[0];
                    SaveContent(output);
                  }}
                />
              </div>
            </Cards>
            <Cards>
              <CardHeader className='SerCardHead'>아이템 2</CardHeader>
              <CardBody className='SerCardBody'>{OutputContent[1]}</CardBody>
              <div className='SerCardFoot'>
                <Download
                  onClick={() => {
                    let output = OutputContent[1];
                    SaveContent(output);
                  }}
                />
              </div>
            </Cards>
            <Cards>
              <CardHeader className='SerCardHead'>아이템 3</CardHeader>
              <CardBody className='SerCardBody'>{OutputContent[2]}</CardBody>
              <div className='SerCardFoot'>
                <Download
                  onClick={() => {
                    let output = OutputContent[2];
                    SaveContent(output);
                  }}
                />
              </div>
            </Cards>
          </Grid>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default Businessitem;

const Cards = styled(Card)`
  background-color: "#fff";
  border-radius: 0;
  width: 230px;
  min-height: 180px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
