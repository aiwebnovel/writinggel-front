import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { Box, Grid, ResponsiveContext } from "grommet";
import { Close, Add, Download, Update } from "grommet-icons";
import { OuterClick } from "react-outer-click";
import Loading from "../../../Loading";
import * as configUrl from "../../../../config";

import styled from "styled-components";
import { toast } from "react-toastify";
import Modal from "../../../SmallModal";

const Synopsis = ({ isBill, count }) => {
  const size = useContext(ResponsiveContext);
  const loginCheck = sessionStorage.getItem("token");

  const [isOpen, setOpen] = useState(false);
  const [isSider, SetSider] = useState(true);
  const [options, setOptions] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [Input, setInput] = useState({
    Main_character: "",
    Place: "",
    Time: "",
    Main_Events: "",
    Theme: "",
  });
  const [output, setOutput] = useState({
    outputKr: "",
    outputEng: "",
  });

  const { Main_character, Place, Time, Main_Events, Theme } = Input;
  const { outputKr, outputEng } = output;

  const onSelect = (e) => {
    setOptions(e.target.value);
    //console.log(e.target.value);
  };

  const handleSider = () => {
    SetSider(!isSider);
  };

  const HandleInput = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
    //console.log(e.target.value);
  };

  const HandleModals = () => {
    setOpen(!isOpen);
  }

  const MakeSynp = async () => {
    if (count === 0 && isBill === false) {
      setOpen(true);
    } else {
      if (
        options !== "" &&
        Main_character !== "" &&
        Place !== "" &&
        Time !== "" &&
        Main_Events !== "" &&
        Theme !== ""
      ) {
        setLoading(true);
        console.log(Main_character, Place, Time, Main_Events, Theme )
        const config = {
          method: "post",
          url: `${configUrl.SERVER_URL}/writinggel/novelpackage`,
          headers: { authentication: loginCheck },
          data: {
            option: "summary",
            Theme: Theme,
            Main_character: Main_character,
            Genre: options,
            Place: Place,
            Main_event: Main_Events,
            Period: Time,
            StoryFollow: "",
          },
        };

        await axios(config)
          .then(async (response) => {
            console.log(response);
            const data = response.data;
            
            if (data[0] === "") {
              toast.error(
                "???????????? ???????????? ???????????? ?????? ??? ????????????.???? ????????? ????????????!"
              );
              setLoading(false);
            } else {
              setOutput({
                ...output,
                outputKr: data[0],
                outputEng : data[1]
              })
              setLoading(false);
            }


            if (response.data[2] >= 2) {
              toast.error(`???????????? ????????? ????????? ????????? ????????????. ???? `);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              setLoading(false);
              toast.info(
                "?????? ????????? ???????????????. ????????? ????????? ?????? ???????????? ???????????? ??? ?????????!",
                {
                  icon: "??????",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                }
              );
            }
            if (error.response.status === 500) {
              setLoading(false);
              toast.info(
                "?????? ??? ???????????? ????????? ????????? ????????? ??? ???, ?????? ????????? ??????????????? ?????? ????????????.",
                {
                  icon: "??????",
                  progressStyle: { backgroundColor: "#7D4CDB" },
                }
              );
            }
            setLoading(false);
          });
      } else {
        toast.error("??? ?????? ???????????????!");
      }
    }
  };

  const ResetData = () => {
    setOptions("");
    setInput({
      ...Input,
      Main_character: "",
      Place: "",
      Time: "",
      Main_Events: "",
      Theme: "",
    });
    setOutput({
      ...output,
      outputKr: "",
      outputEng: "",
    });
  };

  const SaveContent = async () => {
    //console.log(outputKorean);
    if (outputKr) {
      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/archive`,
        headers: { authentication: loginCheck },
        data: {
          story: outputKr,
          category: "????????? ????????? ??????",
        },
      };

      await axios(config)
        .then(async (response) => {
          //console.log('???????', response.data)
          toast.success(`${response.data.log}`);
        })
        .catch(async (error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (error.response.status === 403) {
            toast.error("???????????? ??? ????????????!");
          }

          if (error.response.status === 500) {
            toast.error("?????? ??? ?????? ????????? ????????? ????????? ??? ???, ?????? ????????? ??????????????? ??????????????????.");
          }
        });
    } else {
      toast.info("????????? ????????? ????????????!");
    }
  };

  return (
    <>
      {isLoading && <Loading />}
    
      <Grid
        
        rows={size !== "small" ? ["auto", "flex"] : ["auto", "auto"]}
        columns={size !== "small" ? ["auto", "flex"] : ["auto"]}
        areas={
          size !== "small"
            ? [
                { name: "sidebar", start: [0, 0], end: [0, 1] },
                { name: "main", start: [1, 0], end: [1, 1] },
              ]
            : [
                { name: "sidebar", start: [0, 0], end: [0, 0] },
                { name: "main", start: [0, 1], end: [0, 1] },
              ]
        }
      >
        {isSider ? (
          <Box gridArea='sidebar' className='TabSideContainer'>
            {size === "small" && (
              <SiderBtn onClick={handleSider}>
                <Close />
              </SiderBtn>
            )}
            <Box align='center' gap='large'>
              <div className='TabAcoStyle'>
                <select
                  defaultValue='default'
                  className='WebnovelSelect'
                  onChange={onSelect}
                >
                  <option value='default' disabled>
                    ????????? ??????????????????! ???
                  </option>
                  <option value='?????????'>?????????</option>
                  <option value='??????'>?????? ?????????</option>
                  <option value='??????'>??????</option>
                  <option value='????????????'>????????????</option>
                  <option value='??????'>????????? ?????????</option>
                </select>
                <div className='TabAcoPanelStyle'>
                  <h4>?????? ??????</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='Main_character'
                      value={Main_character}
                      onChange={HandleInput}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>??????</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='Time'
                      value={Time}
                      onChange={HandleInput}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>??????</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='Place'
                      value={Place}
                      onChange={HandleInput}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>??????</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='Theme'
                      value={Theme}
                      onChange={HandleInput}
                    />
                  </div>
                </div>
                <div className='TabAcoPanelStyle'>
                  <h4>?????? ??????</h4>
                  <div className='TabAcoInput'>
                    <input
                      required
                      type='text'
                      name='Main_Events'
                      value={Main_Events}
                      onChange={HandleInput}
                    />
                  </div>
                </div>
                <SynopBtn>
                  <button onClick={MakeSynp}>????????? ??????</button>
                </SynopBtn>
              </div>
            </Box>
          </Box>
        ) : (
          <Box gridArea='sidebar' className='TabSiderFalse'>
            <div className='TabSiderBtn' onClick={handleSider}>
              <Add size='small' />
              <span>??????</span>
            </div>
          </Box>
        )}
        <Box gridArea='main' className='TabmainBox' >
          <div className='TabOutputBox'>
            <textarea
              className='output1'
              placeholder='???????????? ?????? ????????? ?????????????????????!'
              readOnly
              value={outputKr}
            ></textarea>
            <textarea
              className='output2'
              placeholder='????????? ????????? ???????????????!'
              value={outputEng}
              readOnly
            ></textarea>
          </div>

          <Icons>
            <Download onClick={SaveContent} />
            <Update
            onClick={MakeSynp}
            />
            <Close onClick={ResetData} />
          </Icons>
        </Box>
      </Grid>
      <Modal onClick={HandleModals} open={isOpen} close={HandleModals}>
      <div className='MembershipCountText'>
          <p>?????? ????????? ???????????????.</p>
          <p>????????? ????????? ?????? ???????????? ??? ????????????.</p>
        </div>
        <div className='MembershipCountBtns'>
          <button onClick={HandleModals}>??????</button>
          <Link to='/signIn'>
            <button>????????? ????????????</button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default Synopsis;

const SynopBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;

  > button {
    padding: 8px 15px;
    border: 1px solid #444;
    background-color: #ff9300;
    color : #444;
    font-size : 1rem;
    outline: 0;
    width: 180px;
    text-align: center;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
      font-weight: 600;
    }
  }
`;
const SiderBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 10px;
  cursor: pointer;
  color: #444;

  font-weight: 600;
`;

const Icons = styled.div`
  padding: 10px 0;

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
