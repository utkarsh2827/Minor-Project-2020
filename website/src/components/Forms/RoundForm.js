import React from "react";

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'

import { makeStyles } from '@material-ui/core/styles';



import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
    const handleChangeInput = props.onChange;
    const handleAddFields = props.addField;
    const inputFields = props.fields;
    const handleRemoveFields = props.removeField;
    let round = props.index;
    return(
        <Container>
            <div className={classes.root}>
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1} flexGrow={1}>
                        <h2 className={classes.button}>{"Round "+(round+1)}</h2>
                    </Box>
                    <Box>
                        <IconButton onClick={(e)=>handleAddFields(round)} aria-label="add-question" component="span">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={(e)=>handleRemoveFields(round)} aria-label="remove-question" component="span">
                            <RemoveIcon />
                        </IconButton>
                    </Box>
                </Box>
                <hr/><br/> <br/>
                
                {inputFields.map((inputField, index) => {
                    return(<div key={index}>
                        <h5 className={classes.button}>{"Question "+(index+1)}</h5>
                        <TextField
                            name = "question"
                            label = "Question"
                            id = {round+"-f"-index+"1"}
                            multiline
                            rowsMax={100}
                            variant = "outlined"
                            fullWidth
                            value = {inputField.question}
                            onChange={event => handleChangeInput(round,index, event)}
                        />
                    
                        <TextField
                            name = "link"
                            label = "Link"
                            id = {round+"-f"-index+"1"}
                            variant = "outlined"
                            fullWidth
                            value = {inputField.link}
                            onChange={event => handleChangeInput(round,index, event)}
                        />
                    
                        <TextField
                            name = "answer"
                            label = "Answer/Tips"
                            id = {round+"-f"-index+"1"}
                            multiline
                            
                            rowsMax={500}
                            variant = "outlined"
                            fullWidth
                            value = {inputField.answer}
                            onChange={event => handleChangeInput(round,index, event)}
                        />
                        <hr/><br/> <br/>
                    </div>);
                })}
            </div>
        </Container>
    );
}