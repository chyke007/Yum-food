import { LOGIN_FAIL,LOGIN_SUCCESS,REGISTER_FAIL,REGISTER_SUCCESS, LOGOUT,SET_CHECKOUT_IN_HISTORY,CLEAR_CHECKOUT_FROM_HISTORY } from "../types";
import { showMessage} from "./toastr"
import {setLoader} from "./loader"
import {auth} from "../services"

//Default toastr
let toastrInfoOption = {
    icon: 'success',
    status: 'success'
  }

//Login
  function loginFailed (res){
    return async (dispatch) => {
        dispatch({
            type: LOGIN_FAIL,
          });

    showMessage(res.error.title,res.error.message, {icon:'error', status:'error'}) (dispatch);
    }
}

export function login(email,password) {
    return async (dispatch,getState) => {
        dispatch(setLoader(true))
        let res = await auth.login(email,password);
        dispatch(setLoader(false))
        if (!res.data) return loginFailed(res)(dispatch);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: res.data },
        });
        let checkout = getState().auth.checkout;
        if (checkout){
            showMessage('Welcome back',"You can continue shopping now", {icon:'info', status:'info'}) (dispatch);
        }else{
            showMessage('Success',"Welcome back", toastrInfoOption) (dispatch);
        }
        return true
    };
}

//Register

function registerFailed (res){
    return async (dispatch) => {
        dispatch({
            type: REGISTER_FAIL,
          });

    showMessage(res.error.title,res.error.message, {icon:'error', status:'error'}) (dispatch);
    }
}
export function register(name,phone, email, password) {
    return async (dispatch) => {
        dispatch(setLoader(true))
        let res = await auth.register(name,phone, email, password);
        dispatch(setLoader(false))
        if (!res.data) return registerFailed(res)(dispatch);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { user: res.data },
        });
        showMessage('Success',"Your account has been created", toastrInfoOption) (dispatch);
        return true
    };
}


//Logout
export function logout(email,password) {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT
          });
        showMessage('Success',"Logged out", toastrInfoOption) (dispatch);
    };
}
export function setCheckout(email,password) {
    return async (dispatch) => {
        dispatch({
            type: SET_CHECKOUT_IN_HISTORY
          });
          showMessage("Unauthorized","Login to your account to continue your purchase", {icon:'info', status:'info'}) (dispatch);

    };
}
export function clearCheckout(email,password) {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_CHECKOUT_FROM_HISTORY
          });
    };
}