import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} /> */}
        
        <Route path="/login-page" component={LoginPage} /> 
        <Route path="/" component={HomePage} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
