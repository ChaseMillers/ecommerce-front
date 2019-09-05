import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AdminDashboard from "./AdminDashboard";

describe(`AdminDashboard component`, () => {
it('renders the AdminDashboard page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})