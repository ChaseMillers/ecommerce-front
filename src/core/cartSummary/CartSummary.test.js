import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import CartSummary from "./CartSummary";

describe(`CartSummary component`, () => {
it('renders the CartSummary page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CartSummary />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})