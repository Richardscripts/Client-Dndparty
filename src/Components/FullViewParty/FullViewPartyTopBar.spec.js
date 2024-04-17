import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import FullViewPartyTopBar from './FullViewPartyTopBar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <FullViewPartyTopBar />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
