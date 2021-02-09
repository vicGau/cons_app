import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';
import LoginForm from './forms/LoginForm';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { HOME_ROUTE } from '../../../common/appRoutes';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(8),
  },
  linkSignUp: {
    marginTop: theme.spacing(4),
  },
  linkSignUpText: {
    textAlign: 'center'
  }

}));

function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (values) => {
    console.log(values)
    axios({
      method: 'POST',
      url: `/api/auth/login`,
      data: values,
    }).then(({ data }) => {
        props.login(data);
        localStorage.setItem('token', data.access_token);
        history.push(HOME_ROUTE);
    })
  };
  return (
    <>
      <Typography component="h1" variant="h1">
        Login
      </Typography>
      <div className={classes.form}>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </>
  );
}

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(Login);
