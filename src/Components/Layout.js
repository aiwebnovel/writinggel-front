import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ResponsiveContext, grommet, Grommet } from "grommet";
import styled from "styled-components";

const Layout = ({ children }) => {
    
    const sizeProps = useContext(ResponsiveContext)

  return (
    <Grommet theme={grommet}>
      <Header size={sizeProps} />
      <Main size={sizeProps}>{children}</Main>
      <Footer size={sizeProps} />
    </Grommet>
  );
};

export default Layout;

const Main = styled.div`
  //background-color : #f9f9f9;
  //height: 100vh;
`;
