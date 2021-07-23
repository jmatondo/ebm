import React from "react";
import {
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    //borderRadius: 15,
  },
  tableHeadCell: {
    // fontWeight: "bold",
    // backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(1),
    backgroundColor: "#220d53",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

const TableHeader = (props) => {
  const classes = useStyles();
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell key="studyId" className={classes.tableHeadCell}>
          <TableSortLabel
            active={props.valueToOrderBy === "studyId"}
            direction={
              props.valueToOrderBy === "studyId" ? props.orderDirection : "asc"
            }
            onClick={props.createSortHandler("studyId")}
          >
            ID
          </TableSortLabel>
        </TableCell>
        <TableCell key="speaker" className={classes.tableHeadCell}>
          <TableSortLabel
            active={props.valueToOrderBy === "speaker"}
            direction={
              props.valueToOrderBy === "speaker" ? props.orderDirection : "desc"
            }
            onClick={props.createSortHandler(
              "speaker.firstName" + " " + "speaker.lastName"
            )}
          >
            Orateur
          </TableSortLabel>
        </TableCell>
        <TableCell key="studyReference" className={classes.tableHeadCell}>
          <TableSortLabel
            active={props.valueToOrderBy === "studyReference"}
            direction={
              props.valueToOrderBy === "studyReference"
                ? props.orderDirection
                : "desc"
            }
            onClick={props.createSortHandler("studyReference.studyReference")}
          >
            Référence
          </TableSortLabel>
        </TableCell>

        <TableCell key="studyDay" className={classes.tableHeadCell}>
          <TableSortLabel
            active={props.valueToOrderBy === "studyDay"}
            direction={
              props.valueToOrderBy === "studyDay"
                ? props.orderDirection
                : "desc"
            }
            onClick={props.createSortHandler("studyDay")}
          >
            Référence
          </TableSortLabel>
        </TableCell>

        <TableCell className={classes.tableHeadCell}>
          <TableSortLabel>Actions</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
