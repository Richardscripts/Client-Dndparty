import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import OnlineOrNot from './OnlineOrNot';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <OnlineOrNot />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
