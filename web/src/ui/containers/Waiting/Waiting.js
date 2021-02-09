import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

const Waiting = () => {
  return (
    <Grid container alignItems="center" justify="center">
      <CircularProgress />
    </Grid>
  );
};

export default Waiting;
