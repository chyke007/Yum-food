import React from "react";
import CartItem from "../components/Cart/items";
import CartCheckout from "../components/Cart/checkout";

export const Cart = (props) => {
  return (
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
    <CartItem/>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-4 h-56 shadow-2xl rounded-lg border-gray-500 p-4">
   <CartCheckout/>
    </section>
    </div>
  );
};
