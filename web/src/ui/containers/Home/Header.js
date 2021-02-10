import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

function Header(props) {
    const { auth } = props;

    return (
        <Grid container>
            <Grid item md={6}>
                <Typography component="h2" variant="title2">
                    {auth.firstName} {auth.lastName}
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Typography component="h2" variant="title2">
                    Company : {auth.company.name}
                </Typography>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Header);
