import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ShowImage from '../showImage/ShowImage';

describe(`Product component`, () => {
it('renders the Product', () => {
  const div = document.createElement('div');
  const [product] = [0];
  ReactDOM.render(
    <BrowserRouter>
      <ShowImage item={product} url="product" />
    </BrowserRouter>,
    div
  )
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});
})

