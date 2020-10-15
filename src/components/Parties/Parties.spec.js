import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Parties from './Parties';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Parties />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
