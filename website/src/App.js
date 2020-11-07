import React, { useState } from 'react';
import { AuthContext, useAuth } from './auth';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import EditorPage from "./views/EditorPage";
import QuestionBank from "./views/QuestionBank";
import VideoPage from "./views/VideoPage";
import IntExpForm from './views/IntExpForm';
import IntExpList from "./views/IntExpList";
import IntExp from "./views/IntExp";
function App() {
  const existingTokens = JSON.parse(localStorage.getItem("token")) || {};
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/landing-page" component={LandingPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} /> */}
          
          <Route path="/login-page" component={LoginPage} /> 
          <Route path="/editor/:id" component={EditorPage} /> 
          <Route path="/questions" component={QuestionBank} />
          <Route path="/video" component={VideoPage} /> 
          <Route path="/form" component={IntExpForm} /> 
          <Route path="/experience-list" component={IntExpList} /> 
          <Route path="/experience/:id" component={IntExp}/> 
          <Route path="/" component={HomePage} />
          
        </Switch>
    </BrowserRouter>
  </AuthContext.Provider>
  );
}

export default App;
