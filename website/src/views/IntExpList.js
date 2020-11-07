import React, {useState, useEffect} from 'react';
import classNames from "classnames";
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import ExperienceList from '../components/List/ExperienceList';
import {Grid, Button} from '@material-ui/core';
import { Link } from "react-router-dom";
import Parallax from '../components/Parallax/Parallax';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { container, title } from "../assets/jss/material-kit-react.js";
import SearchBar from "../components/SearchBar";
import image from "../assets/img/landing-bg.jpeg";
const styles = {
    container: {
      zIndex: "12",
      color: "#FFFFFF",
      ...container
    },
    grid: {
        marginRight: "-15px",
        marginLeft: "-15px",
        width: "auto"
    },
    griditem: {
        position: "relative",
        width: "100%",
        minHeight: "1px",
        paddingRight: "15px",
        paddingLeft: "15px",
        flexBasis: "auto"
    },
    title: {
      ...title,
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      color: "#FFFFFF",
      textDecoration: "none"
    },
    subtitle: {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0"
    },
    main: {
      background: "#FFFFFF",
      position: "relative",
      zIndex: "3"
    },
    mainRaised: {
      margin: "-60px 30px 0px",
      borderRadius: "6px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    section: {
        padding: "70px 0",
        textAlign: "center"
    },
    stitle: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },
    sdescription: {
        color: "#999"
    }
};
const useStyles = makeStyles(styles);
export default function IntExpList(props){
    const [expList, setState] = useState([]);
    const classes  = useStyles();
    const fetchList = (value)=>{
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        };
        axios.get('http://localhost:8000/api/list-exp/?query='+value, config)
        .then(res=>{
            setState(res.data.list);
        })
        .catch(err=>{
            console.log(err);
        });
    };
    useEffect(()=>{fetchList('')},[]);
    const onSubmitSearch = (value)=>{
        fetchList(value);
    };
    const { ...rest } = props;
    return(
        <div>
            <Header
                color="transparent"
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "dark",
                }}
                {...rest}
            />
            <Parallax filter image={image}>
                <div className={classes.container}>
                    <Grid className={classes.grid} container>
                        <Grid item className={classes.griditem} xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Interview Experiences</h1>
                            <h4 className={classes.subtitle}>
                                Learn from your seniors{"'"} experience and
                                ace your upcoming interviews.
                            </h4>
                            <br />
                            <Button
                                style= {{backgroundColor:"#f44336", color:"white"}}
                                size="lg"
                                variant="contained"
                                rel="noopener noreferrer"
                                startIcon={<AddIcon />}
                            >
                                <Link to="/form" style= {{color:"white"}}>Add Experience</Link>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Grid container display="flex" justify="center">
                            <Grid item xs={12} sm={12} md={12}>
                                <h2 className={classes.stitle}>Verified Interview Experiences</h2>
                                <br/><br/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <SearchBar onSubmit = {onSubmitSearch}/>
                            </Grid>
                        </Grid>
                        <br/><br/><br/>
                        <ExperienceList data = {expList}/>
                    </div>
                </div>
            </div>
        </div>
        
    );
}