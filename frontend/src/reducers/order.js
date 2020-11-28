import {
    SET_ORDER,APPEND_ORDER,EDIT_ORDER,UPDATE_STATUS,DELETE_ORDER,
  } from "../types";
import {ADDRESS,CITY,POSTAL_CODE,COUNTRY, QTY} from "../constants"

const initialState = null;

const getTotal = (items) => {
    const itemsPrice = items.reduce((acc, next) => {
        return acc + next.total;
      }, 0);
      return itemsPrice;
}

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
          let val = {}
          switch (payload.name){
              case QTY:
                //works on the order items
                if(Number(payload.value) === 0){
                    val = state.items[payload.index].orderItems.filter((r) => String(r._id) !== String(payload.id))
                }else{
                    val = state.items[payload.index].orderItems.map((r) => {
                        if(String(r._id) === String(payload.id)){
                            return {...r,qty:payload.value, total: Number(payload.value) * Number(r.price)}
                        }else{
                            return r
                        }
                    })
                }
                //assigns the updated order item values back to the order object
                val = {
                    ...state,
                    items: state.items.map((r) => String(r._id) === String(payload._id) ? {...r,orderItems:val, totalPrice: getTotal(val)} : r)
                }
            break;
            case ADDRESS:
            val = {
                ...state,
                items: state.items.map((r) => String(r._id) === String(payload._id) ? {...r, shipping: {...r.shipping,address:payload.value}} : r)
            }
            break;
            case CITY:
            val = {
                ...state,
                items: state.items.map((r) => String(r._id) === String(payload._id) ? {...r, shipping: {...r.shipping,city:payload.value}} : r)
            }
            break;
            case POSTAL_CODE:
            val = {
                ...state,
                items: state.items.map((r) => String(r._id) === String(payload._id) ? {...r, shipping: {...r.shipping,postalCode:payload.value}} : r)
            }
            break;
            case COUNTRY:
            val = {
                ...state,
                items: state.items.map((r) => String(r._id) === String(payload._id) ? {...r, shipping: {...r.shipping,country:payload.value}} : r)
            }
            break;
            default:
               val = {...state}
          }
          return val
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
