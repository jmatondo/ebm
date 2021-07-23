import React from "react";
import {
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

const MicTableHeader = (props) => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        <TableCell key="micDay" className={classes.tableHeaderCell}>
          <TableSortLabel
            active={props.valueToOrderBy === "micDay"}
            direction={
              props.valueToOrderBy === "micDay" ? props.orderDirection : "desc"
            }
            onClick={props.createSortHandler("micDay")}
          >
            Date
          </TableSortLabel>
        </TableCell>
        <TableCell className={classes.tableHeaderCell}>Orateur</TableCell>
        <TableCell className={classes.tableHeaderCell}>Thème</TableCell>

        <TableCell className={classes.tableHeaderCell}>Actions </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default MicTableHeader;
