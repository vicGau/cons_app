import React from 'react';
import { Grid, Typography } from '@material-ui/core';

function Header(props) {
    const { firstName, lastName, companyName } = props;

    return (
        <Grid container>
            <Grid item md={6} sm={12}>
                <Typography component="h2" variant="title2">
                    Connected as: {firstName} {lastName}
                </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
                <Typography component="h2" variant="title2" align="right">
                    Company : {companyName}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Header;
