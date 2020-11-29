import React, {useState} from "react";
import { NavLink,Redirect,withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Delivery from "./delivery";
import CartItem from "./items";
import CartCheckout from "./checkout";
import { placeOrder } from "../../actions/cart";
import { selectToken,selectCart,selectCartItems } from "../../reducers";
import {SingleProduct} from "../../styles/layout";
import loader from '../../assets/img/loader-cube.svg'
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import { PaystackButton } from 'react-paystack';
import ReactGA from 'react-ga';
import { toastr } from 'react-redux-toastr'

const Order =  (props) => {
    process.env.NODE_ENV === 'production' &&  ReactGA.pageview(window.location.pathname + window.location.search)
    const [button,setButton] = useState(false);
    if(!props.cartItems || props.cartItems.length === 0) return <Redirect to="/product" />

    const config = {
        reference: (new Date()).getTime(),
        email: "admin@example.com",
        amount: Number(props.cart.totalPrice) * 100,
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
        ,

    };

    const sendOrder = async (data) => {
        setButton(true)
       let val = await props.placeOrder(data)
       if(val) return props.history.push(`/order/${val}`)
       props.history.push("/orders")
    }
    const componentProps = {
        ...config,
        text: 'Place order',
        onSuccess: () => sendOrder(props.cart),
        onClose: () => toastr.error("Error","Unknown error")
    };

    return (
        <SingleProduct>
 <section>
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
    <div className="mb-5 p-6  text-lg font-bold  xl:hidden">
            <NavLink to="/checkout/1234" className="flex flex-wrap w-full  cursor-pointer">
                <img className="w-8" src={Back_Arrow} alt="ddd"/>
            </NavLink>
        </div>
        <div>
            <ul id="progressbar" className="flex w-full justify-center mb-12">
                <li className="active w-1/3 text-center " id="account"><strong>Account</strong></li>
                <li className="active w-1/3 text-center" id="shipping"><strong>Shipping</strong></li>
                <li className="active w-1/3 text-center" id="confirm"><strong>Place Order</strong></li>
            </ul>
        </div>
        <div className="px-8 my-2 mb-4">
            <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Delivery Details</p>
            <Delivery place={false} delivery={props.cart.shippingData}/>
        </div>
        <div className=" px-8 my-2 mb-4">
            <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Item(s) Detail</p>
        <CartItem place={true} items={props.cartItems && props.cartItems}/>
        </div>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-6">
        <div className="mb-5 p-6  text-lg font-bold hidden xl:block">
            <NavLink to="/checkout/shipping" className="flex flex-wrap w-full  cursor-pointer">
                <img className="w-1/5" src={Back_Arrow} alt="back"/>
            </NavLink>
        </div>
        <CartCheckout header={'Order Summary'} qty={props.cartItems && props.cartItems.length} total={props.cart && props.cart.totalPrice} items={props.cart && props.cart.totalPrice} shipping={0} tax={0}>
        {button ?
        <button onClick={() => sendOrder(props.cart)} className={`w-full mt-4 flex justify-center border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900  text-white cursor-pointer"}`}>
            {props.loading ?  (
                <>
                    <img src={loader} className="h-6 w-10 px-2 fill-current" alt="loading..."/>
                       loading &nbsp;...
                </>
              ): "Place order"}
        </button> :
        <PaystackButton {...componentProps} className={`w-full mt-4 flex justify-center border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900  text-white cursor-pointer"}`}/>
}
        </CartCheckout>
    </section>
    </div>
 </section>

        </SingleProduct>
    )
}


const mapStateToProps = (state) => ({
    loading: state.loading.status,
    token: selectToken(state),
    cartItems: selectCartItems(state),
    cart: selectCart(state),
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ placeOrder }, dispatch);
  };
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));