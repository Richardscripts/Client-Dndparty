import React from 'react';
import { Route } from 'react-router-dom';

import App from './components/App/App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById('root')
);
