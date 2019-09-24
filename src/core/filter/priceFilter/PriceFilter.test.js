import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import { BrowserRouter } from './node_modules/react-router-dom'
import PriceFilter from "./PriceFilter";

describe(`PriceFilter component`, () => {
it('renders the price filters section', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PriceFilter />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})