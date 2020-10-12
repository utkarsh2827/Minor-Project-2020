import React,{useState, useEffect} from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import QuestionTable from "../components/Table/QuestionTable";
import styles from "../assets/jss/material-kit-react/views/components.js";
import SearchBar from "material-ui-search-bar";
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
            console.log(res.data);
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
    useEffect(()=>{
        fetchQuestions('',setQuestions);
    },[]);
    const [searchValue, setState] = useState('');
    return(
        <div>
            
            <Header
                brand="Interviews Simplified"
                rightLinks={<HeaderLinks />}
                color="dark"
                {...rest}
            />
            
            <CssBaseline />
            <div className={classNames(classes.container)}>
                <SearchBar
                    value = {searchValue}
                    onChange={(newValue) => setState(newValue)}
                    onRequestSearch={()=>fetchQuestions(searchValue,setQuestions)}
                    style={{
                      margin: '0 auto',
                      maxWidth: 800
                    }}
                /> 
            </div>
            <CssBaseline />
            <div className = {classes.container}>
                <QuestionTable questions = {questions}></QuestionTable>
            </div>
        </div>
       
    );
}