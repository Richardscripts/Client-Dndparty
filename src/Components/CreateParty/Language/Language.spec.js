import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Language from './Language';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Language />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
