import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import EditorPage from "./views/EditorPage";
import QuestionBank from "./views/QuestionBank";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} /> */}
        
        <Route path="/login-page" component={LoginPage} /> 
        <Route path="/editor" component={EditorPage} /> 
        <Route path="/questions" component={QuestionBank} /> 
        <Route path="/" component={HomePage} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
