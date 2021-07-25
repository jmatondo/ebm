import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SubjectIcon from "@material-ui/icons/Subject";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import HomeIcon from "@material-ui/icons/Home";

import {
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Avatar,
  Grid,
  Hidden,
} from "@material-ui/core";
import MicTableHeader from "../components/MicTableHeader";

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
  cont: {
    marginLeft: "5px",
    maxWidth: "95%",
    //backgroundColor: "red",
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  avatar: {
    paddingRight: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

// Sorting
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

const Mic = () => {
  // Styling
  const classes = useStyles();
  // State
  const [mics, setMics] = useState([]);
  // Sorting
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("ref");

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  // PAge
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Get data
  useEffect(() => {
    fetch("http://localhost:8981/iccs/mic")
      //fetch("https://iccv1.herokuapp.com/iccs/mic")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMics(data);
      });
  }, []);

  // Sorting
  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10);
    setPage(0);
  };

  // Search
  const handleSearch = (e) => {
    let tar = e.target;
    setFilterFn({
      fn: (items) => {
        if (tar === "") return items;
        else {
          return items.filter((x) => {
            console.log("Global:= ", x.globalSearch);
            return x.globalSearch.toLowerCase().includes(tar.value);
          });
        }
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Méga Impact conférence"
        subTitle="Choisisez et téléchargez les notes"
        icon={<SubjectIcon fontSize="large" />}
      />

      <Paper elevation={5} className={classes.tableContainer}>
        <Toolbar className={classes.toolbar} style={{ width: "95%" }}>
          <TextField
            style={{ width: "75%", margin: "0.5rem" }}
            variant="outlined"
            onChange={handleSearch}
            label="Recherche globale"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* <div style={{ flexGrow: "5", backgroundColor: "green" }}>test</div> */}
        </Toolbar>
        <TableContainer component={Paper} className={classes.cont}>
          <Table>
            <MicTableHeader
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              createSortHandler={createSortHandler}
            />
            <TableBody>
              {sortedRowInformation(
                filterFn.fn(mics),
                getComparator(orderDirection, valueToOrderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mic, index) => (
                  <TableRow key={index} className={classes.espa}>
                    {/*                     <TableCell>{mic.id}</TableCell>
                     */}{" "}
                    <Hidden xsDown>
                      <TableCell>{mic.micDay}</TableCell>

                      <TableCell>
                        <Grid container>
                          <Grid item lg={2}>
                            <Avatar
                              alt={mic.speaker.lastName}
                              src="/yvan.png"
                            />
                          </Grid>
                          <Grid item lg={10}>
                            <Typography>{mic.speaker.title}</Typography>
                            <Typography
                              variant="body2"
                              className={classes.name}
                            >
                              {mic.speaker.firstName} {mic.speaker.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography>{mic.theme}</Typography>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://iccv1.herokuapp.com/downloadFile/${mic.id}`}
                        >
                          <IconButton color="secondary">
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
                          href={`https://iccv1.herokuapp.com/downloadFile/${mic.id}`}
                        >
                          <Typography>
                            <span style={{ fontWeight: "lighter" }}>
                              {" "}
                              {mic.micDay.slice(0, 6)}
                              {mic.micDay.slice(8, 10)} -{" "}
                            </span>
                            <span className={classes.name}>
                              {mic.speaker.firstName} {mic.speaker.lastName}
                            </span>
                          </Typography>

                          <Typography noWrap>{mic.theme}</Typography>
                        </a>
                      </TableCell>
                    </Hidden>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ padding: "10px", maxWidth: "110%" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mics.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </>
  );
};

export default Mic;
