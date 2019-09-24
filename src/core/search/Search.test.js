import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Search from "./Search";

describe(`Searchbar component`, () => {
it('renders the Search bar', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})