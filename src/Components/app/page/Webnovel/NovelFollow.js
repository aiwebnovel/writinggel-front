import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, ResponsiveContext } from "grommet";
import { Download, Copy, Close } from "grommet-icons";
import CopyToClipboard from "react-copy-to-clipboard";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";
import styled from "styled-components";

import * as configUrl from "../../../../config";
import Loading from "../../../Loading";
import Modal from "../../../SmallModal";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  FollowSelectOption,
  FollowSettingState,
  outputFollowState,
} from "../../../../Recoils";

const NovelFollow = ({ isBill, count }) => {
  const size = useContext(ResponsiveContext);
  const loginCheck = sessionStorage.getItem("token");

  //도입부와 공유하는 state
  const output = useRecoilValue(outputFollowState);
  const category = useRecoilValue(FollowSettingState);
  const options = useRecoilValue(FollowSelectOption);

  const setOutput = useSetRecoilState(outputFollowState);
  const setCategory = useSetRecoilState(FollowSettingState);
  const setOption = useSetRecoilState(FollowSelectOption);

  const [isOpen, setOpen] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [CountModal, SetCountModal] = useState(false);
  const [Copied, SetCopy] = useState(false);
  const [follow, setFollow] = useState({
    followKr: "",
    followEng: "",
    followLength: 0,
    followtempLength: 0,
  });

  const { outputKr, outputEng, outputLength, tempLength } = output;
  const { Main_character, Place, Time, Main_Events, Theme } = category;
  const { followKr, followEng, followLength, followtempLength } = follow;

  const HandleSmallModals = () => {
    SetCountModal(!CountModal);
  };

  const HandleModals = () => {
    setOpen(!isOpen);
  };

  const onCopied = () => {
    if (outputKr === "" && followKr === "") {
      toast.warn("복사할 내용이 없어요!😭");
    } else {
      SetCopy(true);
      toast.success("Copied!");
    }
  };

  const ResetData = () => {
    setOutput({
      ...output,
      outputKr: "",
      outputEng: "",
      outputLength: 0,
      tempLength: 0,
    });
    setCategory({
      ...category,
      Main_character: "",
      Place: "",
      Time: "",
      Main_Events: "",
      Theme: "",
    });
    setFollow({
      ...follow,
      followKr: "",
      followEng: "",
      followLength: 0,
      followtempLength: 0,
    })
    setOption("");
    setOpen(false);
  };

  //recoil로 가져온 state가 ""일 때, 아닐 때 비교해서 진행해야.
  //recoil_state !== null -> 도입부에서 이어쓰기로 들어왔을 때
  //recoil_state === null -> 맨 처음 화면에서 이어쓰기로 바로 들어왔을 때 (recoil인 state 말고 이 컴포넌트 안에 있는 state로 진행해야.)

  //recoil !null -> 도입부에서 이어쓰기로 -> recoil로 계속 진행. (분기1)
  //recoil null , follow state null(분기2) -> 이어쓰기 바로
  //recoil null, follow state !null(분기3) -> 이어쓰기 바로 / follow 이어쓰기

  const MakeFollow = async () => {
    console.log("follow");

    if (loginCheck !== null) {
      if (count === 0 && isBill === false) {
        SetCountModal(true);
      } else {
        if (outputKr !== "") {
          console.log("recoil state");
          let story = outputKr;

          setOutput({
            ...output,
            outputKr: story,
            tempLength: ((outputKr.length - outputLength) * 100) / 100,
          });

          if (tempLength < 30) {
            toast.error(`${30 - tempLength}자를 더 입력해주세요!😭`);
            return;
          } else if (story === " " || story === "" || story === "undefined") {
            toast.error(`내용을 입력해 주세요!`);
            return;
          }
          const date = new Date();
          let time = sessionStorage.getItem("time");
          if (time !== undefined && time !== null && time !== "") {
            const timeD = -(Date.parse(time) - date.getTime());
            //console.log(timeD);
            if (timeD < 6500) {
              toast.error(
                `${7 - Math.ceil(timeD / 1000)}초 이후에 다시 시도해 주세요`
              );
              return;
            }
          }
          sessionStorage.setItem("time", date);
          const config = {
            method: "post",
            url: `${configUrl.SERVER_URL}/writinggel/novelpackage`,
            headers: { authentication: loginCheck },
            data: {
              option: "follow",
              Theme: Theme,
              Main_character: Main_character,
              Genre: options,
              Place: Place,
              Main_event: Main_Events,
              Period: Time,
              StoryFollow: outputKr,
            },
          };
          SetLoading(true);
          await axios(config)
            .then(async (response) => {
              console.log(response);
              if (response.data[0] === "") {
                toast.error(
                  "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
                );
              } else {
                setOutput({
                  ...output,
                  outputLength: outputKr.length + response.data[0].length,
                  outputKr: outputKr + response.data[0],
                  outputEng: outputEng + response.data[1],
                  tempLength: 0,
                });
              }

              if (response.data[2] >= 2) {
                toast.error(`결과물에 유해한 내용이 들어가 버렸어요. 😭 `);
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 403) {
                toast.info(
                  "무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!",
                  {
                    icon: "⚠️",
                    progressStyle: { backgroundColor: "#7D4CDB" },
                  }
                );
              }
              if (error.response.status === 412) {
                toast.info(`로그인이 필요합니다!`, {
                  icon: "🙅‍♀️",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                });
                sessionStorage.removeItem("token");
              } else {
                if (
                  //error.response.status === 403 &&
                  error.response.data.errorCode === "001"
                ) {
                  toast.error(`이야기의 길이가 너무 길어요ㅠ`);
                } else {
                  setOutput({
                    ...output,
                    result:
                      "여러 번 새로고침 후에도 똑같은 오류가 뜰 시,해당 오류는 관리자에게 문의해주세요!",
                  });
                }
              }
            })
            .finally(() => {
              SetLoading(false);
            });
        } else {
          console.log("follow state");
          let story = followKr;

          setFollow({
            ...followKr,
            followKr: story,
            followtempLength: ((followKr.length - followLength) * 100) / 100,
          });

          if (followtempLength < 30) {
            toast.error(`${30 - followtempLength}자를 더 입력해주세요!😭`);
            return;
          } else if (story === " " || story === "" || story === "undefined") {
            toast.error(`내용을 입력해 주세요!`);
            return;
          }
          const date = new Date();
          let time = sessionStorage.getItem("time");
          if (time !== undefined && time !== null && time !== "") {
            const timeD = -(Date.parse(time) - date.getTime());
            //console.log(timeD);
            if (timeD < 6500) {
              toast.error(
                `${7 - Math.ceil(timeD / 1000)}초 이후에 다시 시도해 주세요`
              );
              return;
            }
          }
          sessionStorage.setItem("time", date);
          const config = {
            method: "post",
            url: `${configUrl.SERVER_URL}/writinggel/novelpackage`,
            headers: { authentication: loginCheck },
            data: {
              option: "follow",
              Theme: "",
              Main_character: "",
              Genre: "",
              Place: "",
              Main_event: "",
              Period: "",
              StoryFollow: followKr,
            },
          };
          SetLoading(true);
          await axios(config)
            .then(async (response) => {
              console.log(response);
              if (response.data[0] === "") {
                toast.error(
                  "적어주신 키워드가 적절하지 않은 것 같습니다.😭 재시도 해주세요!"
                );
              } else {
                setFollow({
                  ...follow,
                  followLength: followKr.length + response.data[0].length,
                  followKr: followKr + response.data[0],
                  followEng: followEng + response.data[1],
                  followtempLength: 0,
                });
              }

              if (response.data[2] >= 2) {
                toast.error(`결과물에 유해한 내용이 들어가 버렸어요. 😭 `);
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 403) {
                toast.info(
                  "무료 사용이 끝났습니다. 멤버십 가입을 통해 서비스를 이용하실 수 있어요!",
                  {
                    icon: "⚠️",
                    progressStyle: { backgroundColor: "#7D4CDB" },
                  }
                );
              }
              if (error.response.status === 412) {
                toast.info(`로그인이 필요합니다!`, {
                  icon: "🙅‍♀️",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                });
                sessionStorage.removeItem("token");
              } else {
                if (
                  //error.response.status === 403 &&
                  error.response.data.errorCode === "001"
                ) {
                  toast.error(`이야기의 길이가 너무 길어요ㅠ`);
                } else {
                  setOutput({
                    ...output,
                    result:
                      "여러 번 새로고침 후에도 똑같은 오류가 뜰 시, 해당 오류는 관리자에게 문의해주세요!",
                  });
                }
              }
            })
            .finally(() => {
              SetLoading(false);
            });
        }
      }
    } else {
      toast.info("로그인 후 다시 시도해 주세요!", {
        icon: "🙅‍♀️",
        progressStyle: { backgroundColor: "#7D4CDB" },
      });
    }
  };

  const handleChange = (e) => {
    if (outputKr !== "") {
      setOutput({
        ...output,
        outputKr: e.target.value,
        tempLength: ((outputKr.length - outputLength) * 100) / 100,
      });
    } else {
      setFollow({
        ...follow,
        followKr: e.target.value,
        followtempLength: ((followKr.length - followLength) * 100) / 100,
      });
    }
    //console.log(e.target.value)
  };

  const SaveContent = async () => {
    if (outputKr === "" && followKr === "") {
      toast.info("저장할 결과가 없습니다!");
    } else {
      if (outputKr !== "") {
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/archive`,
          headers: { authentication: loginCheck },
          data: {
            story: outputKr,
            category: "웹소설 이어쓰기",
          },
        };

        await axios(config)
          .then(async (response) => {
            //console.log('성공?', response.data)
            toast.success(`${response.data.log}`);
          })
          .catch(async (error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (error.response.status === 403) {
              toast.error("보관함이 꽉 찼습니다!");
            }

            if (error.response.status === 500) {
              toast.error(
                "여러 번 시도 후에도 똑같은 오류가 뜰 시, 해당 에러는 관리자에게 문의해주세요."
              );
            }
          });
      }

      if (followKr !== "") {
        console.log("365", followKr, "352", outputKr);
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/archive`,
          headers: { authentication: loginCheck },
          data: {
            story: followKr,
            category: "웹소설 줄거리 쓰기",
          },
        };

        await axios(config)
          .then(async (response) => {
            //console.log('성공?', response.data)
            toast.success(`${response.data.log}`);
          })
          .catch(async (error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (error.response.status === 403) {
              toast.error("보관함이 꽉 찼습니다!");
            }

            if (error.response.status === 500) {
              toast.error(
                "여러 번 시도 후에도 똑같은 오류가 뜰 시,  문의해주세요."
              );
            }
          });
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Box justify='center' align='center' className='NovelFollowMainBox'>
        <Box
          fill
          justify={size !== "small" ? "center" : "start"}
          align='center'
          className='NovelFollowWrap'
        >
          <div className='NovelFollowProgressBox'>
            <h4>웹소설 이어쓰기</h4>
            <div>
              <ProgressBar
                completed={outputKr !== "" ? tempLength : followtempLength}
                bgColor='#372874'
                width={size !== "small" ? "250px" : "200px"}
                height='8px'
                isLabelVisible={false}
                maxCompleted={30}
              />
              <button onClick={MakeFollow}>글쓰기</button>
            </div>
          </div>
          <div className='mainOutputBox'>
            <textarea
              className='NovelFollowKo'
              placeholder='이야기의 처음 부분을 작성해보세요.(20자 내외)
            팅젤이 이야기의 뒤를 이어줄 거에요.'
              value={outputKr !== "" ? outputKr : followKr}
              onChange={handleChange}
            />
            <textarea
              className='NovelFollowEn'
              placeholder='영어가 들어갈 예정입니다!'
              value={outputEng !== "" ? outputEng : followEng}
              readOnly
            >
              {outputEng}
            </textarea>
          </div>

          <Icons>
            <Close onClick={HandleModals} />
            <CopyToClipboard
              text={outputKr !== "" ? outputKr : followKr}
              onCopy={onCopied}
            >
              <Copy style={{ cursor: "pointer" }} />
            </CopyToClipboard>
            <Download onClick={SaveContent} />
          </Icons>
        </Box>
      </Box>
      <Modal
        onClick={HandleSmallModals}
        open={CountModal}
        close={HandleSmallModals}
      >
        <div className='MembershipCountText'>
          <p>무료 사용이 끝났습니다.</p>
          <p>멤버십 가입을 통해 이용하실 수 있습니다.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleSmallModals}>취소</button>
          <Link to='/signIn'>
            <button>멤버십 가입하기</button>
          </Link>
        </div>
      </Modal>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
        <div>
          <div style={{ textAlign: "center", wordBreak: "keep-all" }}>
            <p>확인을 누르면 결과가 모두 사라집니다.</p>
            <p>진행 하시겠습니까?</p>
          </div>
          <Btns>
            <CancelBtn onClick={HandleModals}>취소</CancelBtn>
            <ConfirmBtn onClick={ResetData}>확인</ConfirmBtn>
          </Btns>
        </div>
      </Modal>
    </>
  );
};

export default NovelFollow;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  > svg {
    background-color: #444;
    fill: #fff;
    stroke: #fff;
    padding: 2px;
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
`;

const CancelBtn = styled.button`
  background-color: #f45752;
  border: 1px solid #f45752;
  padding: 5px 10px;
  font-size: 1rem;
  width: 100px;
  cursor: pointer;
  color: #fff;
`;

const ConfirmBtn = styled.button`
  background-color: #ffce1f;
  border: 1px solid #ffce1f;
  padding: 5px 10px;
  font-size: 1rem;
  width: 100px;
  cursor: pointer;
  color: #444;
`;
