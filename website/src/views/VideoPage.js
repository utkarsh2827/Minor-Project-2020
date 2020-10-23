import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

import VideoRecorder from 'react-video-recorder';

import styles from "../assets/jss/material-kit-react/views/components.js";
import { Button, Typography } from '@material-ui/core';
import axios from "axios";
import { getSeekableBlob } from "recordrtc";


const useStyles = makeStyles(styles);
const postVideo= (videoBlob)=>{
    var formData = new FormData();
    formData.append("blob", videoBlob, 'myfile')
    // const config = {
    //     headers:{
    //         'Content-Type':'application/json',
    //     }
    // }
    axios.post("http://localhost:8000/api/process_video/",formData)
    .then((res)=>{
        console.log(res.data);
    })
    .catch((err)=>console.log(err));
}
export default function VideoPage(props){
    const classes = useStyles();
    const { ...rest } = props;
    return(
        <div>
            
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="dark"
                {...rest}
            />
            <CssBaseline />
            <div className={classes.container}>
                <Typography variant="h5" gutterBottom>
                    Video Interview
                </Typography>
                <Grid container spacing ={3}>
                    <Grid item position="relative" height="100%" z-index={0} xs={12}>
                        <VideoRecorder min-height="1000px" timeLimit = {120000} onError={(err)=>console.log(err)} onRecordingComplete={(videoBlob)=>{getSeekableBlob(videoBlob,function(fixedBlob){postVideo(fixedBlob)})}}></VideoRecorder>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>Submit Video</Button>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    );
}