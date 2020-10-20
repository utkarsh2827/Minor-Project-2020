import React, {useState} from "react";

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}))


export default function RoundForm(props){
    const classes = useStyles();
    const [values, setState] = useState([
        {question:'', link:'', answer:''}
    ])
    let round = props.round || 1;
    return(
        <Container>
            <div className={classes.root}>
                <h2 className={classes.button}>{"Round "+round}</h2>
                <div>
                    <TextField
                        label = "Question"
                        id = {round+"-i1"}
                        multiline
                        rows={1}
                        rowsMax={10}
                        variant = "outlined"
                        fullWidth
                    />
                
                    <TextField
                        label = "Link"
                        id = {round+"-i2"}
                        variant = "outlined"
                        fullWidth
                    />
                
                    <TextField
                        label = "Answer/Tips"
                        id = {round+"i3"}
                        multiline
                        rows={1}
                        rowsMax={20}
                        variant = "outlined"
                        fullWidth
                    />
                </div>
            </div>
        </Container>
    );
}