import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import EditorPage from "./views/EditorPage";
import QuestionBank from "./views/QuestionBank";
import VideoPage from "./views/VideoPage";
import IntExpForm from './views/IntExpForm';

function App() {
  return (
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
        <Route path="/" component={HomePage} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
