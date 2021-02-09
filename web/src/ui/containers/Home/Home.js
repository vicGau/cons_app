import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  },
  grid: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5)
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.grid} spacing={6}>
      </Grid>
    </Paper >
  )
}

export default Home;
