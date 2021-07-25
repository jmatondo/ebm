import { Card, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f4f4f4",
    padding: theme.spacing(1),
    paddingTop: "90px",
  },
  pageHeader: {
    display: "flex",
    padding: theme.spacing(1),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(1),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(2),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
  titre: {
    color: theme.palette.primary.dark,
  },
}));

const PageHeader = (props) => {
  const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <Paper elevation={1} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography className={classes.titre} variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
