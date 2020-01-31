import * as types from './actionTypes';
import {
  itemTotal,
  getCart,
  addItem,
  removeItem,
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
