import React from "react";
import ScrollToTop from "../../../routes/ScrollToTop";
import ServiceLayout from "../Layout";

import { Box } from "grommet";

const RelayNovel = () => {
  return (
    <ServiceLayout>
      <ScrollToTop />
      <Box className='ServiceContainer' background='#f9f9f9' align='center'
      style={{padding : '120px 30px', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}
      >
        <div className='RelayContainer'>
          <div>
            <h2>❗️ 기본 설정을 세팅해주세요.</h2>
          </div>
          <Box align='center' gap='large' style={{padding : '36px 20px'}}>
            <div className='RelayStyle'>
              <div className='RelayPanelStyle'>
                <h4>주요 인물</h4>
                <div className='RelayInput'>
                  <input
                    required
                    type='text'
                    name='mainCharacter'
                    //   value={category.mainCharacter}
                    //   onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
              <div className='RelayPanelStyle'>
                <h4>시간</h4>
                <div className='RelayInput'>
                  <input
                    required
                    type='text'
                    name='period'
                    //   value={category.period}
                    //   onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
              <div className='RelayPanelStyle'>
                <h4>장소</h4>
                <div className='RelayInput'>
                  <input
                    required
                    type='text'
                    name='location'
                    //   value={category.location}
                    //   onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
              <div className='RelayPanelStyle'>
                <h4>주제</h4>
                <div className='RelayInput'>
                  <input
                    required
                    type='text'
                    name='theme'
                    //   value={category.theme}
                    //   onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
              <div className='RelayPanelStyle'>
                <h4>주요 사건</h4>
                <div className='RelayInput'>
                  <input
                    required
                    type='text'
                    name='mainEvent'
                    //   value={category.mainEvent}
                    //   onChange={(e) => HandleInput(e)}
                  />
                </div>
              </div>
              <div className='writeBtn'>
                <button>기본 설정 완료</button>
              </div>
            </div>
          </Box>
        </div>
      </Box>
    </ServiceLayout>
  );
};

export default RelayNovel;
