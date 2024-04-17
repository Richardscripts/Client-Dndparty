import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UserProfile from './UserProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');

  function handleEndLoading() {}
  function handleStartLoading() {}

  ReactDOM.render(
    <BrowserRouter>
      <UserProfile
        match={{ params: { pary_id: 1 } }}
        handleStartLoading={handleStartLoading}
        handleEndLoading={handleEndLoading}
      />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
