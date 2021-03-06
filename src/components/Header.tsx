import * as React from "react";
import { useState, useEffect } from "react";

// material ui libs
import NavBar from "./NavBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// classnames libs
import classNames from "classnames";

export type colorType = "primary" | "secondary";

type changeColorOnScroll = {
  height: number;
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "transparent"
    | "white"
    | "rose"
    | "dark";
};

interface IHeaderProps {
  fixed?: boolean;
  changeColorOnScroll?: changeColorOnScroll;
}

export default function Header(props: IHeaderProps) {
  const classes = useStyles();
  const [colorText, setColour] = useState<colorType>("secondary");

  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  const headerColorChange = () => {
    const { changeColorOnScroll } = props;

    window.pageYOffset > changeColorOnScroll.height
      ? setColour("primary")
      : setColour("secondary");
  };

  const { fixed } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes.fixed]: fixed,
    [classes.white]: colorText == "primary",
    [classes.transparent]: colorText == "secondary",
  });

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <List disablePadding className={classes.profile}>
          <ListItem dense>
            <Avatar
              alt="Drew Harshaw"
              src="/images/profile.png"
              className={classes.avatar}
            />
          </ListItem>
          <ListItem dense>
            <Grid item xs container direction="column" spacing={2}>
              <Typography color={colorText} variant="h6">
                Drew Harshaw
              </Typography>
              <Typography color={colorText}>Software Engineer</Typography>
            </Grid>
          </ListItem>
        </List>
        <NavBar textColor={colorText} />
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "40px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",

    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "540px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "960px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1140px",
    },
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,sans-serif",
    textTransform: "none",
    whiteSpace: "nowrap",
  },
  avatar: {
    margin: "10px",
    width: "64px",
    height: "64px",
  },
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    marginBottom: "20px",
    color: "#555",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
  },
  transparent: {
    background: "transparent",
    boxShadow: "none",
    paddingTop: "25px",
  },
  white: {
    background: "#fff",
  },
  fixed: {
    position: "fixed",
    zIndex: 1100,
  },
}));
