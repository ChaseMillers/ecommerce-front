import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  openCart: false,
  products: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_CART:
      return {
        ...state,
        openCart: !state.openCart,
      };
    case types.CLOSE_CART:
      return {
        ...state,
        openCart: false,
      };

    case types.ADD_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case types.SET_CART:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
