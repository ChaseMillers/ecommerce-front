import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Checkbox from "./Checkbox";

describe(`Checkbox component`, () => {
it('renders Checkbox filter', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Checkbox />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})