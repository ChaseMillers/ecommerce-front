import * as types from './actionTypes';
import {
  getCart,
  addItem,
  removeItem,
  updateItem,
} from '../../core/cartHelpers';

export function addCart(product) {
  return dispatch => {
    addItem(product, () => {});
    // dispatch({ type: types.LOGIN_REQUEST, payload: userInfo });
  };
}
export function removeCart(productId) {
  return dispatch => {
    removeItem(productId);

    dispatch({ type: types.SET_CART, payload: getCart() });
  };
}
export function updateCartItem(productId, value) {
  return dispatch => {
    updateItem(productId, value);

    dispatch({ type: types.SET_CART, payload: getCart() });
  };
}
