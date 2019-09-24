import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Profile from "./Profile";

describe(`Profile component`, () => {
it('renders the Profile page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})