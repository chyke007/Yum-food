import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_CHECKOUT_IN_HISTORY,
    CLEAR_CHECKOUT_FROM_HISTORY
  } from "../types";

  const initialState = { isLoggedIn: false, user: null, checkout:false };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
        case SET_CHECKOUT_IN_HISTORY:
        return {
          ...state,
          checkout:true
        };
        case CLEAR_CHECKOUT_FROM_HISTORY:
        return {
          ...state,
          checkout:false
        };
      default:
        return state;
    }
  }

  //Selectors
export const selectFirstName = (state) => {
    return state.user.data.name.split(' ')[0];
};
export const selectLastName = (state) => {
    return state.user.data.name.split(' ')[1];
};
export const selectToken = (state) => {
    return state.user ? state.user.data.token : state.user
}
export const selectRole = (state) => {
    return state.user ? state.user.data.accountType : state.user
}
export const selectCheckout = (state) => {
    return state.checkout
}