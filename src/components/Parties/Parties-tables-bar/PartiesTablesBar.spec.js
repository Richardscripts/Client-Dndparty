import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import PartiesTablesBar from './PartiesTablesBar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <PartiesTablesBar />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
