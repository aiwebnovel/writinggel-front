import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  //const { Kakao } = window;
  const History = useHistory();

  useEffect(() => {

    const search = new URL(window.location.href);
    const token = search.searchParams.get("code");
    localStorage.setItem("search", search);
    localStorage.setItem("token", token);
    const redirectUri = 'http://localhost:3000/oauth'
    console.log(redirectUri)

    if(token !== undefined){
      console.log(`authorizeCodeFromKakao : ${token}`)
      
      const body = {
        grant_type: "authorization_code",
        client_id: 'cc67916adadf130f20e79f6d4a622909',
        redirect_uri: redirectUri,
        code: token
      }
      
      const queryStringBody = Object.keys(body)
        .map(k => encodeURIComponent(k) + "=" + encodeURI(body[k]))
        .join("&");

      console.log(queryStringBody);
      fetch("https://kauth.kakao.com/oauth/token",{
        method: "POST",
        headers: {
          'content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body : queryStringBody
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
            History.push('/')
        })
    }else{
      console.log("No AuthorizeCodeFromKakao")
    }



    // if(token){
    //     console.log(`authorizeCodeFromKakao : ${token}`)
    //     axios.post({
    //         url:'https://kauth.kakao.com/oauth/token',
    //         data:{
    //           grant_type:'authorization_code',
    //           client_id:'cc67916adadf130f20e79f6d4a622909',
    //           redirect_uri:redirectUri,
    //           code:token
    //         },
    //         success: (res) => {
    //           console.log(res)
    //           History.push("/");
    //         },
    //         fail: (err) => {
    //             console.log(err)

    //         }
    //     });

    //   }else{
    //     console.log("No AuthorizeCodeFromKakao")
    //   }
      
    // if (token) {
    //   Kakao.Auth.setAccessToken(token);
    //   History.push('/');
    //   Kakao.Auth.getStatusInfo(({ status }) => {
    //     console.log(status);
    //     if (status === "connected") {
    //       console.log(Kakao.Auth.getAccessToken());
    //       History.push("/");
    //     } else {
    //       Kakao.Auth.setAccessToken(null);
    //     }
    //   });
   // }
  }, []);
  return <div>Loading</div>;
};

export default AuthPage;
