import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Shop from "./Shop";

describe(`Shop component`, () => {
it('renders the Shop page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Shop />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})