// Fragment is used to wrap multiple objects
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/cart/actionTypes';

// withRouter is for props history
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../../auth';
import { itemTotalCount } from '../cartHelpers';
import Cart from '../cartPopup/CartPopup';
import './Menu.css';

const isActiveSign = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#000000' };
  }
};

const Menu = ({ history }) => {
  const disptach = useDispatch();
  const cart = useSelector(state => state.cart);
  const [count, setCount] = useState();
  useEffect(() => {
    setCount(itemTotalCount());
    return () => {};
  });
  return (
    <div className="header">
      <div className="signup-menu">
      {!isAuthenticated() || isAuthenticated().user.role === 2 ? (
            <Fragment>
              <li className="sign-item">
                <Link
                  className="sign-link"
                  style={isActiveSign(history, '/signup')}
                  to="/signup"
                >
                  Create Account
                </Link>
              </li>

              <li className="sign-dot"></li>

              <li className="sign-item">
                <Link
                  className="sign-link"
                  onClick={() =>
                    signout(() => {
                      history.push('/');
                    })
                  }
                  style={isActiveSign(history, '/signin')}
                  to="/signin"
                >
                  Login
                </Link>
              </li> 
            </Fragment>
          ) : (
            ''
          )}

          {isAuthenticated() && isAuthenticated().user.role !== 2 ? (
                <li className="sign-item">
                  <div
                    className="sign-link"
                    style={{ cursor: 'pointer', color: '#ffffff' }}
                    onClick={() =>
                      signout(() => {
                        history.push('/');
                      })
                    }
                  >
                    Signout
                  <li className="signout-dot"></li>
                  </div>
                </li>
              ) : (
                ''
            )}

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="sign-item">
              <Link
                className="nav-link"
                style={isActiveSign(history, '/user/dashboard')}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="sign-item">
              <Link
                className="nav-link"
                style={isActiveSign(history, '/admin/dashboard')}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

         
      </div>
      <a href="/" className="logo">
        <img src="/images/swash-caps.webp" alt="Logo" />
      </a>
      <div className="menu-container">
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <ul className="nav">
          <li className="nav-item" id="slide">
            <Link 
            className="nav-link" 
            style={isActive(history, '/')} 
            to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/shop')}
              to="/shop"
            >
              Shop
            </Link>
          </li>

          <li className="nav-item number">
            <button
              className="nav-link cartMenuLink"
              style={{ cursor: 'pointer', color: '#000000' }}
              onClick={() => disptach({ type: types.OPEN_CART })}
            >
              Cart{''}
              <sup>
              {count >0 ? <small className="cart-number">{count}</small> : null}
              </sup>
            </button>
            <Cart />
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);
