import React from 'react';

import {Grid} from '@material-ui/core';


import InfoArea from '../InfoArea/InfoArea';
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person';
import { title } from "../../assets/jss/material-kit-react.js";

const styles = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999"
  }
};


const useStyles = makeStyles(styles);
export default function ExperienceList(props){
    const data = props.data || [];
    const classes = useStyles();
    return(
        <div className={classes.section}>
            <Grid container display="flex" justify="center">
                <Grid item xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>Verified Interview Experiences</h2>
                    <br/><br/>
                </Grid>
            </Grid>
            <>
                <Grid display="flex" container>
                    {data.map((obj,index)=>{
                        return(
                            <Grid key = {index} item md={12}>
                                <InfoArea
                                    fullWidth
                                    id = {obj.id}
                                    title={obj.title}
                                    description={`Interview with ${obj.company_name} for role of ${obj.designation} with ${obj.no_of_rounds} rounds.`}
                                    icon={PersonIcon}
                                    iconColor="rose"
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </>
        </div>
        
    );
}
