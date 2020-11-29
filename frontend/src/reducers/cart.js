import {
    ADD_CART,EDIT_CART,DELETE_CART,
  } from "../types";
import {ADDRESS,CITY,POSTAL_CODE,COUNTRY, QTY} from "../constants"

const initialState = {items: [],totalPrice:0,shippingData:{address:"",city:"",postalCode:"",country:""}};

const getTotal = (items) => {
    const itemsPrice = items.reduce((acc, next) => {
        return acc + next.total;
      }, 0);
      return itemsPrice;
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_CART:
          return  {...state,items:[...state.items,payload],totalPrice:getTotal([...state.items,payload])};
     case EDIT_CART:
        let val = {}
        switch (payload.name){
            case QTY:
                //works on the order items
                if(Number(payload.value) === 0){
                    val = state.items.filter((r) => String(r.product) !== String(payload.id))
                }else{
                    val = state.items.map((r) => {
                        if(String(r.product) === String(payload.id)){
                            return {...r,qty:payload.value, total: Number(payload.value) * Number(r.price)}
                        }else{
                            return r
                        }
                    })
                }
                //assigns the updated cart item values back to the cart object
                val = {
                    ...state,
                    totalPrice:getTotal(val),
                    items:val
                }
                break;
                case ADDRESS:
                val = {
                    ...state,
                    shippingData:{...state.shippingData,address:payload.value}
                }
                break;
                case CITY:
                val = {
                    ...state,
                    shippingData:{...state.shippingData,city:payload.value}
                }
                break;
                case POSTAL_CODE:
                val = {
                    ...state,
                    shippingData:{...state.shippingData,postalCode:payload.value}
                }
                break;
                case COUNTRY:
                val = {
                    ...state,
                    shippingData:{...state.shippingData,country:payload.value}
                }
                break;
                default:
                   val = {...state}
              }
              return val
          case DELETE_CART:
            return {
              ...state,
              items: [],
              totalPrice:0

            };
        default:
        return state;
    }
  }

//Selectors
export const selectCart = (state) =>  state && state
export const selectCartItems = (state) =>  state && state.items && state.items