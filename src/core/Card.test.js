import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Card from "./Card";

describe(`Cart component`, () => {
it('renders the Card ellement', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Card />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})