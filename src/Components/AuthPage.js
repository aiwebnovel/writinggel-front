import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "./SmallLoading";
import * as configUrl from "../config";

const AuthPage = () => {
  //const { Kakao } = window;
  const History = useHistory();

  useEffect(() => {
    const { Kakao } = window;
    const search = new URL(window.location.href);
    const code = search.searchParams.get("code");
    // sessionStorage.setItem("search", search);
    // sessionStorage.setItem("code", code);
    const redirectUri = 'https://0f86-183-98-33-132.ngrok.io/oauth'
   
    //console.log(redirectUri);

    if (code !== undefined) {
      //console.log(`authorizeCodeFromKakao : ${code}`);

      const body = {
        grant_type: "authorization_code",
        client_id: "cc67916adadf130f20e79f6d4a622909",
        redirect_uri: redirectUri,
        code: code,
      };

      const queryStringBody = Object.keys(body)
        .map((k) => encodeURIComponent(k) + "=" + encodeURI(body[k]))
        .join("&");

      //console.log(queryStringBody);
      fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: queryStringBody,
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          const access = data.access_token;
          //const authToken = 'Bearer ' + access
          sessionStorage.setItem("token", access);
          await Kakao.Auth.setAccessToken(access);

          const config = {
            method: "get",
            url: `${configUrl.SERVER_URL}/signup`,
            headers: {
              authentication: access,
              provider: "kakao",
            },
          };

          await axios(config)
            .then(async (res) => {
              console.log(res);
              sessionStorage.setItem("token", access);
     
              await Kakao.API.request({
                      url: "/v2/user/me",
                      success: (response) => {
                        //console.log(response);
                        //let id = response.id;
                        let email = response.kakao_account.email;
                        let profile = response.kakao_account.profile;
            
                        let nickname = response.properties.nickname;
                        let photoURL = profile.thumbnail_image_url;
                        
                      
                        sessionStorage.setItem("email", email);
                        sessionStorage.setItem("create", response.connected_at);
                        sessionStorage.setItem("provider", 'kakao');
                        sessionStorage.setItem("userName", nickname);
                        sessionStorage.setItem("userImage", photoURL);
                        History.push("/welcome");
                      },
                      fail: (error)=> {
                        console.log(error);
                      },
              });
            })
            .catch((error) => {
              if (error.response.status === 403) {
                Kakao.API.request({
                  url: "/v2/user/me",
                  success: (response) => {
                    console.log(response);
                    //let id = response.id;
                    let email = response.kakao_account.email;
                    let profile = response.kakao_account.profile;

                    let nickname = response.properties.nickname;
                    let photoURL = profile.thumbnail_image_url;

                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("create", response.connected_at);
                    sessionStorage.setItem("provider", "kakao");
                    sessionStorage.setItem("userName", nickname);
                    sessionStorage.setItem("userImage", photoURL);
                    History.push("/");
                  },
                  fail: (error) => {
                    console.log(error);
                  },
                });
              }
            });
        });
    } else {
      console.log("No AuthorizeCodeFromKakao");
    }
  }, []);
  return <Loading />;
};

export default AuthPage;
