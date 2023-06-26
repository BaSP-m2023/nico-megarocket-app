import React from 'react';
import ReactDOM from 'react-dom';
// import Layout from './Components/Layout';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
