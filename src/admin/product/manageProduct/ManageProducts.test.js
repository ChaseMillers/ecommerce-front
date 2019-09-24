import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ManageProducts from "./ManageProducts";

describe(`ManageProducts component`, () => {
it('renders the ManageProducts ellement', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ManageProducts />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})