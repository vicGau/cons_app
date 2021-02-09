import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import AppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function Layout(props) {
  const classes = useStyles();
  const { children, title } = props;
  return (
    <div className={classes.root}>
      <AppBar title="Booking System" subtitle={title} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

Layout.defaultProps = {
  title: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};


export default Layout;
