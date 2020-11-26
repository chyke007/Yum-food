import {
    SET_PRODUCT,APPEND_PRODUCT
  } from "../types";

  const initialState = null;

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PRODUCT:
        return  {items:payload.product.data};
      case APPEND_PRODUCT:
          return {
            ...state,
            items: [...state.items,...payload.product.data]
          };
      default:
        return state;
    }
  }

//Selectors
export const selectProduct = (state) => state.product
