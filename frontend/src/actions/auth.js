import { LOGIN_FAIL,LOGIN_SUCCESS } from "../types";
import { showMessage} from "./toastr"
import {setLoader} from "./loader"
import {auth} from "../services"
let toastrInfoOption = {
    icon: 'success',
    status: 'success'
  }

  function loginFailed (res){
    return async (dispatch) => {
        dispatch({
            type: LOGIN_FAIL,
          });
    showMessage(res.error.title,res.error.message, {icon:'error', status:'error'}) (dispatch);
    }
}

export function login(email,password) {
    return async (dispatch) => {
        dispatch(setLoader(true))
        let res = await auth.login(email,password);
        dispatch(setLoader(false))
        if (!res.data) return loginFailed(res)(dispatch);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: res.data },
          });
        showMessage('Success',"Welcome back", toastrInfoOption) (dispatch);
        return true
    };
}