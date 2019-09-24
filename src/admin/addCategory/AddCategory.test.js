import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AddCategory from "./AddCategory";

describe(`AddCategory component`, () => {
it('renders the AddProduct ellement', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddCategory />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})