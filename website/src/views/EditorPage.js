import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography"
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
// import Grid from '@material-ui/core/Grid';
// import ReactHtmlParser from 'react-html-parser'; 
// import axios from "axios";

import {UnControlled as CodeMirror} from "react-codemirror2";
import styles from "../assets/jss/material-kit-react/views/components.js";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike')
require('codemirror/mode/javascript/javascript');
const useStyles = makeStyles(styles);
// const fetchQuestion = (id,setState)=>{
//     const config = {
//         headers:{
//             'Content-Type':'application/json',
//         }
//     }
//     axios.get('http://localhost:8000/api/question/?id='+id,config)
//         .then(res=>{
//             const question = res.data.questionText;
//             console.log(res.data);
//             setState({question:question});
//         })
//         .catch(err=>{
//             console.log(err);
//         })
// }
export default function EditorPage(props){
    const classes = useStyles();
    const { ...rest } = props;
    // const [{question}, setState] = useState({question:''});
    // const id = 1;
    // useEffect(()=>{
    //     fetchQuestion(id ,setState);
    // },[]);
    return(
        <div>
            
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="dark"
                {...rest}
            />
            
            <CssBaseline />
            <div>
                <Container fullWidth  component = {Paper}>
                    <Typography variant="h3" gutterBottom>
                        Problem Statement
                    </Typography>
                    <section style={{fixed:true}}>
                        <object style={{width:"100%"}} height={"500"} data="http://localhost:8000/static/QuestionBank/files/MaxSumContiguousSubarray.txt">Problem Statement</object>
                    </section>

                    <div>
                        <CodeMirror
                            value='print("hello")'
                            options={{
                                mode: 'text/x-java',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        /> 
                    </div>
                    
                </Container>
            </div>
            
            <div>
                
                
                
            </div>
        </div>
       
    );
}