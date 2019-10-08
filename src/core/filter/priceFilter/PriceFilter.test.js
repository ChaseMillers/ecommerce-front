import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import PriceFilter from "./PriceFilter";

describe(`PriceFilter component`, () => {
it('renders the price filters section', () => {
  const div = document.createElement('div');
  const prices = [0]
  ReactDOM.render(
    <BrowserRouter>
      <PriceFilter prices={prices}/>
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})
