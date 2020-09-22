
import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import ListIcon from '@material-ui/icons/List';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PersonIcon from '@material-ui/icons/Person';

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "@material-ui/core/Button";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Questions"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ListIcon}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              HR Questions
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Coding Questions
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/landing-page"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <OndemandVideoIcon/>Mock Interview
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Link to="/" className={classes.navLink}>
            <PersonIcon/>Interview Experiences
          </Link>
      </ListItem>
    </List>
  );
}
