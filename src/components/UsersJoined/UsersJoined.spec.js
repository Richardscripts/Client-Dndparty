import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UsersJoined from './UsersJoined';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <UsersJoined current_joined_users={[]} />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
