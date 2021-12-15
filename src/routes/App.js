import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../App.css';

import Home from '../Components/Home';
import Brand from '../Components/Main/Brand';

import WebnovelDetail from '../Components/Main/Details/WebnovelDetail';
import BlogerDetail from '../Components/Main/Details/BlogerDetail';
import BusinessItemDetail from '../Components/Main/Details/BusinessItemDetail';
import FairyTaleDetail from '../Components/Main/Details/FairyTaleDetail';
import FirstSentencelDetail from '../Components/Main/Details/FirstSentenceDetail';
import LyricsDetail from '../Components/Main/Details/LyricsDetail';
import DiscussionDetail from '../Components/Main/Details/DiscussionDetail';
import LoveLetterDetail from '../Components/Main/Details/LoveLetterDetail';
import DailyWriteDetail from '../Components/Main/Details/DailyWriteDeatil';
import StorySrcDetail from '../Components/Main/Details/StorySrcDetail';

import NewsLetter from '../Components/Main/Newsletter';
import FaQ from '../Components/Main/FaQ';
import Ask from '../Components/Main/Ask';
import SignMember from '../Components/Membership/SignMember';
import Mypage from '../Components/Main/mypage';
import Modify from '../Components/Main/mypage/Modify';
import TingBox from '../Components/Main/mypage/TingBox';
import PayResult from '../Components/Membership/PayResult';
import PayDone from '../Components/Membership/Paydone';

import Webnovel from '../Components/app/page/Webnovel';

import BlogIdea from '../Components/app/page/BlogIdea';
import BlogName from '../Components/app/page/BlogName';
import BlogTitle from '../Components/app/page/BlogTitle';
import BlogIntro from '../Components/app/page/BlogIntro';
import BlogKeyword from '../Components/app/page/BlogKeyword';
import BlogFollow from '../Components/app/page/BlogFollow';

import Businessitem from '../Components/app/page/Businessitem';
import Discussion from '../Components/app/page/Discussion';
import Fairytale from '../Components/app/page/Fairytale';
import Firstsentence from '../Components/app/page/Firstsentence';
import Lyrics from '../Components/app/page/Lyrics';
import LoveLetter from '../Components/app/page/LoveLetter';
import Dailywrite from '../Components/app/page/DailyWrite';
import Storysrc from '../Components/app/page/Storysrc';
import Login from '../Components/Login';

import GoBrowser from '../Components/GoBrowser';
import Register from '../Components/Register';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/regist" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        
        <Route exact path="/brand" component={Brand}></Route>

        <Route exact path="/service/webnovel" component={WebnovelDetail}></Route>
        <Route exact path="/service/bloger" component={BlogerDetail}></Route>
        <Route exact path="/service/businessitem" component={BusinessItemDetail}></Route>
        <Route exact path="/service/fairytale" component={FairyTaleDetail}></Route>
        <Route exact path="/service/firstsentence" component={FirstSentencelDetail}></Route>
        <Route exact path="/service/lyrics" component={LyricsDetail}></Route>
        <Route exact path="/service/discussion" component={DiscussionDetail}></Route>
        <Route exact path="/service/loveletter" component={LoveLetterDetail}></Route>
        <Route exact path="/service/dailywrite" component={DailyWriteDetail}></Route>
        <Route exact path="/service/storysrc" component={StorySrcDetail}></Route>
        <Route exact path="/check" component={GoBrowser}></Route>
  
        <Route exact path="/newsletter" component={NewsLetter}></Route>
        <Route exact path="/ask" component={Ask}></Route>
        <Route exact path="/faq" component={FaQ}></Route>
        <Route exact path="/signIn" component={SignMember}></Route>
        <Route exact path="/result" component={PayDone}></Route>
        <Route exact path="/mypage/payment" component={PayResult}></Route>
        <Route exact path="/mypage" component={Mypage}></Route>
        <Route exact path="/mypage/modify" component={Modify}></Route>
        <Route exact path="/tingbox" component={TingBox}></Route>



      {/* service */}
        <Route exact path="/app/webnovel" component={Webnovel}></Route>
        
        <Route exact path="/app/bloger/idea" component={BlogIdea}></Route>
        <Route exact path="/app/bloger/name" component={BlogName}></Route>
        <Route exact path="/app/bloger/title" component={BlogTitle}></Route>
        <Route exact path="/app/bloger/intro" component={BlogIntro}></Route>
        <Route exact path="/app/bloger/keyword" component={BlogKeyword}></Route>
        <Route exact path="/app/bloger/follow" component={BlogFollow}></Route>

        <Route exact path="/app/businessitem" component={Businessitem}></Route>
        <Route exact path="/app/fairytale" component={Fairytale}></Route>
        <Route exact path="/app/firstsentence" component={Firstsentence}></Route>
        <Route exact path="/app/lyrics" component={Lyrics}></Route>
        <Route exact path="/app/discussion" component={Discussion}></Route>
        <Route exact path="/app/loveletter" component={LoveLetter}></Route>
        <Route exact path="/app/dailywrite" component={Dailywrite}></Route>
        <Route exact path="/app/storysrc" component={Storysrc}></Route>
        

      </Switch>
    </BrowserRouter>
  );
}

export default App;
