import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import Button from "@material-ui/core/Button"
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import styles from "../assets/jss/material-kit-react/views/components.js";


const useStyles = makeStyles(styles);

export default function EditorPage(props){
    const classes = useStyles();
    const { ...rest } = props;
    // const [state, setState] = useState(false);
    // useEffect(()=>{
    //     CodeMirror.fromTextArea(document.getElementById("editor"),{
    //         mode:"xml",
    //         theme: "dark"
    //     });
    // });
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
                <Grid container>
                    <Grid item>
                        <FormControl fullwidth>
                            <OutlinedInput
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <Search />
                                    </InputAdornment>
                                }
                                placeholder="Search..."
                            />
                        </FormControl>
                        <Button color="primary" size="large">Submit</Button>
                    </Grid>
                </Grid>
                        
            

            </div>
        </div>
       
    );
}