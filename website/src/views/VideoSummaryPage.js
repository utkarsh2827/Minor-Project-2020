import React, {useState, useEffect} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import {useAuth} from '../auth';

import { useParams } from "react-router-dom";

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import ReactWordcloud from 'react-wordcloud';
import styles2 from "../assets/jss/material-kit-react/views/components.js";
import { Typography } from '@material-ui/core';
import axios from "axios";

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
const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: true,
    fontFamily: "impact",
    fontSizes: [30, 100],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 70],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
};
const baroptions = {
    responsive: true,
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero: true,
                steps: 10,
                stepSize: 0.10,
                }
            }
        ],
    },
    legend:{
        display: false,
    }
}

const useStyles = makeStyles(styles);


export default function VideoPage(props){
    const classes = useStyles();
    const {...rest} = props;
    const [videoSummary, setSummary] = useState({words:[], pie_string:'', barchart:null, speaking_rate:0, question:'', sug_answer:'', ans:''});
    const { authTokens, setAuthTokens } = useAuth();
    const {id} = useParams();
    const getSummary = ()=>{
        let config = {
            headers: {
                'Authorization':'',
            },
            params:{
                id:id,
            }
        };
        let token = authTokens.token;
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        console.log(config);
        axios.get("/api/video-summary/",config)
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
            
        })
        .catch((err)=>console.log(err));
    };
    
    useEffect(()=>{
        getSummary();
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
                    <HorizontalBar data = {{...videoSummary.barchart}} options={baroptions}/>
                </div>
                <div className={classes.section}>
                    <Typography variant="h5" className={classes.stitle} gutterBottom>
                        Word Cloud
                    </Typography>
                    <br/><br/>
                    <ReactWordcloud words = {videoSummary.words} options={options}/>
                </div>
            </div>
        </div>
    );
}