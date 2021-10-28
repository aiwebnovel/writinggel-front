import React, { useState } from "react";
import Layout from "../Layout";
import { Box } from "grommet";
import  { Down, BlockQuote } from 'grommet-icons'

import styled from 'styled-components'

const FaQ = () => {
  const [isopen, setOpen] = useState(false);

  return (
    <Layout>
      <Box fill justify='center' align='center'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          pad="large"
          className='FaQHeader'>
          <h2>FAQ</h2>
        </Box>
        <Box
        fill
        justify='center'
        align='center'
        style={{padding: '48px'}}
        >
          <div className="Questions">
            라이팅젤 유저들이 많이 찾는 질문을 확인해보세요. <BlockQuote size="medium" />   
          </div>

          <Container>
            <Box 
            direction='row'
            justify='between'
            align='center'
            background="#f2f2f2f2"
            color="#444"
            className="FAQContainer"
            onClick={()=> {setOpen(!isopen)}}>
              <p>FAQ1</p>
              <Down size="medium"/>
            </Box>
            {isopen &&
            <Box
            animation='slideDown'
            className="FAQContent"
            >
              <p>A.</p>
            </Box>
            }
          </Container>
          <Container>
            <Box 
            direction='row'
            justify='between'
            align='center'
            background="#f2f2f2f2"
            color="#444"
            className="FAQContainer"
            onClick={()=> {setOpen(!isopen)}}>
              <p>FAQ2</p>
              <Down size="medium"/>
            </Box>
            {isopen &&
            <Box
            animation='slideDown'
            className="FAQContent"
            >
              <p>A.</p>
            </Box>
            }
          </Container>

          <Container>
            <Box 
            direction='row'
            justify='between'
            align='center'
            background="#f2f2f2f2"
            color="#444"
            className="FAQContainer"
            onClick={()=> {setOpen(!isopen)}}>
              <p>FAQ3</p>
              <Down size="medium"/>
            </Box>
            {isopen &&
            <Box
            animation='slideDown'
            className="FAQContent"
            >
              <p>A.</p>
            </Box>
            }
          </Container>

          <Container>
            <Box 
            direction='row'
            justify='between'
            align='center'
            background="#f2f2f2f2"
            color="#444"
            className="FAQContainer"
            onClick={()=> {setOpen(!isopen)}}>
              <p>FAQ4</p>
              <Down size="medium"/>
            </Box>
            {isopen &&
            <Box
            animation='slideDown'
            className="FAQContent"
            >
              <p>A.</p>
            </Box>
            }
          </Container>

          <Container>
            <Box 
            direction='row'
            justify='between'
            align='center'
            background="#f2f2f2f2"
            color="#444"
            className="FAQContainer"
            onClick={()=> {setOpen(!isopen)}}>
              <p>FAQ5</p>
              <Down size="medium"/>
            </Box>
            {isopen &&
            <Box
            animation='slideDown'
            className="FAQContent"
            >
              <p>A.</p>
            </Box>
            }
          </Container>
          <Container>
            <Box 
            direction='row'
            justify='between'
            align='center'
            background="#f2f2f2f2"
            color="#444"
            className="FAQContainer"
            onClick={()=> {setOpen(!isopen)}}>
              <p>FAQ6</p>
              <Down size="medium"/>
            </Box>
            {isopen &&
            <Box
            animation='slideDown'
            className="FAQContent"
            >
              <p>A.</p>
            </Box>
            }
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};

export default FaQ;


const Container = styled.div`
  width: 80%;
  margin-bottom: 20px;
`
