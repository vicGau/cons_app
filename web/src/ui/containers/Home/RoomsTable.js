import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function Content(props) {
    const {
        data,
        handleOpenPopIn,
    } = props;

    return (
        <Table aria-label="simple table" size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Room name</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <StyledTableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell>
                            {row.available ?
                                <Chip type="success" label="Available" size="small" />
                                : <Chip type="error" label="Not available" size="small" />}
                        </TableCell>
                        <TableCell align="right">
                            {row.available &&
                                <Button variant="contained" color="primary" size="small" onClick={() => handleOpenPopIn(row.id)}>Book</Button>
                            }
                        </TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Content;
