import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import FullViewParty from './FullViewParty';

it('renders without crashing', () => {
  const div = document.createElement('div');

  function handleLoading() {}

  ReactDOM.render(
    <BrowserRouter>
      <FullViewParty
        match={{ params: { pary_id: 1 } }}
        handleLoading={handleLoading}
      />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
