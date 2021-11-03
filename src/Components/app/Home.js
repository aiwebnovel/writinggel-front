import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import ServiceLayout from "./Layout";

const ServiceHome = () => {
  const History = useHistory();
  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck !== null) {
      return;
    } else {
      History.replace("/");
    }
  }, []);

  return <ServiceLayout>test</ServiceLayout>;
};

export default ServiceHome;
