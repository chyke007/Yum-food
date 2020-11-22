import React, { useState } from "react";
import Delivery from "../Cart/delivery";
import CartItem from "../Cart/items";
import AddButton from "./addButton";
import CartCheckout from "../Cart/checkout";
import {SingleOrder as SOrder} from "../../styles/layout";

export const SingleProduct = (props) => {
    const [order,setOrder] = useState(true);
    return (
        <SOrder>
 <section>
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
        <div className="px-8 my-2 mb-4">
            <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Delivery Details</p>
       <Delivery place={!order}/>
        </div>
        <div className=" px-8 my-2 mb-4">
            <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Item(s) Detail</p>
        <CartItem place={order}/>
        </div>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-6">
        <CartCheckout header={'Order Summary'} total={620} items={620} shipping={0} tax={0} to={'/order/1233'}>
   <button onClick={()=> {setOrder(!order)}} className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
   { order ? 'Edit Order' : 'Place order'}
   </button>
        <button className="w-full mt-4 bg-white border border-red-200 text-black rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
    Decline Order
   </button>
        </CartCheckout>
    </section>
    </div>
 </section>
<AddButton/>
        </SOrder>
    )
}