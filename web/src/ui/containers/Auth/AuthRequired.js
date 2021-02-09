import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { AUTH_LOGIN_ROUTE } from '../../../common/appRoutes';


const AuthRequired = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {localStorage.getItem('token') ?
        <Component />
      :
        <Redirect to={{ pathname: AUTH_LOGIN_ROUTE, state: { from: location } }} />
      }
    </Route>
  );
};

export default AuthRequired;
