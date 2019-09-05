import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import RadioBox from "./RadioBox";

describe(`RadioBox component`, () => {
it('renders the price filters section', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RadioBox />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})