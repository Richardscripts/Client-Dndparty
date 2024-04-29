import React from 'react';
import { Route } from 'react-router-dom';

import { AppLayout } from './Components/App/AppLayout';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={AppLayout} />
  </BrowserRouter>,
  document.getElementById('root'),
);
