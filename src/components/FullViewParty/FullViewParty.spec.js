import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import FullViewParty from './FullViewParty';

it('renders without crashing', () => {
  const div = document.createElement('div');

  function handleStartLoading() {}
  function handleEndLoading() {}

  ReactDOM.render(
    <BrowserRouter>
      <FullViewParty
        match={{ params: { pary_id: 1 } }}
        handleStartLoading={handleStartLoading}
        handleEndLoading={handleEndLoading}
      />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
