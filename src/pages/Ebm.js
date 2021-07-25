import React, { useEffect, useState } from "react";

import {
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Toolbar,
  Tooltip,
  Hidden,
  Grid,
  Avatar,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
import {
  TableContainer,
  Table,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableHeader from "../components/EbmTableHeader";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import PageHeader from "../components/PageHeader";
import SubjectIcon from "@material-ui/icons/Subject";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 15,
    margin: "15px",
    paddingBottom: "10px",
    //backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  cont: {
    marginLeft: "5px",
    maxWidth: "95%",
    //backgroundColor: "red",
  },

  name: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  espa: {
    padding: theme.spacing(1),
  },
  titre: {
    color: "blue",
  },
  reference: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedRowArray.map((el) => el[0]);
};

const Ebm = () => {
  const classes = useStyles();
  const [studies, setstudies] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  // PAge
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("ref");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  const onDownloadHandler = (id) => {
    console.log("Ligne:= " + id);
  };

  useEffect(() => {
    //fetch("http://localhost:8981/iccs/studies")
    fetch("https://iccv1.herokuapp.com/iccs/studies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.content);
        setstudies(data.content);
      });
  }, []);

  const handleSearch = (e) => {
    let tar = e.target;
    setFilterFn({
      fn: (items) => {
        if (tar === "") return items;
        else {
          return items.filter((x) => {
            return x.globalSearch.toLowerCase().includes(tar.value);
          });
        }
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Les études bibliques du midi"
        subTitle="Choisisez et téléchargez les notes"
        icon={<SubjectIcon fontSize="large" />}
      />
      <Paper elevation={5} className={classes.tableContainer}>
        <Toolbar className={classes.toolbar} style={{ width: "95%" }}>
          <TextField
            style={{ width: "75%", margin: "0.5rem" }}
            variant="outlined"
            label="Recherche globale"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        <TableContainer component={Paper} className={classes.cont}>
          <Table>
            <TableHeader
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              createSortHandler={createSortHandler}
            />
            <TableBody>
              {sortedRowInformation(
                filterFn.fn(studies),
                getComparator(orderDirection, valueToOrderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((study, index) => (
                  <TableRow key={index} className={classes.espa}>
                    <Hidden xsDown>
                      <TableCell>{study.studyDay}</TableCell>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={2}>
                            <Avatar
                              alt={study.speaker.lastName}
                              src="/yvan.png"
                            />
                          </Grid>
                          <Grid item lg={10}>
                            <Typography>{study.speaker.title}</Typography>
                            <Typography
                              variant="body2"
                              className={classes.name}
                            >
                              {study.speaker.firstName} {study.speaker.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.reference}>
                          {study.studyReference.passage}
                        </Typography>
                        <Typography style={{ maxWidth: "400px" }} noWrap>
                          {study.studyReference.content}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <a
                          href={`https://iccv1.herokuapp.com/downloadFile/${study.studyId}`}
                        >
                          <IconButton
                            color="secondary"
                            //onClick={() => onDownloadHandler(study.studyId)}
                          >
                            <GetAppIcon />
                          </IconButton>
                        </a>
                      </TableCell>
                    </Hidden>
                    <Hidden smUp>
                      <TableCell
                        style={{ maxWidth: "300px" }}
                        /*                         onClick={() => {
                          <a
                            href={`https://iccv1.herokuapp.com/downloadFile/${mic.id}`}
                          ></a>;
                        }} */
                      >
                        <a
                          style={{ textDecoration: "none" }}
                          href={`https://iccv1.herokuapp.com/downloadFile/${study.studyId}`}
                        >
                          <Typography noWrap>
                            <span style={{ fontWeight: "lighter" }}>
                              {" "}
                              {study.studyDay.slice(0, 6)}
                              {study.studyDay.slice(8, 10)} -{" "}
                            </span>
                            <span className={classes.name}>
                              {study.speaker.firstName} {study.speaker.lastName}
                            </span>
                          </Typography>

                          <Typography noWrap>
                            <span
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              {" "}
                              {study.studyReference.passage}
                            </span>{" "}
                            {" > "}
                            <span>{study.studyReference.content}</span>
                          </Typography>
                        </a>
                      </TableCell>
                    </Hidden>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ padding: "10px", maxWidth: "110%" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={studies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Ebm;

/*
.table tbody tr:nth-child(even){
  backgroundColor: #f5f5f5
}
*/
