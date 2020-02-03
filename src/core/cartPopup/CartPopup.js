import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/cart/actionTypes';

import Card from '../card/Card';
import { itemTotal, getCart } from '../cartHelpers';
import './CartPopup.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cart.openCart) {
      setItems(getCart());
    }
    return () => {};
  });


  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/checkout" />;
    }
  };

  const noItemsMessage = () => (
    <h1 className="emptey-cart-message">
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h1>
  );

  return (
    cart.openCart && (
      <div className="cart-layout">
        {shouldRedirect(redirect)}
        <h1>
          <span className="you-cart-title">Your Cart - </span>$
          {itemTotal() ? itemTotal() : 0}
        </h1>
        <button
          className="button-exit"
          onClick={() => dispatch({ type: types.CLOSE_CART })}
        >
          X
        </button>
        <button
          className={items.length > 0 ? 'button-green checkout-button' : 'none'}
          onClick={() => {
            setRedirect(true);
          }}
        >
          CHECKOUT
        </button>
        <hr />
        {items.length > 0 ? null : noItemsMessage()}
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    )
  );
};

export default Cart;
