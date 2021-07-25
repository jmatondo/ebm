import React from "react";
import {
  Hidden,
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#220d53",
    color: theme.palette.getContrastText("#220d53"),
  },
}));

const TableHeader = (props) => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        <Hidden xsDown>
          <TableCell key="studyDay" className={classes.tableHeaderCell}>
            <TableSortLabel
              active={props.valueToOrderBy === "studyDay"}
              direction={
                props.valueToOrderBy === "studyDay"
                  ? props.orderDirection
                  : "desc"
              }
              onClick={props.createSortHandler("studyDay")}
            >
              Jour
            </TableSortLabel>
          </TableCell>

          <TableCell key="speaker" className={classes.tableHeaderCell}>
            <TableSortLabel
              active={props.valueToOrderBy === "speaker"}
              direction={
                props.valueToOrderBy === "speaker"
                  ? props.orderDirection
                  : "desc"
              }
              onClick={props.createSortHandler(
                "speaker.firstName" + " " + "speaker.lastName"
              )}
            >
              Orateur
            </TableSortLabel>
          </TableCell>
          <TableCell key="studyReference" className={classes.tableHeaderCell}>
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

          <TableCell className={classes.tableHeaderCell}>
            <TableSortLabel>Actions</TableSortLabel>
          </TableCell>
        </Hidden>
        <Hidden smUp>
          <TableCell
            className={classes.tableHeaderCell}
            style={{ display: "flex", justifyContent: "center" }}
          >
            Texte du jour
          </TableCell>
        </Hidden>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
