import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AddProduct from "./AddProduct";

describe(`AddProduct component`, () => {
it('renders the AddProduct ellement', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddProduct />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})