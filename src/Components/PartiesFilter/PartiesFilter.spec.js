import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import PartiesFilter from './PartiesFilter';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <PartiesFilter />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
