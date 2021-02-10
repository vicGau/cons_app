import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';

const useStyles = makeStyles(theme => ({
    paper: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
    },
    grid: {
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(5)
    },
    table: {
        minWidth: 650,
    },
}));

function Content(props) {
    const { data } = props;
    const classes = useStyles();
    return (
        <>
            <Typography component="h1" variant="title1">
                Rooms list :
            </Typography>

            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Room name</TableCell>
                        <TableCell align="left">Availability</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">
                                {row.available ? 
                                    <Chip type="success" label="Available" size="small" />
                                : <Chip type="error" label="Not available" size="small" />}
                            </TableCell>
                            <TableCell align="left">
                                {row.available &&
                                <Button variant="contained" color="primary" size="small">Book</Button>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Content;
