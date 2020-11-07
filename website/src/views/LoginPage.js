import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import { Link, Redirect } from "react-router-dom";
import People from "@material-ui/icons/People";
import LockIcon from '@material-ui/icons/Lock';
// core components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";

import styles from "../assets/jss/material-kit-react/views/loginPage.js";

import image from "../assets/img/bg7.jpg";
import {useAuth} from '../auth';
import axios from 'axios';
import Login from '../components/login/mainpage'



const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authTokens, setAuthTokens } = useAuth();
  const [isError, setIsError] = useState(false);
  const classes = useStyles();
  const { ...rest } = props;

  const handleClick = ()=>{
    if(username==='' || password===''){
      alert("Both Fields are required");
      return;
    }
    axios.post('/api/user/login', {
      username: username,
      password: password,
    })
    .then(res=>{
      if(res.status===200){
        setAuthTokens(res.data);
      }
      else{
        setIsError(true);
      }
    })
    .catch(err=>{
      setIsError(true);
      console.log(err);
    })
  };
  if(authTokens && authTokens.token){
    return <Redirect to="/"/>;
  }
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
