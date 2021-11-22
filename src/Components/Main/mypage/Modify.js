import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Layout from "../../Layout";
import { Box, ResponsiveContext } from "grommet";

import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../Loading";
import * as config from "../../../config";
import {authService} from "../../../firebaseConfig";
import {
  getAuth,
  updateProfile,
  updateEmail,
  deleteUser
} from "@firebase/auth";
import firebase from "@firebase/app-compat";

const Modify = () => {
  const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [Userprofile, SetProfile] = useState({
    userName: "Guest",
    userEmail: "",
    userprovider: "",
  });

  const { userName, userEmail, userprovider } = Userprofile;

  const HandleUser = (e) => {
    SetProfile({ ...Userprofile, [e.target.name]: e.target.value });
  };

  const ModifyUser = async () => {
    console.log(Userprofile);
    if (Userprofile) {
      SetLoading(true);
      console.log(userName);
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => {
          // Profile updated!
          console.log("updated!");
        })
        .catch((error) => {
          // An error occurred
          console.log(error);
          toast.error("이름을 수정할 수 없습니다!");
        });
      await updateEmail(auth.currentUser, userEmail)
        .then(() => {
          console.log("email updated!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("이메일을 수정할 수 없습니다!");
          SetLoading(false);
          // if (error.response.status === 400) {
          //   toast.error("이미 누군가가 사용 중인 이메일입니다!");
          // }
        });
      await RefreshProfile();
      SetLoading(false);
    setTimeout((toast.success('재로그인 해주세요!'),300))
    } else {
      toast.info("유저 정보가 없습니다!");
    }
  };

  const RequestProfile = useCallback(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      user.providerData.forEach(async (profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  phone: " + profile.phoneNumber);
        // console.log("  Photo URL: " + profile.photoURL);

        let providerId = profile.providerId;

        await axios
          .get(`${config.SERVER_URL}/profile`, {
            headers: { authentication: localStorage.getItem("token") },
          })
          .then((response) => {
            // console.log('previus', profile);
            console.log("cons", response.data);
            SetProfile({
              ...Userprofile,
              userName: response.data.name,
              userEmail: localStorage.getItem("email"),
              userprovider: providerId,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [Userprofile]);

  const RefreshProfile = useCallback(async () => {
    const user = firebase.auth().currentUser;
    console.log(user);

    if (userprovider === "google.com") {
      let providerG = new firebase.auth.GoogleAuthProvider();
      providerG.addScope("profile");
      providerG.addScope("email");
      firebase
        .auth()
        .signInWithPopup(providerG)
        .then(function (result) {
          // This gives you a Google Access Token.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          History.replace("/mypage");
          console.log(token, user);
        });
    }

    if (userprovider === "facebook.com") {
      let providerF = new firebase.auth.FacebookAuthProvider();
      providerF.addScope("user_birthday");
      firebase
        .auth()
        .signInWithPopup(providerF)
        .then(function (result) {
          // This gives you a Facebook Access Token.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          History.replace("/mypage");
          console.log(token, user);
        });
    }
  }, [Userprofile]);

  const DeleteUser = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteUser(user).then(async() => {
        // User deleted.
        console.log('삭제 되었습니다!');
        await signOut();
        setTimeout(toast.success('삭제되었습니다!'),5000);
      }).catch((error) => {
        // An error ocurred
        console.log(error);
        toast.error('재로그인 후 다시 시도해주세요!')
      });
    }
    
  }

  const signOut = async() => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userUid");
    await localStorage.removeItem("plan");
    await localStorage.removeItem("isBill");
    await localStorage.removeItem("create");
    await localStorage.removeItem("phone");
  
    await authService.signOut();
    window.location.reload();
  }

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");

    if (loginCheck === null) {
      History.replace("/");
    } else {
      return;
    }
  }, [History]);

  useEffect(() => {
    RequestProfile();
  }, []);

  return (
    <Layout>
      {isLoading && <Loading />}
      <Box fill justify='center' align='center'>
        <Box
          fill
          background='#3b2477'
          color='#fff'
          pad='large'
          className='MypageHeader'
        >
          <h2>회원 정보 수정</h2>
        </Box>
        <Box
          width='100%'
          justify='center'
          align='center'
          pad='large'
          className='ModifyContent'
        >
          <div className='UserFormInputs'>
            <input
              type='text'
              placeholder='이름'
              name='userName'
              value={userName}
              onChange={(e) => HandleUser(e)}
            />
          </div>

          <div className='UserFormInputs'>
            <input
              type='text'
              placeholder='이메일'
              name='userEmail'
              value={userEmail}
              onChange={(e) => HandleUser(e)}
            />
          </div>

          <div className='ModifyUserBtns'>
            <button type='submit' className='MBtn' onClick={ModifyUser}>
              회원정보 수정
            </button>
            <button type='submit' className='OutBtn' onClick={DeleteUser}>
              탈퇴하기
            </button>
          </div>
        </Box>
      </Box>
    </Layout>
  );
};

export default Modify;
