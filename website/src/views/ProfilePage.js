import React, {useState, useEffect} from 'react';

import classNames from 'classnames';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { makeStyles } from '@material-ui/core/styles';
import { container, title } from "../assets/jss/material-kit-react.js";
import axios from "axios";
import faker from 'faker';


import Grid from "@material-ui/core/Grid";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

import {useAuth} from '../auth.js';
import image from "../assets/img/bg7.jpg";


const styles ={
    container: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container,
        
    },
    imgFluid: {
        maxWidth: "100%",
        height: "auto"
    },
    imgRounded: {
        borderRadius: "6px !important"
    },
    imgRoundedCircle: {
        borderRadius: "50% !important"
    },
    imgRaised: {
        boxShadow:
          "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3",

    },
    mainRaised: {
        margin: "0px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    section: {
        padding: "70px 0",
        textAlign: "center",
        "& img": {
            maxWidth: "160px",
            width: "100%",
            margin: "0 auto",
            transform: "translate3d(0, -50%, 0)"
        }
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
    },
    pageHeader: {
        minHeight: "100vh",
        height: "auto",
        display: "inherit",
        position: "relative",
        margin: "0",
        padding: "0px",
        border: "0",
        alignItems: "center",
    },
}

const useStyles = makeStyles(styles);
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
  

export default function ProfilePage(props){
    const classes = useStyles();
    const {...rest} = props;
    const [profile, setProfile] = useState({user:{username:'', email:''}});
    const {authTokens, setAuthTokens} = useAuth();
    const [videoList, setList] = useState([]);
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const fetchProfile = ()=>{
        let config = {
            headers: {
                'Authorization':'',
            }
        };
        let token = authTokens.token;
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        axios.get('/api/user/profile', config)
        .then(res=>{
            setProfile(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    }
    const fetchVideoList = ()=>{
        let config = {
            headers: {
                'Authorization':'',
            }
        };
        let token = authTokens.token;
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        axios.get('/api/video_list', config)
        .then(res=>{
            var list = res.data;
            setList(list);
            console.log(list);
        })
        .catch(err=>{
            console.log(err);
        });
    };
    const createList = ()=>{
        return videoList.map((obj,index)=>{
            return(
                <ListItemLink key ={index} href={`/video-summary/${obj.id}`}>
                    <ListItemIcon>
                        <PlayArrowIcon/>
                    </ListItemIcon>
                    <ListItemText primary = {`Recorded at ${obj.date_added}`}/>
                </ListItemLink>
            );
        })
    }
    useEffect(()=>{
        fetchProfile();
        fetchVideoList();
    },[]);
    return(
        <div
            className={classes.pageHeader}
            style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center"
            }}
        >
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="transparent"
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "dark",
                }}
                {...rest}
            />
            <br/><br/>
            <div style={{marginLeft:140, marginTop:50, padding:50}}>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <Grid container display="flex" justify="center">
                            <Grid item xs={12} sm={12} md={12}>
                            <div style={{margin:"-20px 0px -40px 0px"}}>
                                <img src={faker.image.avatar()} alt="..." className={imageClasses} />
                            </div>
                                <h2 className={classes.stitle}>{profile.user.username}</h2>
                                <br/><br/>
                            </Grid>
                        </Grid>
                        <TableContainer style={{padding:"50px"}} component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    
                                    <TableRow>
                                        <TableCell align="left"><strong>First Name</strong></TableCell>
                                        <TableCell align="center">{profile.firstname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Last Name</strong></TableCell>
                                        <TableCell align="center">{profile.lastname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Email</strong></TableCell>
                                        <TableCell align="center">{profile.user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Gender</strong></TableCell>
                                        <TableCell align="center">{profile.gender}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Branch</strong></TableCell>
                                        <TableCell align="center">{profile.branch}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>City</strong></TableCell>
                                        <TableCell align="center">{profile.city}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>CGPA</strong></TableCell>
                                        <TableCell align="center">{profile.cgpa}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Work Experience</strong></TableCell>
                                        <TableCell align="center">{profile.work_experience}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Graduation Year</strong></TableCell>
                                        <TableCell align="center">{profile.graduation_year}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{padding:"70px 0"}}>
                        <Grid container display="flex" justify="center">
                            <Grid item xs={12} sm={12} md={12} style={{textAlign:'center'}}>
                                <h2 className={classes.stitle}>Mock Interviews Taken</h2>
                                <hr/><br/><br/>
                            </Grid>
                        </Grid>
                        <List style = {{color:'black', padding:"80px"}}>
                            {createList()}
                        </List>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    );
}