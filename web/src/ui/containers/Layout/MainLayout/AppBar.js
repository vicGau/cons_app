import { IconButton } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  logo: {
    width: 100,
  },
  title: {
    paddingTop: theme.spacing(2),
  },
  menuIcon: {
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function AppBar(props) {
  const { title } = props;
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    props.toggleSidebar();
  };

  return (
    <MuiAppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        
        <Typography edge="start" className={classes.title} variant="h3">
          {title}
        </Typography>
        <div className={classes.grow} />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
