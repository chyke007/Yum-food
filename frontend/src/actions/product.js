import { SET_PRODUCT } from "../types";
import { showMessage} from "./toastr"
import {setLoader} from "./loader"
import {product} from "../services"

//Default toastr
let toastrInfoOption = {
    icon: 'success',
    status: 'success'
  }

//Get product
  function productFailed (res){
    return async (dispatch) => {
      showMessage(res.error.title,res.error.message, {icon:'error', status:'error'}) (dispatch);
    }
}

export function getProduct(filters) {
    return async (dispatch) => {
        dispatch(setLoader(true))
        let res = await product.getProduct(filters);
        dispatch(setLoader(false))
        if (!res.data) return productFailed(res)(dispatch);
        dispatch({
            type: SET_PRODUCT,
            payload: { product: res.data },
        });
        showMessage('Success',"Items have been fetched", toastrInfoOption) (dispatch);
        return true
    };
}
