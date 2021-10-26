import React, {useContext} from 'react'
import Header from './Header'
import Footer from './Footer'
import { ResponsiveContext } from "grommet";

import styled from 'styled-components'

const Home = () => {

    const size = useContext(ResponsiveContext);

    return(
        <>
        <Header sizes={size}/>
            <Main>
               main
            </Main>
        <Footer sizes={size}/>
        </>
    )
}

export default Home;

const Main = styled.div`
    background-color : #f9f9f9;
    height: 100vh;
`