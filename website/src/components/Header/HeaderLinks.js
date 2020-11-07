
import React, {useState, useEffect} from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';

import CustomDropdown from "../CustomDropdown/CustomDropdown.js";

// import Tooltip from "@material-ui/core/Tooltip";
import {useAuth} from '../../auth.js';
// @material-ui/icons
import ListIcon from '@material-ui/icons/List';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

import axios from 'axios';

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { authTokens, setAuthTokens } = useAuth();
  const handleLogout =()=>{

    let token = authTokens.token;
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }

    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.post('/logout/',null, config)
        .then(res=>{
          localStorage.clear();
          setAuthTokens({});
          alert("Logging Out");
          window.location.href = "/login-page";
        })
        .catch(err=>{
            console.log(err);
        });
  }
  const [list, setList] = useState([]);
  const getList = ()=>{
    if(authTokens && authTokens.token){
      setList([
        <Link key = {1} to="/profile" className={classes.dropdownLink}>
          Profile
        </Link>,
        <Button
          key = {2}
          className={classes.dropdownLink}
          onClick = {handleLogout}
        >Log Out</Button>
      ]);
    }
    else{
      setList ([
        <Link to="/login-page" key = {1} className={classes.dropdownLink} >
          Log In
        </Link>,
        <Link to="/signup" key = {2} className={classes.dropdownLink} >
          Sign Up
        </Link>
      ]);
    }
  };
  useEffect(()=>{
    getList();
  }, []);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
          <Link to="/questions" className={classes.navLink}>
            <ListIcon/>Questions
          </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Link to="/video" className={classes.navLink}>
            <OndemandVideoIcon/>Mock Interview
          </Link>
        
      </ListItem>
      <ListItem className={classes.listItem}>
          <Link to="/experience-list" className={classes.navLink}>
            <GroupIcon/>Interview Experiences
          </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
            noLiPadding
            buttonText="User Actions"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={PersonIcon}
            dropdownList={list}
          />
      </ListItem>
      
    </List>
  );
}
