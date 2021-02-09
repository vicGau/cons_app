import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  AUTH_LOGIN_ROUTE,
  HOME_ROUTE
} from './common';
import AuthRequired from './ui/containers/Auth/AuthRequired';
import Login from './ui/containers/Auth/Login';
import HomeComponent from './ui/containers/Home/Home';
import AuthenticationLayout from './ui/containers/Layout/AuthenticationLayout/Layout';
import LayoutComponent from './ui/containers/Layout/MainLayout/Layout';
import Wrapper from './ui/containers/Wrapper/Wrapper';

const AuthRequiredRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Layout title={rest.title}>
    <AuthRequired component={Component} {...rest} />
  </Layout>
);

const getRoutes = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path={AUTH_LOGIN_ROUTE}>
          <AuthenticationLayout>
            <Login/>
          </AuthenticationLayout>
        </Route>
        <AuthRequiredRoute
          exact
          path={HOME_ROUTE}
          layout={LayoutComponent}
          component={HomeComponent}
        />
      </Switch>
    </Wrapper>
  );
};

export default getRoutes;
