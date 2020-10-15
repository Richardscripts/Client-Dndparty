import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CreatePartyTopBar from './CreatePartyTopBar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <CreatePartyTopBar />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
