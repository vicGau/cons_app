import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import getRoutes from './Routes';
import axios from 'axios';
import store from './store';
import './App.css';

// Add Bearer token in Authorization header for all axios requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}`: '';

  return config;
});


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        {getRoutes()}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
