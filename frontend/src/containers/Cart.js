import React from "react";
import { NavLink } from 'react-router-dom';
import CartItem from "../components/Cart/items";
import CartCheckout from "../components/Cart/checkout";

export const Cart = (props) => {
  return (
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
    <CartItem/>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-4">
     <CartCheckout header={'Subtotal ( 4 items)'} total={620} items={620} shipping={0} tax={0}>
     <NavLink to="/checkout/1234">
            <button className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
            Proceed to checkout
            </button>
        </NavLink>
    </CartCheckout>
    </section>
    </div>
  );
};
