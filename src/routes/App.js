import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../App.css';

import Home from '../Components/Home';
import Brand from '../Components/Main/Brand';
import WebnovelDetail from '../Components/Main/Details/WebnovelDetail';
import NewsLetter from '../Components/Main/Newsletter';
import FaQ from '../Components/Main/FaQ';
import Ask from '../Components/Main/Ask';
import ExplainMember from '../Components/Main/ExplainMember';
import SignMember from '../Components/Membership/SignMember';
import Mypage from '../Components/Main/mypage';
import Modify from '../Components/Main/mypage/Modify';
import PayResult from '../Components/Membership/PayResult';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/brand" component={Brand}></Route>
        <Route exact path="/webnovelDetail" component={WebnovelDetail}></Route>
        <Route exact path="/newsletter" component={NewsLetter}></Route>
        <Route exact path="/ask" component={Ask}></Route>
        <Route exact path="/faq" component={FaQ}></Route>
        <Route exact path="/explain" component={ExplainMember}></Route>
        <Route exact path="/signIn" component={SignMember}></Route>
        <Route exact path="/payment" component={PayResult}></Route>
        <Route exact path="/mypage" component={Mypage}></Route>
        <Route exact path="/mypage/modify" component={Modify}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
