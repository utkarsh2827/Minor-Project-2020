import React, {useState, useEffect} from 'react';

import classNames from 'classnames';

import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import NavPills from "../components/NavPills/NavPills";

import { makeStyles } from '@material-ui/core/styles';
import { container, title } from "../assets/jss/material-kit-react.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import CommentIcon from '@material-ui/icons/Comment';


import image from "../assets/img/bg7.jpg";


const styles ={
    container: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container,
        
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3",
        width:1000,

    },
    mainRaised: {
        margin: "0px 30px 0px",
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

export default function IntExp(props){
    const [data, setState] = useState({form_data:[]});
    const [tabs, setTabs] = useState([]);
    const {id} = useParams();
    const classes = useStyles();
    const createTabs = ()=>{
        var list =[];
        list.push({tabButton:"Basic Information", tabIcon: CollectionsBookmarkIcon, tabContent: (
            <div style={{color:"black"}}>
                
                <p><strong>Company Name:  </strong>{data.company_name}</p>

                <p><strong>Position:  </strong>{data.designation}</p>

                <p><strong>Number of Rounds:  </strong>{data.no_of_rounds}</p>

                <p><strong>Stipend/CTC Break Up:  </strong>{data.compensation}</p>

                <p><strong>College/Ex-Organization:  </strong>{data.university_name}</p>

                <p><strong>Years Of Experience:  </strong>{data.years_of_experience}</p>

                <p><strong>Additional Info:  </strong>{data.additional_info}</p>
            </div>
        ) });
        console.log(data);
        const n = data.no_of_rounds || 0;
        const roundList = data.form_data.roundInfo;
        for(let i=0;i<n;i++){
            list.push({tabButton:`Round ${i+1}`, tabIcon: CommentIcon, tabContent: (
                <div style={{height:500, overflowY:"auto", color:"black"}}>
                    {roundList[i].map((obj, index)=>{
                        return(
                            <>
                            <div key={index}>
                                <h4><strong>{"Question"+(index+1)}</strong></h4>
                                <hr/>
                                <br/>
                                <p><strong>{obj.question}</strong></p>
                                <p><strong>Link to the Question: </strong> {obj.link}</p>
                                <p><strong>Suggested Answer: </strong>{obj.answer}</p>
                            </div>
                            <br/><br/>
                            </>
                        );
                    })}
                </div>
            )});
        }
        setTabs(list);
        console.log(list);
    };
    const fetchExp = ()=>{
        const config = {
            headers:{
                'Content-Type':'application/json',
            },
            params:{
                'id':id
            }
        }
        axios.get("http://localhost:8000/api/experience/", config)
        .then(res=>{
            var d = res.data;
            setState(d);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    const {...rest} = props;
    useEffect(()=>{
        fetchExp();
    }, []);
    useEffect(()=>{
        createTabs();
    },[data]);
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
                                <h2 className={classes.stitle}>{data.title}</h2>
                                <hr/><br/><br/>
                            </Grid>
                        </Grid>
                        <Grid container display="flex" >
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <NavPills
                                    color="primary"
                                    tabs={tabs}
                                    horizontal={{
                                        tabsGrid: { xs: 12, sm: 4, md: 2 },
                                        contentGrid: { xs: 12, sm: 8, md: 10 }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    );
}