import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as types from '../../store/cart/actionTypes';
import { removeCart, updateCartItem } from '../../store/cart/actions';
import ShowImage from '../showImage/ShowImage';
import { addItem } from '../cartHelpers';
import './Card.css';

const Card = ({
  product,
  showViewProductButton = false,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showStockIcon = true,
  miniCard = false,
  storeCard = false,
  viewCard = false,
  setRun = f => f,
  run = undefined,
}) => {
  const [count, setCount] = useState(product.count);
  const dispatch = useDispatch();

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            dispatch(removeCart(product._id));
          }}
          className="button-remove"
        >
          Remove
        </button>
      )
    );
  };

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="button-blue">
          View Product
        </Link>
      )
    );
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={() => {
            addItem(product, () => {});
            dispatch({ type: types.OPEN_CART });
          }}
          className="button-yellow"
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0
      ? showStockIcon && <span className="in-stock">In Stock</span>
      : showStockIcon && <span className="in-stock ">Out of Stock</span>;
  };

  const minusCount = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    let value = count === 1 ? 1 : count - 1;
    dispatch(updateCartItem(productId, value));
    setCount(value);
  };
  const plusCount = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    let value = count + 1;
    dispatch(updateCartItem(productId, value));
    setCount(value);
  };
  useEffect(() => {
    setCount(count);
    return () => {};
  });

  const ShowCount = () => {
    return (
      <input
        aria-label="Product quantity"
        type="text"
        onChange={f => f}
        className="card-form-inputs"
        value={count}
      />
    );
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="update-options-container">
          <button
            type="button"
            className="button-counter minus"
            value={count}
            onClick={minusCount(product._id)}
          >
            -
          </button>
          <div>{ShowCount()}</div>
          <button
            type="button"
            className="button-counter plus"
            value={count}
            onClick={plusCount(product._id)}
          >
            +
          </button>
        </div>
      )
    );
  };

  const minCartCard = miniCard => {
    return (
      miniCard && (
        <div className="product-cart" tabIndex="0">
          <Link
            to={`/product/${product._id}`}
            className="product-link"
            onClick={() => dispatch({ type: types.CLOSE_CART })}
          >
            <div className="image-info-container-cart">
              <div className="image-container-cart">
                <ShowImage item={product} url="product" />
              </div>
              <div className="product-container-cart">
                <div className="product-header-cart">{product.name}</div>
                <p className="product-title-cart">
                  {product.brief.substring(0, 100)}
                </p>
                <p className="product-price-cart">${product.price}</p>
              </div>
            </div>
          </Link>
          <div className="button-holder-cart">
            {showCartUpdateOptions(cartUpdate)}
            {showRemoveButton(showRemoveProductButton)}
          </div>
          <hr />
        </div>
      )
    );
  };

  const storefrontCard = storeCard => {
    return (
      storeCard && (
        <div className="product" tabIndex="0">
           <Link
            to={`/product/${product._id}`}
            className="product-link"
          >
          <div className="product-container">
            <ShowImage item={product} url="product" />
            <div className="product-header">{product.name}</div>
            <p className="product-title">
              {product.brief.substring(0, 100)}
            </p>
            <p className="product-info">${product.price}</p>
              {/* {showStock(product.quantity)} */}
            <div className="button-holder">
              {showViewButton(showViewProductButton)}
              {/* {showAddToCart(showAddToCartButton)} */}
            </div>
          </div>
          </Link>
        </div>
      )
    );
  };

  const ViewItemCard = viewCard => {
    return (
      viewCard && (
        <div className="product-view" tabIndex="0">
          <div className="product-container-view">
            <div className="image-container-view">
              <ShowImage item={product} url="product" />
            </div>
            <div className="info-container-view">
              <div className="product-header-view">{product.name}</div>
              <p className="product-price-view">${product.price}</p>
              <p className="product-brief">
              {product.brief}
              </p>
              <p className="about-view">About</p>
              <p className="product-title-view">
              {product.description}
              </p>
              {showStock(product.quantity)}
              <div className="button-holder-view">
                {showAddToCart(showAddToCartButton)}
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div>
      {storefrontCard(storeCard)}
      {minCartCard(miniCard)}
      {ViewItemCard(viewCard)}
    </div>
  );
};

export default Card;
