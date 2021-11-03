import React, {useContext, useEffect} from 'react'
import { useHistory} from 'react-router-dom';
import Layout from '../../Layout'
import { Box, ResponsiveContext } from "grommet";
import styled from 'styled-components'

const Modify = () => {

    const size = useContext(ResponsiveContext);
    // const History = useHistory();

    // useEffect(()=>{
    //     const loginCheck = localStorage.getItem('token');
    //     console.log(loginCheck);
    //     if(loginCheck === null ) {
    //         History.replace('/')
    //     }
    // })

    return(
        <Layout>
            <Box fill justify='center' align='center'>
                <Box
                fill
                background='#3b2477'
                color='#fff'
                pad="large"
                className='MypageHeader'
                >
                    <h2>회원 정보 수정</h2>
                </Box>

            </Box>
        </Layout>
    )
}

export default Modify ;