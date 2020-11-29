import { combineReducers } from "redux";
import loading from "./loader";
import auth, * as fromAuth from "./auth"
import product, * as fromProduct from "./product"
import order, * as fromOrder from "./order"
import cart, * as fromCart from "./cart"
import toastr from "./toastr"

const reducer = combineReducers({loading, auth,product,order,cart,toastr });


//All Selectors
export const selectFullName = (state) => fromAuth.selectFullName(state.auth)
export const selectFirstName = (state) => fromAuth.selectFirstName(state.auth)
export const selectLastName = (state) => fromAuth.selectLastName(state.auth)
export const selectToken = (state) => fromAuth.selectToken(state.auth)
export const selectRole = (state) => fromAuth.selectRole(state.auth)
export const selectEmail = (state) => fromAuth.selectEmail(state.auth)
export const selectId = (state) => fromAuth.selectId(state.auth)
export const selectPhone = (state) => fromAuth.selectPhone(state.auth)
export const selectCheckout = (state) => fromAuth.selectCheckout(state.auth)

//Product Selectors
export const selectProduct = (state) => fromProduct.selectProduct(state.product)
export const selectProductItems = (state) => fromProduct.selectProductItems(state.product)
//Order Selectors
export const selectOrder = (state) => fromOrder.selectOrder(state.order)

//Cart Selectors
export const selectCart = (state) => fromCart.selectCart(state.cart)
export const selectCartItems = (state) => fromCart.selectCartItems(state.cart)

export default reducer;