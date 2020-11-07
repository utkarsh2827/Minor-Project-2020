import React, { useState } from 'react';
import { AuthContext } from './auth';

import { BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute';
import AuthRoute from './routes/AuthRoute';
import PublicRoute from './routes/PublicRoute';


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
          
          <AuthRoute path="/login-page" component={LoginPage} /> 
          <PublicRoute path="/editor/:id" component={EditorPage} /> 
          <PublicRoute path="/questions" component={QuestionBank} />
          <ProtectedRoute path="/video" component={VideoPage} /> 
          <ProtectedRoute path="/form" component={IntExpForm} /> 
          <PublicRoute path="/experience-list" component={IntExpList} /> 
          <PublicRoute path="/experience/:id" component={IntExp}/> 
          <PublicRoute path="/" component={HomePage} />
          
        </Switch>
    </BrowserRouter>
  </AuthContext.Provider>
  );
}

export default App;
