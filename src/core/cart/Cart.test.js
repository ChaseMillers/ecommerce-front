import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Cart from "./Cart";

describe(`Cart component`, () => {
it('renders the Cart page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})