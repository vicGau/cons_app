import { Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    margin: 0,
    color: '#FFFFFF',
    position: 'absolute',
    width: '100%',
    display: 'block',
    top: '36.5%',
    fontSize: '5em',
    fontFamily: 'Avenir',
  },
  image: {
    backgroundColor: theme.palette.primary.main,
  },
  gridItem: {
    width: '100%',
    textAlign: 'center',
  },
  logoContainer: {
    position: 'relative',
    display: 'block',
    width: '500px',
    margin: 'auto',
  },
  paper: {
    margin: theme.spacing(8, 14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Grid container component="main" className={classes.root}>
      <Hidden mdDown>
        <Grid
          container
          item
          sm={4}
          md={6}
          className={classes.image}
          justify="center"
          alignItems="center"
        >
          <Grid item className={classes.gridItem}>
            <div className={classes.logoContainer}>
              <Typography variant="h1" className={classes.title}>
                Demo
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {children}
        </div>
      </Grid>
    </Grid>
  );
};

export default Layout;
