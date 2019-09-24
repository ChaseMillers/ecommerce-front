import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Checkout from "./Checkout";

describe(`Checkout component`, () => {
it('renders Checkout tab', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Checkout />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})