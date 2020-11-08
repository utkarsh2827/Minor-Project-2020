import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";



import styles from "../assets/jss/material-kit-react/views/loginPage.js";

import image from "../assets/img/bg7.jpg";


import Login from '../components/login/mainpage'





const useStyles = makeStyles(styles);


export default function LoginPage(props) {
  
  const classes = useStyles();
  const { ...rest } = props;
  
  
  return (
    <div>
      
      <Header
        absolute
        color="transparent"
        brand="Interviews Simplified"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <Login/>
        </div>
      </div>
    </div>
  );
}
