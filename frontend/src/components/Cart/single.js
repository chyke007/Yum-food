import React from "react";
import { NavLink } from 'react-router-dom';
import Shipping from "../Product/shipping";
import CartCheckout from "./checkout";
import {SingleProduct} from "../../styles/cards";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
export default (props) => {
    return (
        <SingleProduct>
 <section>
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
    <div className="mb-5 p-6  text-lg font-bold  xl:hidden">
            <NavLink to="/checkout" className="flex flex-wrap w-full  cursor-pointer">
                <img className="w-8" src={Back_Arrow} alt="ddd"/>
            </NavLink>
        </div>
        <div>
            <ul id="progressbar" className="flex w-full justify-center mb-12">
                <li className="active w-1/3 text-center " id="account"><strong>Account</strong></li>
                <li className="active w-1/3 text-center" id="shipping"><strong>Shipping</strong></li>
                <li className="w-1/3 text-center" id="confirm"><strong>Place Order</strong></li>
            </ul>
        </div>
        <Shipping/>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-4">
        <div className="mb-5 p-6  text-lg font-bold hidden xl:block">
            <NavLink to="/checkout" className="flex flex-wrap w-full  cursor-pointer">
                <img className="w-1/5" src={Back_Arrow} alt="ddd"/>
            </NavLink>
        </div>
        <CartCheckout header={'Subtotal ( 4 items)'} total={620} items={620} shipping={0} tax={0} to={'/placeorder'} button={'Proceed to place order'}/>
    </section>
    </div>
 </section>

        </SingleProduct>
    )
}