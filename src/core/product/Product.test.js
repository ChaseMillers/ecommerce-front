import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Product from "./Product";

describe(`Product component`, () => {
it('renders the Product', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})