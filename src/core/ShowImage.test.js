import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ShowImage from "./ShowImage";

describe(`ShowImage component`, () => {
it('renders the ShowImage page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ShowImage />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})