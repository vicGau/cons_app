import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import defaultTheme from '../defaultTheme';

const useStyles = makeStyles({
  wrapper: {
    height: '100%',
  },
});

const Wrapper = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className={classes.wrapper}>{children}</div>
    </ThemeProvider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
