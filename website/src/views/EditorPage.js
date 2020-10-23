import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography"
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';

import axios from "axios";
import { useParams } from "react-router-dom";

import {UnControlled as CodeMirror} from "react-codemirror2";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Button, TextField } from "@material-ui/core";

require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike')
require('codemirror/mode/javascript/javascript');

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const fetchQuestion = (id,setState)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }
    axios.get('http://localhost:8000/api/question/?id='+id,config)
        .then(res=>{
            const q = res.data;
            console.log(res.data);
            setState({question:q});
        })
        .catch(err=>{
            console.log(err);
        })
}
export default function EditorPage(props){
    const classes = useStyles();
    const { ...rest } = props;
    const [{question}, setState] = useState({question:''});
    const {id} = useParams();
    const[form, setForm] = useState({lang:'', code:'', input_value:''})
    const[output, setOutput] = useState('');
    const handleClick = ()=>{
        const config = {
            headers:{
                'Content-Type':'multipart/form-data',
            }
        }
        var formData = new FormData();
        var keys = Object.keys(form);
        keys.forEach((key,index)=>{
            formData.append(key, form[key]);
        });
        axios.post('http://localhost:8000/execute/', formData, config)
            .then(res=>{
                const output = res.data.output;
                setOutput(output); 
            })
            .catch(err=>{console.log(err);});
    }
    useEffect(()=>{
        fetchQuestion(id ,setState);
    },[]);
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
                    
                    <Typography variant="h5" gutterBottom>
                        Problem Statement
                    </Typography>
                    <section style={{fixed:true}}>
                        <pre style ={{"word-wrap":"break-word", "white-space":"pre-wrap"}}>
                            {question}
                        </pre>
                    </section>

                    <section>
                        <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                            <Box p={1} flexGrow={1}>
                                <Typography variant="h5">
                                        Write Your Code Below!
                                </Typography>
                            </Box>
                            <FormControl variant="outlined" className = {classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={form.lang}
                                    style = {{width:200}}
                                    onChange={(event)=>{setForm({...form, lang: event.target.value });}}
                                >
                                    <MenuItem  value={'c'}>C</MenuItem>
                                    <MenuItem  value={'c++src'}>C++</MenuItem>
                                    <MenuItem  value={'java'}>Java</MenuItem>
                                    <MenuItem  value={'python'}>Python</MenuItem>
                                </Select>
                            </FormControl>
                                
                        </Box>
                        <CodeMirror
                            
                            value=''
                            options={{
                                mode: 'text/x-'+form.lang,
                                theme: 'material',
                                lineNumbers: true
                            }}
                            onChange={(editor, data, value)=>{
                                setForm({...form, code:value});
                            }}
                        />
                        <br/><br/><br/>
                        
                        <TextField
                            label="Input"
                            fullWidth
                            multiLine
                            rows = {1}
                            variant = "outlined"
                            onChange={(e)=>{setForm({...form, input_value: e.target.value });}}
                        />
                        
                        
                        <br/><br/><br/>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleClick}
                        >
                            Run Code
                        </Button>
                        <br/><br/><br/>
                        <Typography style = {{whiteSpace:'pre-line'}} variant="body1" gutterBottom>
                            {output}
                        </Typography>
                    </section>
                    
                </Container>
            </div>
            
            <div>
                
                
                
            </div>
        </div>
       
    );
}