import { SET_PRODUCT,APPEND_PRODUCT} from "../types";
import { showMessage} from "./toastr"
import {setLoader,setPagination,setPageState} from "./loader"
import {product} from "../services"

//Default toastr
// let toastrInfoOption = {
//     icon: 'success',
//     status: 'success'
//   }

//Get product
  function productFailed (res){
    return async (dispatch) => {
      showMessage(res.error.title,res.error.message, {icon:'error', status:'error'}) (dispatch);
    }
}

export function getProducts(filters,page={}) {
    return async (dispatch) => {
      page.next_page_url ? dispatch(setPageState(true)):dispatch(setLoader(true))
        let res = await product.getProducts(`${filters}${page.next_page_url ? page.next_page_url :'' }`);
        page.next_page_url ? dispatch(setPageState(false)):dispatch(setLoader(false))
        if (!res.data) return productFailed(res)(dispatch);
        if(page.next_page_url) {
          dispatch({
            type: APPEND_PRODUCT,
            payload: { product: res.data },
          });
        }else{
          dispatch({
            type: SET_PRODUCT,
            payload: { product: res.data },
        });

        }
        let paginate = product.makePagination(
          { current_page: res.data.page, total: res.data.total },
          { prev: res.data.prev, next: res.data.next }
          )
        dispatch(setPagination(paginate))

        // showMessage('Success',"Items have been fetched", toastrInfoOption) (dispatch);
        return true
    };
}