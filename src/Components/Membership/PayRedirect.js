import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as configUrl from "../../config";
import { toast } from "react-toastify";
import Loading from "../SmallLoading";

const PayRedirect = () => {
  const History = useHistory();
  const search = new URL(window.location.href);
  const uid = search.searchParams.get("merchant_uid");
  const [isLoading, SetLoading] = useState(false);

  const redirect = () => {
    if (uid) {
      const userUid = uid.split("_")[0];
      const plan = uid.split("_")[1];

      const config = {
        method: "post",
        url: `${configUrl.SERVER_URL}/pay/iamport`,
        headers: { authentication: sessionStorage.getItem("token") },
        data: {
          billKey: `customer_${userUid}`,
          plan: parseInt(plan),
          name: sessionStorage.getItem("userName"),
        },
      };
      SetLoading(true);
      axios(config)
        .then((res) => {
          SetLoading(false);
          History.push("/");
          //console.log(res);
          toast.success(res.data.log);
        })

        .catch((err) => {
          console.log(err, err.response.data);
          if (err.response.status === 403) {
            SetLoading(false);
            History.push("/fail");
            toast.error(err.response.data.errorDescription);
          }
          if (err.response.status === 500) {
            SetLoading(false);
            History.push("/fail");
            toast.error(err.response.data.errorDescription);
          }
        });
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  return <div>{isLoading && <Loading />}</div>;
};

export default PayRedirect;
