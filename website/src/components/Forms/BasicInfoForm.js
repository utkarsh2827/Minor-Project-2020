import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    button: {
      margin: theme.spacing(1),
    },
}));


export default function RoundForm(props){
    const classes = useStyles();
    const basicForm = props.values;
    const handleChange = props.onChange;
    return(
        <Container>
            <div className={classes.root}>
                
                <h2 className={classes.button}>{"Basic Information"}</h2>
                <hr/>
                <TextField
                    label="Company Name"
                    name = "company_name"
                    value={basicForm.company_name}
                    variant = "outlined"
                    fullWidth
                    onChange = {(e)=>handleChange(e)}
                />
                <TextField
                    label="Role Interviewed For"
                    value={basicForm.profile}
                    variant = "outlined"
                    fullWidth
                    name = "profile"
                    onChange = {(e)=>handleChange(e)}
                />
                <TextField
                    type="number"
                    label="Number of Rounds"
                    value={basicForm.no_of_rounds}
                    variant = "outlined"
                    fullWidth
                    name = "no_of_rounds"
                    onChange = {(e)=>handleChange(e)}
                />
                <TextField
                    label="Compensation + CTC Breakup"
                    value={basicForm.compensation}
                    variant = "outlined"
                    multiline
                    fullWidth
                    name = "compensation"
                    onChange = {(e)=>{handleChange(e)}}
                />
                <TextField
                    label="College/Ex-Organisation Name"
                    value={basicForm.university_name}
                    variant = "outlined"
                    fullWidth
                    name = "university_name"
                    onChange = {(e)=>{handleChange(e)}}
                />
                <TextField
                    label="Years of Experience"
                    type ="number"
                    value={basicForm.years_of_experience}
                    variant = "outlined"
                    fullWidth
                    name = "years_of_experience"
                    onChange = {(e)=>{handleChange(e)}}
                />
                <TextField
                    label="Additional Information"
                    value={basicForm.additional_info}
                    variant = "outlined"
                    fullWidth
                    multiline
                    rows={5}
                    rowsMax={20}
                    name = "additional_info"
                    helperText = "Add On-Campus/Off-Campus related details here!"
                    onChange = {(e)=>{handleChange(e)}}
                />
                
                {/* <Box display="flex" justifyContent="center" p={1} m={1}>
                    <Box >
                        <Button onClick={handleSubmit(basicForm)} variant="contained" color="primary" >Continue</Button>
                    </Box>
                </Box> */}
            </div>
        </Container>
    );
}