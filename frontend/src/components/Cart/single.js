import React, {useState} from "react";
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editItems } from "../../actions/cart";
import { selectToken,selectCart,selectCartItems } from "../../reducers";
import Shipping from "../Product/shipping";
import CartCheckout from "./checkout";
import {SingleProduct} from "../../styles/layout";
import {CITY, ADDRESS, POSTAL_CODE, COUNTRY} from "../../constants"
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import {validateDelivery} from '../../helper'

const Single = (props) => {

  const [errors, setErrors] = useState({});
  if(!props.cartItems || props.cartItems.length === 0) return <Redirect to="/product" />

  const proceedToPlaceOrder = async () => {
    //perform validation
    let check = validateDelivery(props.cart.shippingData)
    let dis = {}
    if (check.valid === false) {
    if (check.errors.address) {
        dis.address = check.errors.address
        setErrors(dis)
    }
    if (check.errors.city) {
        dis.city = check.errors.city
        setErrors(dis)
    }
    if (check.errors.postalCode) {
        dis.postalCode = check.errors.postalCode
        setErrors(dis)
    }
    if (check.errors.country) {
        dis.country = check.errors.country
        setErrors(dis)
    }
    return
    }
    setErrors({})
    //route to placeOrder
    props.history.push("/placeorder")
}

  const handleFilterChange = (e,filterType,_id,id) => {
    switch(filterType){
      case ADDRESS:
          props.editItems(id,ADDRESS,e.target.value)
          break;
      case CITY:
          props.editItems(id,CITY,e.target.value)
          break;
      case POSTAL_CODE:
          props.editItems(id,POSTAL_CODE,e.target.value)
          break;
      case COUNTRY:
          props.editItems(id,COUNTRY,e.target.value)
          break;
      default: break
    }
  }

    return (
        <SingleProduct>
 <section>
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
    <div className="mb-5 p-6  text-lg font-bold  xl:hidden">
            <NavLink to="/checkout" className="flex flex-wrap w-full  cursor-pointer">
                <img className="w-8" src={Back_Arrow} alt="back"/>
            </NavLink>
        </div>
        <div>
            <ul id="progressbar" className="flex w-full justify-center mb-12">
                <li className="active w-1/3 text-center " id="account"><strong>Account</strong></li>
                <li className="active w-1/3 text-center" id="shipping"><strong>Shipping</strong></li>
                <li className="w-1/3 text-center" id="confirm"><strong>Place Order</strong></li>
            </ul>
        </div>
        <Shipping shipping={props.cart && props.cart.shippingData && props.cart.shippingData} change={handleFilterChange} errors={errors}/>

    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-4">
        <div className="mb-5 p-6  text-lg font-bold hidden xl:block">
            <NavLink to="/checkout" className="flex flex-wrap w-full  cursor-pointer">
                <img className="w-1/5" src={Back_Arrow} alt="ddd"/>
            </NavLink>
        </div>
        <CartCheckout header={`Subtotal `} qty={props.cartItems && props.cartItems.length} total={props.cart && props.cart.totalPrice} items={props.cart && props.cart.totalPrice} shipping={0} tax={0}>
        {/* <NavLink to="/placeorder"> */}
            <button onClick={() => proceedToPlaceOrder() } className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
            Proceed to place order
            </button>
        {/* </NavLink> */}
        </CartCheckout>
    </section>
    </div>
 </section>

        </SingleProduct>
    )

}

const mapStateToProps = (state) => ({
    token: selectToken(state),
    cart: selectCart(state),
    cartItems: selectCartItems(state)
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editItems }, dispatch);
  };

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Single));