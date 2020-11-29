import {
    SET_PRODUCT,APPEND_PRODUCT,EDIT_PRODUCT,DELETE_PRODUCT
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
      case EDIT_PRODUCT:
          return {
            ...state,
            items: state.items.map((r) => String(r._id) === String(payload.product.data._id) ? payload.product.data : r)
          }
      case DELETE_PRODUCT:
        return {
          ...state,
        items: state.items.filter((r) => String(r._id) !== String(payload.product.data._id))
      }
      default:
        return state;
    }
  }

//Selectors
export const selectProduct = (state) =>  state && state.items && state.items ;
export const selectProductItems = (state) =>state && state.items && state.items
