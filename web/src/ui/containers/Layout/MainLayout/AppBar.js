import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MuiAppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '../../../components/Button/Button';
import { logout } from '../../../../redux/actions/auth';
import { AUTH_LOGIN_ROUTE } from '../../../../common/appRoutes';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    color: 'white',
  }
});

function AppBar(props) {
  const { title, logout } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    history.push(AUTH_LOGIN_ROUTE);
  };

  return (
    <MuiAppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Typography edge="start" variant="h3">
          {title}
        </Typography>
        <div className={classes.grow} />
        <Button className={classes.button} onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </MuiAppBar>
  );
}

const mapDispatchToProps = {
  logout,
}

export default connect(null, mapDispatchToProps)(AppBar);
