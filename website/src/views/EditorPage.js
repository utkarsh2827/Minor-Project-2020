import React from "react";
import classNames from "classnames";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

// import Button from "@material-ui/core/Button"
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
// import Grid from '@material-ui/core/Grid';
import {UnControlled as CodeMirror} from "react-codemirror2";
import styles from "../assets/jss/material-kit-react/views/components.js";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike')
require('codemirror/mode/javascript/javascript');
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
            <div className={classNames(classes.main, classes.container)}>
                <Container>
                    <CodeMirror
                        value='print("hello")'
                        options={{
                            mode: 'text/x-java',
                            theme: 'material',
                            lineNumbers: true
                        }}
                    /> 
                </Container>

                
            </div>
        </div>
       
    );
}