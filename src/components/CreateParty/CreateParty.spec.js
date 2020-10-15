import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CreateParty from './CreateParty';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <CreateParty />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
