import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Layout from "./Layout";

describe(`Layout component`, () => {
it('renders the layout for products Layout', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})