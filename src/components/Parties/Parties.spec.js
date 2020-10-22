import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Parties from './Parties';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const filtered_parties = [];

  function handleStartLoading() {}
  function handleEndLoading() {}

  ReactDOM.render(
    <BrowserRouter>
      <Parties
        handleStartLoading={handleStartLoading}
        handleEndLoading={handleEndLoading}
        filtered_parties={filtered_parties}
      />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
