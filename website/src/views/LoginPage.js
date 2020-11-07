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
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h3>Login</h3>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: username,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange:(event)=>{setUsername(event.target.value);},
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon className={classes.inputIconsColor}/>

                          </InputAdornment>
                        
                        ),
                        onChange:(event)=>{setPassword(event.target.value);},
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="contained" color="primary" size="lg" onClick={handleClick}>
                      Get started
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="contained" color="primary" size="lg">
                      <Link to="/signup" style= {{color:"white"}}>Sign Up</Link>
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
