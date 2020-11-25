import {
    SET_PRODUCT,
  } from "../types";

  const initialState = { product: null };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PRODUCT:
        return {
          ...state,
          product: payload.product,
        };
      default:
        return state;
    }
  }

//Selectors
export const selectProduct = (state) => state.product
