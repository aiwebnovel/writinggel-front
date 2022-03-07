import React, { useEffect } from "react";
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";

const Callback = () => {
  const { naver } = window;
  const History = useHistory();
  const Location = useLocation();

  useEffect(()=>{
    console.log(window.location);
    // if(!Location.hash) return;
    const token = Location.hash.split('=')[1].split('&')[0];
    sessionStorage.setItem('naver_token', token);
   // console.log(token);
    const header = "Bearer " + token;

    // History.push('/')
    if(token) {
        axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: { Authorization: header}
        })
        .then((res)=>{
            console.log(res);
            //History.push('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  },[])

  return <div>Loading</div>;
};

export default Callback;
