import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import PopupCart from "./PopupCart"

describe(`PopupCart component`, () => {
it('renders the PopupCart component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PopupCart />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})