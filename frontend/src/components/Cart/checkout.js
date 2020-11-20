import React from "react";
import { NavLink } from 'react-router-dom';
export default () => {
    return (
        <>
        <p className="text-black font-bold text-lg border-gray-200 border-b p-2">
   Subtotal ( 4 items) : ₦620
   </p>
   <p className="text-black my-2">
   Total ( 4 items) : ₦620
   </p>
   <p className="text-black my-2">
   Shipping : ₦0
   </p>
   <NavLink to="/product/1239hdb">
   <button className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">Proceed to checkout</button>
</NavLink>
        </>
    )
}