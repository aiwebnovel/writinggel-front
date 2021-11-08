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

import NewsLetter from '../Components/Main/NewsLetter';
import FaQ from '../Components/Main/FaQ';
import Ask from '../Components/Main/Ask';
import ExplainMember from '../Components/Main/ExplainMember';
import SignMember from '../Components/Membership/SignMember';
import Mypage from '../Components/Main/mypage';
import Modify from '../Components/Main/mypage/Modify';
import PayResult from '../Components/Membership/PayResult';

import Webnovel from '../Components/app/page/Webnovel';
import Bloger from '../Components/app/page/Bloger';
import Businessitem from '../Components/app/page/Businessitem';
import Discussion from '../Components/app/page/Discussion';
import Fairytale from '../Components/app/page/Fairytale';
import Firstsentence from '../Components/app/page/Firstsentence';
import Lyrics from '../Components/app/page/Lyrics';
import LoveLetter from '../Components/app/page/LoveLetter';
import Dailywrite from '../Components/app/page/DailyWrite';
import Storysrc from '../Components/app/page/Storysrc';

import MbtiResult from '../Components/app/page/MbtiResult'



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
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
  
        <Route exact path="/newsletter" component={NewsLetter}></Route>
        <Route exact path="/ask" component={Ask}></Route>
        <Route exact path="/faq" component={FaQ}></Route>
        <Route exact path="/explain" component={ExplainMember}></Route>
        <Route exact path="/signIn" component={SignMember}></Route>
        <Route exact path="/payment" component={PayResult}></Route>
        <Route exact path="/mypage" component={Mypage}></Route>
        <Route exact path="/mypage/modify" component={Modify}></Route>



      {/* service */}
        <Route exact path="/app/webnovel" component={Webnovel}></Route>
        <Route exact path="/app/bloger" component={Bloger}></Route>
        <Route exact path="/app/businessitem" component={Businessitem}></Route>
        <Route exact path="/app/fairytale" component={Fairytale}></Route>
        <Route exact path="/app/firstsentence" component={Firstsentence}></Route>
        <Route exact path="/app/lyrics" component={Lyrics}></Route>
        <Route exact path="/app/discussion" component={Discussion}></Route>
        <Route exact path="/app/loveletter" component={LoveLetter}></Route>
        <Route exact path="/app/dailywrite" component={Dailywrite}></Route>
        <Route exact path="/app/storysrc" component={Storysrc}></Route>
        
      {/* mbti route */}
      <Route exact path="/app/loveletter/mbti/:result" component={MbtiResult}></Route>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
