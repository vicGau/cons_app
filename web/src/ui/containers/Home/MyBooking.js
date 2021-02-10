import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Button from '../../components/Button/Button';

const useStyles = makeStyles(theme => ({
    cancelButton: {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
    }
}));

function MyBooking(props) {
    const { booking, handleOpenCancelPopIn } = props;
    const classes = useStyles();
    return (
        <>
            <Typography component="h1" variant="title1">
                My booking :
            </Typography>
            {booking !== null ?
                <Grid container>
                    <Grid item md={6} sm={12}>
                        <Typography component="h3" variant="title2">
                            Room name: {booking.room.name}
                        </Typography>
                        <Typography component="h3" variant="title2">
                            Description: {booking.description}
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={12} alignContent="right">
                        <Button variant="outlined" onClick={handleOpenCancelPopIn} className={classes.cancelButton}>
                            Cancel booking
                        </Button>
                    </Grid>
                </Grid>
                :
                <Typography component="h2" variant="title2">
                    You have no room booked for the event yet.
            </Typography>
            }
        </>
    )
}

export default MyBooking;
