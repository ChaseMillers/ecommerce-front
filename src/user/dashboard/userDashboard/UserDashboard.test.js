import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Dashboard from "./UserDashboard";


describe(`Dashboard component`, () => {
it('renders the complete Dashboard', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})