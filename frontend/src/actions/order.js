import { SET_ORDER,APPEND_ORDER,UPDATE_STATUS, DELETE_ORDER,EDIT_ORDER} from "../types";
import { showMessage} from "./toastr"
import {setLoader,setPagination,setPageState} from "./loader"
import {order} from "../services"

//Default toastr
let toastrInfoOption = {
    icon: 'success',
    status: 'success'
  }

//Get order
  function orderFailed (res,add = ""){
    return async (dispatch) => {
      showMessage(res.error.title,res.error.message+add, {icon:'error', status:'error'}) (dispatch);
    }
}

export function getOrders(filters,page={}) {
  let failureMessage = '.Orders shown are stale data cached from previous visit,kindly refresh this page';
    return async (dispatch) => {
      page.next_page_url ? dispatch(setPageState(true)):dispatch(setLoader(true))
        let res = await order.getOrders(`${filters}${page.next_page_url ? page.next_page_url :'' }`);
        page.next_page_url ? dispatch(setPageState(false)):dispatch(setLoader(false))
        if (!res.data) return orderFailed(res,failureMessage)(dispatch);
        if(page.next_page_url) {
          dispatch({
            type: APPEND_ORDER,
            payload: { order: res.data },
          });
        }else{
          dispatch({
            type: SET_ORDER,
            payload: { order: res.data },
        });

        }
        let paginate = order.makePagination(
          { current_page: res.data.page, total: res.data.total },
          { prev: res.data.prev, next: res.data.next }
          )
        dispatch(setPagination(paginate))
        return true
    };
}

export function updateStatus(id,status) {
    let failureMessage = '';
      return async (dispatch) => {
          dispatch(setLoader(true))
          let res = await order.updateStatus(id,status);
          dispatch(setLoader(false))
          if (!res.data) return orderFailed(res,failureMessage)(dispatch);
            dispatch({
              type: UPDATE_STATUS,
              payload: { order: res.data },
          });

          showMessage('Success',"Order status has been changed", toastrInfoOption) (dispatch);
          return true
      };
  }
  export function deleteOrder(id) {
    let failureMessage = '';
      return async (dispatch) => {
          dispatch(setLoader(true))
          let res = await order.deleteOrder(id);
          dispatch(setLoader(false))
          if (!res.data) return orderFailed(res,failureMessage)(dispatch);
            dispatch({
              type: DELETE_ORDER,
              payload: { order: res.data },
          });

          showMessage('Success',"Order has been deleted", toastrInfoOption) (dispatch);
          return true
      };
  }

  export function editOrderItems(id,_id,name,value,index) {
      return async (dispatch) => {
          dispatch({
              type: EDIT_ORDER,
              payload: { id,_id,name,value,index },
          });
          return true
      };
  }

  export function editOrder(id,data) {
    let failureMessage = '';
      return async (dispatch) => {
          dispatch(setLoader(true))
          let res = await order.editOrder(id,data);
          dispatch(setLoader(false))
          if (!res.data) return orderFailed(res,failureMessage)(dispatch);
          showMessage('Success',"Order has been updated", toastrInfoOption) (dispatch);
          return true
      };
}
