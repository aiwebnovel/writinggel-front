import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;

const Main = styled.div`
  //background-color : #f9f9f9;
  //height: 100vh;
`;
