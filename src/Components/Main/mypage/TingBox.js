import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Layout from "../../Layout";

import { Box, ResponsiveContext } from "grommet";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import * as configUrl from "../../../config";
import { Save } from "grommet-icons";

const TingBox = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [SaveData, SetData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });

  const [Copied, SetCopy] = useState(false);

  const onCopied = () => {
    if (SaveData[0] === "") {
      toast.warn("복사할 내용이 없어요!😭");
    } else {
      SetCopy(true);
      toast.success("Copied!");
    }
  };

  const DeleteSave = async (e) => {
    console.log(e.target.value);
    let uid = e.target.value;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const config = {
        method: "delete",
        url: `${configUrl.SERVER_URL}/archive/${uid}`,
        headers: { authentication: localStorage.getItem("token") },
        data: { uid: uid },
      };

      await axios(config)
        .then(async (response) => {
          console.log(response.data);
          await window.location.reload();
        })
        .catch(async (error) => {
          console.log(error);
        });
    } else {
      toast.info("삭제 되지 않았습니다!");
    }
  };

  // get
  const load = useCallback(async () => {
    const config = {
      method: "get",
      url: `${configUrl.SERVER_URL}/archive`,
      headers: { authentication: localStorage.getItem("token") },
    };

    await axios(config)
      .then(async (response) => {
        //console.log("성공?", response.data);

        await SetData({
          ...SaveData,
          0: response.data[0],
          1: response.data[1],
          2: response.data[2],
          3: response.data[3],
          4: response.data[4],
          5: response.data[5],
          6: response.data[6],
          7: response.data[7],
          8: response.data[8],
          9: response.data[9],
        });
        //await console.log("성공", SaveData);
      })
      .catch(async (error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.push("/");
      setTimeout(toast.info("로그인을 해주세요!"), 300);
    }
  }, [History]);

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <Box justify='center' align='center' className='BoxContainer'>
        <Box fill background='#3b2477' color='#fff' className='MypageHeader'>
          <h2>팅젤 보관함</h2>
        </Box>
        <Box fill className='tingContainer' justify='center' align='center'>
          {SaveData[0] !== undefined ? (
            <Box fill className='tingContent'>
              <div className='ListTitle'>
                <h3>최근 저장된 콘텐츠</h3>
              </div>
              {/* 저장 리스트 */}
              {SaveData[0] !== undefined && (
                <SaveList fill direction={size !== "small" ? "row" : "column"}>
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[0].category}</h3>
                    <div>
                      <CopyToClipboard
                        text={SaveData[0].content}
                        onCopy={onCopied}
                      >
                        <button>복사</button>
                      </CopyToClipboard>
                      <button
                        onClick={(e) => DeleteSave(e)}
                        value={SaveData[0].uid}
                        style={deleteStyle}
                      >
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className='SaveContent'>{SaveData[0].content}</div>
                </SaveList>
              )}
              {SaveData[1] !== undefined && (
                <SaveList fill direction={size !== "small" ? "row" : "column"}>
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[1].category}</h3>
                    <div>
                      <CopyToClipboard
                        text={SaveData[1].content}
                        onCopy={onCopied}
                      >
                        <button>복사</button>
                      </CopyToClipboard>
                      <button
                        onClick={(e) => DeleteSave(e)}
                        value={SaveData[1].uid}
                        style={deleteStyle}
                      >
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className='SaveContent'>{SaveData[1].content}</div>
                </SaveList>
              )}
              {SaveData[2] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[2].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[2].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[2].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[2].content}</div>
                </SaveList>
              )}
              {SaveData[3] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[3].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[3].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[3].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[3].content}</div>
                </SaveList>
              )}
              {SaveData[4] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[4].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[4].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[4].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[4].content}</div>
                </SaveList>
              )}
              {SaveData[5] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[5].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[5].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[5].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[5].content}</div>
                </SaveList>
              )}
              {SaveData[6] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[6].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[6].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[6].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[6].content}</div>
                </SaveList>
              )}
              {SaveData[7] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[7].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[7].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[7].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[7].content}</div>
                </SaveList>
              )}
              {SaveData[8] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[8].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[8].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[8].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[8].content}</div>
                </SaveList>
              )}
              {SaveData[9] !== undefined && (
                <SaveList
                  fill
                  direction={size !== "small" ? "row" : "column"}
                >
                  <Box
                    direction={size !== "small" ? "column" : "row"}
                    align='center'
                    className='titleAbutton'
                  >
                    <h3>{SaveData[9].category}</h3>
                    <div>
                    <CopyToClipboard 
                      text={SaveData[9].content}
                      onCopy={onCopied}
                      >
                      <button>복사</button>
                      </CopyToClipboard>
                      <button onClick={(e)=>DeleteSave(e)} value={SaveData[9].uid} style={deleteStyle}>
                        삭제
                      </button>
                    </div>
                  </Box>
                  <div className="SaveContent">{SaveData[9].content}</div>
                </SaveList>
              )}
            </Box>
          ) : (
            <Box fill className='tingNoContent' justify='center' align='center'>
              <div>
                <img src='couch.png' alt='없음' />
                <p>보관된 내용이 없습니다!</p>
              </div>
              <Link to='/'>
                <button>서비스 이용하러 가기</button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default TingBox;

const SaveList = styled(Box)`
  padding: 35px 20px;
  gap: 5px;

  @media screen and (max-width: 768px) {
    border-top: 1px solid $dark-1;
    gap: 10px;
  }
`;

const deleteStyle = {
  backgroundColor: "#FF635C",
  border: "1px solid #FF635C",
  color: "#fff",
};
