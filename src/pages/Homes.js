import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import SubjectIcon from "@material-ui/icons/Subject";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 15,
    margin: "15px",
    padding: "5px",
    paddingBottom: "10px",
    //backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    //color: theme.palette.text.secondary,
    backgroundColor: "#220d60",
    color: "white",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  pageHeader: {
    marginBottom: "20px",
  },
  typo: {
    paddingLeft: "5px",
  },
}));

const Homes = () => {
  const history = useHistory();

  const classes = useStyles();
  return (
    /*     <div style={{ backgroundColor: "yellow", padding: "5px" }}>
     */ <div>
      <div className={classes.pageHeader}>
        <PageHeader
          title="Accueil"
          subTitle="Veuillez sélectionner une catégorie de message"
          icon={<SubjectIcon fontSize="large" />}
        />
      </div>
      <Paper elevation={5} className={classes.tableContainer}>
        <Grid
          container
          spacing={2}
          alignContent="space-between"
          className={classes.grid}
        >
          <Grid item xs={12} sm={6}>
            <Paper
              className={classes.paper}
              onClick={() => history.push("/cultes")}
            >
              <HomeIcon fontSize="medium" />
              <Typography className={classes.typo}>
                Cultes dominicales
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              className={classes.paper}
              onClick={() => history.push("/mics")}
            >
              <AccountBalanceIcon fontSize="medium" />{" "}
              <Typography className={classes.typo}>
                {" "}
                Méga Impact Conférence
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              className={classes.paper}
              onClick={() => history.push("/ebm")}
            >
              <MenuBookIcon fontSize="medium" />
              <Typography className={classes.typo}>
                {" "}
                Etudes blibliques du midi
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              className={classes.paper}
              onClick={() => history.push("/other")}
            >
              <SubjectIcon fontSize="medium" />{" "}
              <Typography className={classes.typo}>
                Autres (1H tous ensemble, ...)
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Homes;
