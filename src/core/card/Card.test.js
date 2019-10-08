import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Card from "./Card";
import Shop from "../shop/Shop"

describe(`Cart component`, () => {
  it('renders the Card ellement', () => {
    const div = document.createElement('div');
    const [product] = [0];
    ReactDOM.render(
      <BrowserRouter>
        <Shop>
            <Card product={product}/>
        </Shop>
      </BrowserRouter>,
      div
    )
    //clean up code
    ReactDOM.unmountComponentAtNode(div);
  });
})

