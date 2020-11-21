import React from "react";
import CartItem from "../components/Cart/items";
import CartCheckout from "../components/Cart/checkout";

export const Cart = (props) => {
  return (
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
    <CartItem/>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-4">
     <CartCheckout header={'Subtotal ( 4 items)'} total={620} items={620} shipping={0} tax={0} to={'/checkout/1234'} button={'Proceed to checkout'}/>
    </section>
    </div>
  );
};
