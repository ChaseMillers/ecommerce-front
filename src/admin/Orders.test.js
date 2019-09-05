import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Orders from "./Orders";

describe(`Orders component`, () => {
it('renders the prevoius Orders', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Orders />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})