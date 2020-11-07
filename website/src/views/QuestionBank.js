import React,{useState, useEffect} from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import QuestionTable from "../components/Table/QuestionTable";
import { container, title } from "../assets/jss/material-kit-react.js";
import Grid from '@material-ui/core/Grid';

import SearchBar from "material-ui-search-bar";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Parallax from '../components/Parallax/Parallax';
import axios from "axios";
import image from "../assets/img/questions.jpeg";

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
export default function EditorPage(props){
    const classes = useStyles();
    const { ...rest } = props;
    const [questions,setQuestions] = useState([]);
    const [tags, setTags] = useState({topic_tags:[], company_tags:[]});
    const [searchValue, setState] = useState('');
    const [tagValue, setTag] = useState({company:'', topic:''});
    const fetchQuestions = ()=>{
        const config = {
            headers:{
                'Content-Type':'application/json',
            },
            params:{
                'question':searchValue,
                'company':tagValue.company,
                'topic':tagValue.topic,
            }
        }
        const url = 'http://localhost:8000/api/questions/?query='+searchValue;
        axios.get(url,config)
            .then(res=>{
                const ques = res.data;
                setQuestions(ques);
            })
            .catch(err=>{
                console.log(err);
            })
    }
    const fetchTags = ()=>{
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
                setTags(tags);
            })
            .catch(err=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        fetchQuestions();
        fetchTags();
    },[]);
    const handleEnter = (e)=>{
        if(e.keyCode=== 13){
            fetchQuestions();
        }
    }
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
                            <h1 className={classes.title}>Coding Questions</h1>
                            <h4 className={classes.subtitle}>
                                Practice most asked 363 questions with their tags!
                            </h4>
                        </Grid>
                    </Grid>
                </div>
            </Parallax>
            
            <CssBaseline />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div  className={classNames(classes.container)}>
                    <div className={classes.section}>
                        <Grid container display="flex" justify="center">
                            <Grid item xs={12} sm={12} md={12}>
                                <h2 className={classes.stitle}>Most Asked Coding Questions</h2>
                                <br/><br/>
                            </Grid>
                        </Grid>
                        <FormControl>
                            <SearchBar
                                value = {searchValue}
                                onChange={(newValue) => setState(newValue)}
                                onRequestSearch={()=>fetchQuestions()}
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
                        <br/><br/><br/>
                        <QuestionTable questions = {questions}></QuestionTable>
                    </div>
                </div>
            </div>
            
        </div>
       
    );
}