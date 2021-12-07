import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Layout from "../../Layout";
import { Box } from "grommet";

//import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../Loading";
import * as config from "../../../config";
import { authService } from "../../../firebaseConfig";
import {
  getAuth,
  updateProfile,
  // updateEmail,
  deleteUser,
} from "@firebase/auth";
import firebase from "@firebase/app-compat";

const Modify = () => {
  //const size = useContext(ResponsiveContext);
  const History = useHistory();

  const [isLoading, SetLoading] = useState(false);
  const [Userprofile, SetProfile] = useState({
    userName: "",
    userEmail: "",
  });

  const { userName, userEmail } = Userprofile;

  const HandleUser = (e) => {
    SetProfile({ ...Userprofile, [e.target.name]: e.target.value });
  };

  //회원정보 수정 클릭시
  const ModifyUser = async () => {
    console.log(Userprofile);

    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      //const uid = user.uid;

      console.log(displayName, email);
      SetLoading(true);
      console.log(userName);

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

      // await updateEmail(auth.currentUser, userEmail)
      //   .then(() => {
      //     console.log("email updated!");
      //     localStorage.setItem("email", userEmail);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     toast.error("이메일을 수정할 수 없습니다!");
      //     SetLoading(false);
      //   });
         await toast.info('재인증을 위해 로그인을 다시 해주세요!');
      await ReAuthProfile();
      SetLoading(false);

    } else {
      signOut();
      toast.info("유저 정보를 불러올 수 없어요. 다시 로그인해주세요!");
    }
  };

  const ReAuthProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user, auth.currentUser);

    if (user !== null) {
      let providerId = user.providerData[0].providerId;


      if (providerId === "google.com") {
        let providerG = new firebase.auth.GoogleAuthProvider();
        providerG.addScope("profile");
        providerG.addScope("email");

        await authService.signOut();
        await firebase
          .auth()
          .signInWithPopup(providerG)
          .then(async function (result) {
            // This gives you a Google Access Token.
            //console.log(result);
            //let token = result.credential.accessToken;
            // The signed-in user info.
            // let user = result.user;
            // let id = result.credential.idToken
            // console.log(id);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (providerId === "facebook.com") {
        let providerF = new firebase.auth.FacebookAuthProvider();

        await authService.signOut();
        firebase
          .auth()
          .signInWithPopup(providerF)
          .then(function (result) {
            // This gives you a Facebook Access Token.
            //let token = result.credential.accessToken;
            // The signed-in user info.
            // let user = result.user;
            // console.log(token, user);
            window.location.reload();
          });
      }
    } else {
      toast.error("다시 로그인 해주세요.");
    }
  };

  const DeleteUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (window.confirm("정말 탈퇴하시겠습니까? 탈퇴하시면, 멤버십 가입 내역도 삭제되어 서비스 이용이 불가합니다.")) {
      deleteUser(user)
        .then(async () => {
          // User deleted.
          console.log("탈퇴 되었습니다!");
          await signOut();
          setTimeout(toast.success("탈퇴 되었습니다!"), 5000);
        })
        .catch((error) => {
          // An error ocurred
          console.log(error);
          toast.error("재로그인 후 다시 시도해주세요!");
        });
    }
  };

  const signOut = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userUid");
    await localStorage.removeItem("plan");
    await localStorage.removeItem("isBill");
    await localStorage.removeItem("create");
    await localStorage.removeItem("phone");

    await authService.signOut();
    window.location.reload();
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (loginCheck !== null) {
      axios
        .get(`${config.SERVER_URL}/profile`, {
          headers: { authentication: loginCheck },
        })
        .then((response) => {
          console.log(response.data);
          let data = response.data;
          SetProfile({
            ...Userprofile,
            userName: data.name,
            userEmail: email,
          });
        });
    } else {
      History.replace("/");
    }
  }, [History]);

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
          <h2>
            {localStorage.getItem("token") !== null
              ? "회원 정보 수정"
              : "회원정보가 없습니다!"}
          </h2>
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
              value={userName || ""}
              onChange={(e) => HandleUser(e)}
            />
          </div>

          <div className='UserFormInputs'>
            <input
              disabled
              type='text'
              placeholder='이메일'
              name='userEmail'
              value={userEmail || ""}
              onChange={(e) => HandleUser(e)}
            />
          </div>

          <div className='ModifyUserBtns'>
            <button
              type='submit'
              className='MBtn'
              onClick={
                localStorage.getItem("token") !== null
                  ? ModifyUser
                  : () => {
                      toast.error("로그인 해주세요!");
                    }
              }
            >
              {localStorage.getItem("token") !== null
                ? "회원정보 수정"
                : "회원정보 없음"}
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
