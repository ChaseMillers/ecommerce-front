import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Checkout from "./Checkout";
import React from "react";
import Cart from "../cart/Cart"

describe(`Checkout component`, () => {
it('renders Checkout tab', () => {
  const div = document.createElement('div');
  const [items] = [0];
  ReactDOM.render(
    <BrowserRouter>
      <Cart>
        <Checkout products={items} />
      </Cart>
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
});

