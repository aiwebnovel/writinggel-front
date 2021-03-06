import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Header as HeaderLayout, Nav, Avatar } from "grommet";
import { Menu } from "grommet-icons";
import { ResponsiveContext } from "grommet";

import { authService } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OuterClick } from "react-outer-click";

import * as config from "../../config";
import "../../styles/Service.scss";
import styled from "styled-components";

// import { useRecoilState,useRecoilValue} from "recoil";
// import { ProfileState } from '../../Recoils' 


const Header = () => {
  const size = useContext(ResponsiveContext);

  const check = sessionStorage.getItem("token");
  const provider = sessionStorage.getItem('provider');
  const { Kakao } = window;
  const kakao_token = Kakao.Auth.getAccessToken();

  const [isShow, SetShow] = useState(false);
  const [isShowMenu, SetShowMenu] = useState(false);
  // const [provider, SetProvider] = useState('');
  const [profile, SetProfile] = useState({
    userName: "Guest",
    userImage: `/user_colored.png`,
    isBill:'',
    Plan:''
  });

  const { userName, userImage, isBill, Plan } = profile;

  // const [userInfo, setInfo] = useRecoilState(ProfileState);
  // const value = useRecoilValue(ProfileState);
  // console.log(value);

  const reLoadProfile = useCallback(async()=>{

    authService.onAuthStateChanged(async (user) => {
      //console.log("user", user);
      if (user) {
        await authService.currentUser
          .getIdToken()
          .then(async (data) => {
           
            await axios
            .get(`${config.SERVER_URL}/profile`, {
              headers: { authentication: data},
            })
            .then((response) => {
              
              SetProfile({
                ...profile,
                userName:  response.data.name,
                userImage: response.data.photoURL,
                isBill: response.data.isBill,
                Plan: response.data.plan
              });
        
              sessionStorage.setItem('token',data);
              sessionStorage.setItem("userUid", response.data.uid);
              sessionStorage.setItem("plan", response.data.plan);
              sessionStorage.setItem("isBill", response.data.isBill);
              
            })
            .catch((error) => {
              if(error.response.status === 412) {
                toast.error('????????????????????? ?????? ????????? ????????????!') 
                //window.location.reload();  
              }
              // toast.error(error.message);
            });
          })
          .catch(async (error) => {
            console.log(error);
            toast.error("????????????????????? ?????? ????????? ????????????!");
          });
      }
    });
   
  },[]);

    const requestProfile = useCallback(async () => {

    if (check !== null) {
     
      if(authService.currentUser) {
        let Idtoken = authService.currentUser.multiFactor.user.accessToken
  
       // console.log(sessionStorage.getItem('token'))
        //console.log(Idtoken)
  
        await axios
          .get(`${config.SERVER_URL}/profile`, {
            headers: { authentication: Idtoken },
          })
          .then((response) => {
            //console.log(response)
            SetProfile({
              ...profile,
              userName:  response.data.name,
              userImage: response.data.photoURL,
              isBill: response.data.isBill,
              Plan: response.data.plan
            });
      
            sessionStorage.setItem('token',Idtoken);
            sessionStorage.setItem("plan", response.data.plan);
            sessionStorage.setItem("isBill", response.data.isBill);
            sessionStorage.setItem("userUid", response.data.uid);
          })
          .catch((error) => {
            if(error.response.status === 412) {
              toast.error('????????????????????? ?????? ????????? ????????????!') 
              //window.location.reload();  
            }
            // toast.error(error.message);
          });
      } else {
        reLoadProfile();
        
      }
    }else {
      return
    }
    
  }, []);


  const GetProfile = useCallback(async() => {
    if(check !== null) {
    await axios
      .get(`${config.SERVER_URL}/profile`, {
        headers: { authentication: check },
      })
      .then(async(response) => {
        //console.log(response.data);
      
        SetProfile({
          ...profile,
          userName: sessionStorage.getItem('userName'),
          // userImage: response.data.photoURL,
          isBill: response.data.isBill,
          Plan: response.data.plan,
        });
        //sessionStorage.setItem('userImage', response.data.photoURL)
        sessionStorage.setItem("plan", response.data.plan);
        sessionStorage.setItem("isBill", response.data.isBill);
        sessionStorage.setItem("userUid", response.data.uid);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 412) {
          toast.error("????????????????????? ?????? ????????? ????????????");
        }
      });
    }
  },[]);


  const KakaoProfile = useCallback(async() => {
    //console.log('kakao login');

    if(kakao_token !== null)
    await axios
    .get(`${config.SERVER_URL}/profile`, {
      headers: { authentication: kakao_token},
    })
    .then((response) => {
      //console.log(response);
      SetProfile({
        ...profile,
        userName: sessionStorage.getItem('userName'),
        userImage: response.data.photoURL,
        isBill: response.data.isBill,
        Plan: response.data.plan
      });

      // setInfo({
      //   ...userInfo,
      //   userName: sessionStorage.getItem('userName'),
      //   isBill: response.data.isBill,
      //   Plan: response.data.plan,
      //   membership_count : response.data.membership_count,
      //   stopPayWish: response.data.stopPayWish
      // })

      sessionStorage.setItem('token', kakao_token);
      sessionStorage.setItem("plan", response.data.plan);
      sessionStorage.setItem("isBill", response.data.isBill);
      sessionStorage.setItem("userUid", response.data.uid);

     
      
    })
    .catch((error) => {
      if(error.response.status === 412) {
        toast.error('????????????????????? ?????? ????????? ????????????!') 
        //window.location.reload();  
      }
      // toast.error(error.message);
    });
  },[]);


  const signOut = async () => {

    SetShowMenu(false);

    if(provider === 'kakao') {
      Kakao.Auth.logout(()=>{
        sessionStorage.clear();
        window.location.reload();
      })
    } else {
      await sessionStorage.clear();
      await authService.signOut();
      window.location.reload();
    }
  };


  const HandleShow = () => {
    SetShow(!isShow);
  };

  const showMenu = () => {
    SetShowMenu(!isShowMenu);
  };

  useEffect(()=>{

    if(provider === 'password'){
      GetProfile();
    } 
    if (provider === "google.com" || provider === "facebook.com") {
      requestProfile();
    } 
    if (provider === 'kakao') {
      KakaoProfile();
    }
  },[provider, GetProfile, requestProfile, KakaoProfile])


  return (
    <>
      <HeaderLayout className='ServiceHeader' align='center'>
        <Nav className='MainLogo2'>
          <Link to='/'>
            <img src='/logo2.png' alt='logo' />
          </Link>
        </Nav>
        {size !== "small" ? (
          <Nav direction='row' gap='medium' align='center'>
            <Link to='/signIn' className={Plan === 'free' || Plan === '0' || Plan === '' ? "MenusLink" : "displayNone"}>
              <LinkBtn>????????? ??????</LinkBtn>
            </Link>
            < HowToLink href="https://appplatform.notion.site/99f9b5fb95d84477b9e2aa343fb97055" target='_blank' rel="noreferrer">?????? ??????</ HowToLink>
            <Avatar
            
                 src={sessionStorage.getItem('userImage') ? sessionStorage.getItem('userImage') : userImage}
              style={{ width: "40px", height: "40px"}}
              onClick={showMenu}
              
            />
            <Menu color='brand' size='medium' style={{cursor: 'pointer'}} onClick={HandleShow} />
          </Nav>
        ) : (
          <Nav direction='row' gap={size !== 'small' ? 'large':'medium'} align='center'>
            < HowToLink href="https://appplatform.notion.site/99f9b5fb95d84477b9e2aa343fb97055" target='_blank' rel="noreferrer">?????? ??????</ HowToLink>
            <Menu color='brand' size='medium' onClick={HandleShow} />
          </Nav>
        )}
      </HeaderLayout>
      {isShow && (
        <OuterClick onOuterClick={(event) => {
          SetShow(false);}}>
        <Box
          style={size === "small" ? {width: '100%'} : {height:'100%'}}
          animation={
            size !== "small"
              ? { type: "slideLeft", duration: 300 }
              : { type: "slideDown", duration: 500 }
          }
          className='ServiceMenus'
          align='center'
          pad='large'
        >
          <Nav direction='column' gap='large' className='ServiceDropMenu'>
            {size === 'small' &&
              <Nav direction='row' gap='medium' align='center' justify={size ==='small' && 'between'}>
              <Link to='/signIn' className={Plan === 'free' || Plan === '0' || Plan === '' ? "MenusLink" : "displayNone"}>
                <LinkBtn>????????? ??????</LinkBtn>
              </Link>
              <Avatar
                src={sessionStorage.getItem('userImage') ? sessionStorage.getItem('userImage') : userImage}
                style={{ width: "40px", height: "40px" }}
                onClick={showMenu}
              />
            </Nav>
              }
            <ul className='ServiceDropDown'>
              <li>
                <Link to='/app/webnovel'>????????? ????????? ??????</Link>
              </li>
              <li>
                <Link to='/app/bloger/idea'>????????? ?????????</Link>
              </li>
              <li>
                <Link to='/app/fairytale'>?????? ??????</Link>
              </li>
              <li>
                <Link to='/app/firstsentence'>????????? ?????????</Link>
              </li>
              <li>
                <Link to='/app/lyrics'>?????? ?????? ??????</Link>
              </li>
              <li>
                <Link to='/app/businessitem'>???????????? ????????????</Link>
              </li>
              <li>
                <Link to='/app/discussion'>?????? ??????</Link>
              </li>
              <li>
                <Link to='/app/loveletter'>MBTI ????????????</Link>
              </li>
              <li>
                <Link to='/app/dailywrite'>???????????? ?????? ????????????</Link>
              </li>
              <li>
                <Link to='/app/storysrc'>????????? ?????? ??????</Link>
              </li>
              {/* <li>
                  <Link to='/app/relaynovel'>1:1 ????????? ??????</Link>
                </li> */}
              <li>
                <Link to='/app/coverletter'>?????? ????????? ?????? ??????</Link>
              </li>
            </ul>
          </Nav>
        </Box>
        </OuterClick>
      )}
      {isShowMenu && (
        <div>
          <div className='ServiceAfterLogin'>
            <div className='ServiceUsername'>
              <p>{userName !== undefined ? userName : sessionStorage.getItem('userName')}???</p>
            </div>
            <p className='ServicePlan'>
              {Plan === 'free' || Plan === '0'
                ? "free"
                : `${Plan}?????? ??????`}
            </p>
            <hr style={{ width: "100%", color: "#3b2477" }} />
            <div className='ServiceAfterLoginBottom'>
              <p>
                <Link to='/tingbox'>?????? ?????????</Link>
              </p>
              <p>
                <Link to='/mypage'>?????? ?????????</Link>
              </p>
              <button onClick={signOut}>????????????</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

const LinkBtn = styled.button`
  background-color: #fff;
  border: 2px solid #3b2477;
  outline: 0;
  color: #3b2477;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 300ms ease;
`;


const HowToLink = styled.a`
background-color: #b1b5e6;
outline: 0;
padding: 2px 8px;
border-radius: 5px;
font-size : 15px;

@media screen and (max-width:768px) {
  font-size : 13px;
}

`