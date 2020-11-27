import {
    SET_ORDER,APPEND_ORDER,EDIT_ORDER,UPDATE_STATUS,DELETE_ORDER
  } from "../types";

const initialState = null;

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ORDER:
        return  {items:payload.order.data};
      case APPEND_ORDER:
          return {
            ...state,
            items: [...state.items,...payload.order.data]
          };
      case EDIT_ORDER:
          return {
            ...state,
            items: state.items.map((r) => String(r._id) === String(payload.order.data._id) ? payload.order.data : r)
          }
      case UPDATE_STATUS:
          return {
              ...state,
              items: state.items.map((r) => String(r._id) === String(payload.order.data._id) ? payload.order.data : r)
          }
      case DELETE_ORDER:
          return {
              ...state,
            items: state.items.filter((r) => String(r._id) !== String(payload.order.data._id))
          }
      default:
        return state;
    }
  }

//Selectors
export const selectOrder = (state) =>  state && state
