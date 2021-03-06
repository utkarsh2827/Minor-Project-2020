import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import Header from "../components/Header/Header.js";
import Parallax from "../components/Parallax/Parallax.js";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HeaderLinks from "../components/Header/HeaderLinks.js";
import { container, title } from "../assets/jss/material-kit-react.js";
import styles from "../assets/jss/material-kit-react/views/components.js";
import image from '../assets/img/home.jpg';
const styles2={
  ...styles,
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
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    color: "#FFFFFF"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0"
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
  
}

const useStyles = makeStyles(styles2);

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Interviews Simplified"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={image}>
        <div className={classes.container}>
          <Grid className={classes.grid} container>
            <Grid item className={classes.griditem} xs={12} sm={12} md={4}>
              <div className={classes.brand}>
                <h1 className={classes.title}>Interviews Simplified.</h1>
                <h3 className={classes.subtitle}>
                  Prepare and Excel your Interviews with Us!
                </h3>
              </div>
              <br /><br />
              <Button
                  style= {{backgroundColor:"#066282", color:"white", height:"50px", width:"200px"}}
                  size="lg"
                  variant="contained"
                  rel="noopener noreferrer"
              >
                  <Link to="/login-page" style= {{color:"white"}}>Get Started</Link>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Parallax>
    </div>
  );
}
    
