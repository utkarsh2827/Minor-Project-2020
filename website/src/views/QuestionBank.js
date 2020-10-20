import React,{useState, useEffect} from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import QuestionTable from "../components/Table/QuestionTable";
import styles from "../assets/jss/material-kit-react/views/components.js";
import SearchBar from "material-ui-search-bar";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from "axios";
const useStyles = makeStyles(styles);
const fetchQuestions=(searchValue, setState)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }
    const url = 'http://localhost:8000/api/questions/?query='+searchValue;
    axios.get(url,config)
        .then(res=>{
            const questions = res.data.questionList;
            setState(questions);
        })
        .catch(err=>{
            console.log(err);
        })
}
const fetchTags = (setState)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }
    let tags ={}
    const url = 'http://localhost:8000/api/tags';
    axios.get(url,config)
        .then(res=>{
            tags.company_tags  = res.data.company_tags;
            tags.topic_tags = res.data.topic_tags;
            setState(tags);
        })
        .catch(err=>{
            console.log(err);
        })
}
const fetchQuestionsByTag=(searchValue, setState)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }
    const url = 'http://localhost:8000/api/questions-by-tags/'+searchValue.company+'/'+searchValue.topic;
    axios.get(url,config)
        .then(res=>{
            const questions = res.data.questionList;
            setState(questions);
        })
        .catch(err=>{
            console.log(err);
        })
}
export default function EditorPage(props){
    const classes = useStyles();
    const { ...rest } = props;
    const [questions,setQuestions] = useState([]);
    const [tags, setTags] = useState({topic_tags:[], company_tags:[]});
    useEffect(()=>{
        fetchQuestions('',setQuestions);
        fetchTags(setTags);
    },[]);
    const [searchValue, setState] = useState('');
    const [tagValue, setTag] = useState({company:'', topic:''});
    const handleEnter = (e)=>{
        if(e.keyCode=== 13){
            fetchQuestionsByTag(tagValue, setQuestions);
        }
    }
    return(
        <div>
            
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="dark"
                {...rest}
            />
            
            <CssBaseline />
            <div  className={classNames(classes.container)}>
                <FormControl>
                    <SearchBar
                        value = {searchValue}
                        onChange={(newValue) => setState(newValue)}
                        onRequestSearch={()=>fetchQuestions(searchValue,setQuestions)}
                        style={{
                        margin: '0 auto',
                        spacing: 4,
                        minWidth: 550
                        }}
                    /> 
                </FormControl>
                &nbsp; &nbsp; &nbsp;&nbsp;
                <FormControl>
                    <Autocomplete
                        value={tagValue.company}
                        onChange={(event, newInputValue) => {
                          setTag({...tagValue, company: newInputValue});
                        }}
                        freeSolo= {true}
                        onKeyUp = {handleEnter}
                        options={tags.company_tags}
                        getOptionLabel={(option) => option}
                        style={{ width: 250, height: 80 }}
                        renderInput={(params) => <TextField {...params} label="Company Tags" variant="outlined" />}
                    />
                </FormControl>
                &nbsp; &nbsp; &nbsp;&nbsp;
                <FormControl>
                    <Autocomplete
                        value={tagValue.topic}
                        onChange={(event, newInputValue) => {
                          setTag({...tagValue, topic: newInputValue});
                        }}
                        freeSolo= {true}
                        onKeyUp = {handleEnter}
                        options={tags.topic_tags}
                        getOptionLabel={(option) => option}
                        style={{ width: 250, height: 80 }}
                        renderInput={(params) => <TextField {...params} label="Topic Tags" variant="outlined" />}
                    />
                </FormControl>
                
            </div>
            <CssBaseline />
            <div className = {classes.container}>
                <QuestionTable questions = {questions}></QuestionTable>
            </div>
        </div>
       
    );
}