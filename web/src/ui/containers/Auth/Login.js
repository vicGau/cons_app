import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { AUTH_API_BASE_URL, HOME_ROUTE, LOGIN_RESOURCE } from '../../../common';
import { login } from '../../../redux/actions';
import LoginForm from './forms/LoginForm';

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
  },
}));

function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (values) => {
    axios.post(`${AUTH_API_BASE_URL}/${LOGIN_RESOURCE}`, values)
    .then(({ data }) => {
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
