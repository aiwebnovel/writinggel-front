import React, {useContext} from 'react'
import Header from './Header'
import Footer from './Footer'
import { ResponsiveContext } from "grommet";

import styled from 'styled-components'

const Layout = ({children}) => {

    const size = useContext(ResponsiveContext);

    return(
        <>
        <Header sizes={size}/>
            <Main sizes={size}>
              {children}
            </Main>
        <Footer sizes={size}/>
        </>
    )
}

export default Layout;

const Main = styled.div`
    background-color : #f9f9f9;
    height: 100vh;
`