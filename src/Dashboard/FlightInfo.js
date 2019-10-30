import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'; 
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow); 
 
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table"> 
        <TableBody> 
            <StyledTableRow key={props.icao24}>
              <StyledTableCell component="th" scope="row">
                <b>AIRCRAFT ICAO24 NAME</b>
              </StyledTableCell>
              <StyledTableCell align="right">{props.icao24}</StyledTableCell> 
            </StyledTableRow>
            <StyledTableRow key={props.callsign}>
              <StyledTableCell component="th" scope="row">
              <b>Call Sign</b>
              </StyledTableCell>
              <StyledTableCell align="right">{props.callsign}</StyledTableCell> 
            </StyledTableRow>
            {
                props.value === 1 && 
                <>
                    <StyledTableRow key={props.estArrivalAirport}>
                        <StyledTableCell component="th" scope="row">
                        <b>Origin Airport</b>
                        </StyledTableCell>
                        <StyledTableCell align="right">{props.estArrivalAirport}</StyledTableCell> 
                    </StyledTableRow>
                    <StyledTableRow key={props.estArrivalAirportHorizDistance}>
                        <StyledTableCell component="th" scope="row">
                        <b>Airport Horizontal Distance</b>
                        </StyledTableCell>
                        <StyledTableCell align="right">{props.estArrivalAirportHorizDistance}</StyledTableCell> 
                    </StyledTableRow>
                    <StyledTableRow key={props.estArrivalAirportVertDistance}>
                        <StyledTableCell component="th" scope="row">
                        <b>Airport Vertical Distance</b>
                        </StyledTableCell>
                        <StyledTableCell align="right">{props.estArrivalAirportVertDistance}</StyledTableCell> 
                    </StyledTableRow>
                </>
            }
            {
                props.value === 0 && 
                <>
                <StyledTableRow key={props.estDepartureAirport}>
                    <StyledTableCell component="th" scope="row">
                    <b>Destination Airport</b> 
                    </StyledTableCell>
                    <StyledTableCell align="right">{props.estDepartureAirport}</StyledTableCell> 
                </StyledTableRow>
                <StyledTableRow key={props.estDepartureAirportHorizDistance}>
                    <StyledTableCell component="th" scope="row">
                    <b>Airport Horizontal Distance</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">{props.estDepartureAirportHorizDistance}</StyledTableCell> 
                </StyledTableRow>
                <StyledTableRow key={props.estDepartureAirportVertDistance}>
                    <StyledTableCell component="th" scope="row">
                    <b>Airport Vertical Distance</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">{props.estDepartureAirportVertDistance}</StyledTableCell> 
                </StyledTableRow>
                </>
            }
           
            <StyledTableRow key={props.firstSeen}>
              <StyledTableCell component="th" scope="row">
                <b>First Seen</b>
              </StyledTableCell>
              <StyledTableCell align="right">{props.firstSeen}</StyledTableCell> 
            </StyledTableRow>
            <StyledTableRow key={props.lastSeen}>
              <StyledTableCell component="th" scope="row">
                <b>Last Seen</b>
              </StyledTableCell>
              <StyledTableCell align="right">{props.lastSeen}</StyledTableCell> 
            </StyledTableRow> 
        </TableBody>
      </Table>
    </Paper>
  );
}