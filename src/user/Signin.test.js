import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Signin from "./Signin";

describe(`Signin component`, () => {
it('renders the Signin page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Signin />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})