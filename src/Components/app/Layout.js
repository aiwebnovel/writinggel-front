import React from "react";
import ServiceHeader from "./Header";
import Footer from "../Footer";

const ServiceLayout = ({ children }) => {

  return (
    <>
      <ServiceHeader />
      {children}
      <Footer />
    </>
  );
};

export default ServiceLayout;

