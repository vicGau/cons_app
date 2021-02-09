import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from '../defaultTheme';

const styles = {
  wrapper: {
    // display: 'flex',
    // flexDirection: 'column',
    height: '100%',
  },
};

const Wrapper = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={styles.wrapper}>{children}</div>
    </ThemeProvider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
