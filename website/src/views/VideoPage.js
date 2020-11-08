import React, {useState, useEffect} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import {useAuth} from '../auth';
import Grid from '@material-ui/core/Grid';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";

import VideoRecorder from 'react-video-recorder';
import ReactWordcloud from 'react-wordcloud';
import styles2 from "../assets/jss/material-kit-react/views/components.js";
import { Button, Typography } from '@material-ui/core';
import axios from "axios";
import { getSeekableBlob } from "recordrtc";

import {Doughnut, HorizontalBar} from 'react-chartjs-2';


const styles = {
    ...styles2,
    section: {
        padding: "70px 0",
        textAlign: "center"
    },
    stitle: {
        ...styles2.title,
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

const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [10, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
};

export default function VideoPage(props){
    const [videoSummary, setSummary] = useState({words:[], pie_string:'', barchart:null, speaking_rate:0, question:'', sug_answer:'', ans:''});
    const [videoBlob, setVideo] = useState(null);
    const classes = useStyles();
    const { ...rest } = props;
    const [question, setQuestion] = useState({id:0, question:''});
    const [show, setState] = useState(false);
    const { authTokens, setAuthTokens } = useAuth();
    const postVideo = ()=>{
        if(videoBlob==null){
            return;
        }
        // const csrftoken = Cookies.get('csrftoken');
        // const config = {
        //     headers: {
        //         'X-CSRFToken': csrftoken,
        //     }
        // };
        let config = {
            headers: {
                'Authorization':'',
            }
        };
        let token = authTokens.token;
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        console.log(config);
        var formData = new FormData();
        formData.append("blob", videoBlob, 'myfile');
        formData.append("question-id", question.id);
        axios.post("http://localhost:8000/api/process_video/",formData, config)
        .then((res)=>{
            let words_array  = res.data.wordcloud.map((obj)=>{
                return {text:obj[0], value:obj[1]};
            });
            setSummary({
                ...videoSummary,
                words:words_array,
                pie_string:res.data.pie_string,
                barchart:res.data.barchart,
                speaking_rate:res.data.speaking_rate,
                question:res.data.question,
                sug_answer:res.data.sug_answer,
                ans:res.data.text
            });
            setState(true);
        })
        .catch((err)=>console.log(err));
    };
    const getQuestion = ()=>{
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        };
        let token = authTokens.token;
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        };
        axios.get("http://localhost:8000/api/process_video/", config)
        .then(res=>{
            setQuestion({id:res.data.id, question :res.data.question});
        })
        .catch(err=>{
            console.log(err);
        });
    };
    useEffect(()=>{
        getQuestion();
    }, []);
    return(
        <div>
            
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="dark"
                {...rest}
            />
            <br/><br/><br/>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.stitle} gutterBottom>
                    Video Interview
                </Typography>
                <br/><br/>
                <Grid container spacing ={3}>
                    <Grid item xs={12} lg={8}>
                        <Typography variant="h5" style={{position:'relative', justify:'center',}} gutterBottom>
                            <strong>Question: </strong>{question.question}
                        </Typography>
                    </Grid>
                    <Grid item position="relative" height="100%" z-index={0} xs={12}>
                        <VideoRecorder min-height="1000px" timeLimit = {120000} onError={(err)=>console.log(err)} onRecordingComplete={(videoBlob)=>{getSeekableBlob(videoBlob,function(fixedBlob){setVideo(fixedBlob)})}}></VideoRecorder>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{position:'relative', left:500, backgroundColor:'#7A1C86'}}variant="contained" color="primary" onClick = {postVideo}>Submit Video</Button>
                    </Grid>
                </Grid>
            </div>
            <br/><br/><br/>
            {show && (<div className={classes.container}>
                <Typography variant="h4" className={classes.stitle} gutterBottom>
                    Video Analysis Summary
                </Typography>
                <div className={classes.section}>
                    <Typography variant="h5" className={classes.stitle} gutterBottom>
                        Basic Details
                    </Typography>
                    <br/><br/>
                    <p><strong>Question: </strong> {videoSummary.question}</p>
                    <p><strong>Your Answer: </strong> {videoSummary.ans}</p>
                    <p><strong>Suggested Answer: </strong> {videoSummary.sug_answer}</p>
                    <p><strong>Speaking Rate: </strong> {videoSummary.speaking_rate}</p>
                </div>
                <div className={classes.section}>
                    <Typography variant="h5" className={classes.stitle} gutterBottom>
                        Emotions Pie Chart
                    </Typography>
                    <br/><br/>
                    <Doughnut data = {videoSummary.pie_string}/>
                </div>
                <div className={classes.section}>
                    <Typography variant="h5" className={classes.stitle} gutterBottom>
                        Most Frequent Words
                    </Typography>
                    <br/><br/>
                    <HorizontalBar data = {{...videoSummary.barchart, scaleOverride : true, scaleStartValue : 0 }}/>
                </div>
                <div className={classes.section}>
                    <Typography variant="h5" className={classes.stitle} gutterBottom>
                        Word Cloud
                    </Typography>
                    <br/><br/>
                    <ReactWordcloud words = {videoSummary.words} options={options}/>
                </div>
            </div>)}
        </div>
    );
}