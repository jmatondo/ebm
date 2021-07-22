import React, { useEffect, useState } from "react";

import {
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
import {
  TableContainer,
  TableHead,
  Table,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHeader from "../components/TableHeader";
import { red } from "@material-ui/core/colors";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import PageHeader from "../components/PageHeader";
import SubjectIcon from "@material-ui/icons/Subject";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "blue",
    },

    searchIc: {
      //width: "100px",
    },
  },
  speaker: {
    color: "blue",
    backgroundColor: "lightGreen",
    width: "fit-content",
    borderRadius: "5px",
  },
  tableContainer: {
    borderRadius: 15,
    margin: "30px",
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
  //Define data

  const columns = [
    { title: "Date", field: "studyDay" },
    { title: "Passage", field: "studyReference.passage" },
    {
      title: "Orateur",
      field: "speaker.lastName",
      render: (row) => (
        <div className={classes.speaker}>
          {row.speaker.firstName + " " + row.speaker.lastName}
        </div>
      ),
    },
  ];

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
        title="Liste des notes"
        subTitle="Choisisez et téléchargez les notes (pdf)"
        icon={<SubjectIcon fontSize="large" />}
      />
      <Paper className={classes.tableContainer}>
        <Toolbar>
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
        <TableContainer>
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
                  <TableRow key={index}>
                    <TableCell>{study.studyId}</TableCell>
                    <TableCell>
                      {study.speaker.firstName} {study.speaker.lastName}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Tooltip title={study.studyReference.content}>
                        <Typography>{study.studyReference.passage}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{study.studyDay}</TableCell>
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
                      {/*                       {study.docs !== null ? (
                        <a
                          href={`https://iccv1.herokuapp.com//downloadFile/${study.studyId}`}
                          download={study.docs.docName}
                        >
                          <IconButton
                            color="secondary"
                            //onClick={() => onDownloadHandler(study.studyId)}
                          >
                            <GetAppIcon />
                          </IconButton>
                        </a>
                      ) : (
                        "Indisponible"
                      )} */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
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
