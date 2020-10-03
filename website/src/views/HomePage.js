import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button"
import Header from "../components/Header/Header.js";
import Parallax from "../components/Parallax/Parallax.js";
import Grid from '@material-ui/core/Grid';
import HeaderLinks from "../components/Header/HeaderLinks.js";

import styles from "../assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

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
      <Parallax image={require("../assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <Grid container>
            <Grid item>
              <div className={classes.brand}>
                <h1 className={classes.title}>Interviews Simplified.</h1>
                <h3 className={classes.subtitle}>
                  Prepare and Excel your Interviews with Us!
                </h3>
              </div>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Grid item md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </Grid>
      </div>
    </div>
  );
}
    
