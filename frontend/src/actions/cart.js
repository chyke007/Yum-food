import { ADD_CART,EDIT_CART, DELETE_CART} from "../types";
import { showMessage} from "./toastr"
import {setLoader} from "./loader"
import {order} from "../services"
import { getOrders } from "./order";

//Default toastr
let toastrInfoOption = {
    icon: 'success',
    status: 'success'
  }

  //failure
  function orderFailed (res,add = ""){
    return async (dispatch) => {
      showMessage(res.error.title,res.error.message+add, {icon:'error', status:'error'}) (dispatch);
    }
  }

export function addItem(name,price,qty,total,product,image) {
    return async (dispatch) => {
        dispatch({
            type: ADD_CART,
            payload: { name,price,qty,total,product,image},
        });
        return true
    };
}
  export function editItems(id,name,value) {
      return async (dispatch) => {
          dispatch({
              type: EDIT_CART,
              payload: { id,name,value },
          });
          return true
      };
  }

export function placeOrder(data){
    let failureMessage = '';
    return async (dispatch) => {
        dispatch(setLoader(true))
          let res = await order.addOrder(data);
          dispatch(setLoader(false))
          if (!res.data) return orderFailed(res,failureMessage)(dispatch);
          showMessage('Success',"Order has been placed", toastrInfoOption) (dispatch);
          dispatch({
                type: DELETE_CART,
                payload: data,
          });
          //fetch new orders
          let orders = await dispatch(getOrders())
          if(orders) return res.data.data._id
          showMessage('Issue',"An error occured while fetching orders list after placing order",{
            icon: 'warning',
            status: 'warning'
          }) (dispatch);
          return false

    };
}