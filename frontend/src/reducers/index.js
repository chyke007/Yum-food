import { combineReducers } from "redux";
import loading from "./loader";
import auth, * as fromAuth from "./auth"
import product, * as fromProduct from "./product"
import order, * as fromOrder from "./order"
import toastr from "./toastr"

const reducer = combineReducers({loading, auth,product,order,toastr });


//All Selectors
export const selectFullName = (state) => fromAuth.selectFullName(state.auth)
export const selectFirstName = (state) => fromAuth.selectFirstName(state.auth)
export const selectLastName = (state) => fromAuth.selectLastName(state.auth)
export const selectToken = (state) => fromAuth.selectToken(state.auth)
export const selectRole = (state) => fromAuth.selectRole(state.auth)
export const selectEmail = (state) => fromAuth.selectEmail(state.auth)
export const selectPhone = (state) => fromAuth.selectPhone(state.auth)
export const selectCheckout = (state) => fromAuth.selectCheckout(state.auth)

//Product Selectors
export const selectProduct = (state) => fromProduct.selectProduct(state.product)

//Order Selectors
export const selectOrder = (state) => fromOrder.selectOrder(state.order)
export default reducer;