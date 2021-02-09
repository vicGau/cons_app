import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import getRoutes from './Routes';
import store from './store';
import './App.css';

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
