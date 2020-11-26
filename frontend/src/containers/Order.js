import React,{useState} from "react";
import OrderItem from "../components/Order/items";
import Paginate from "../components/Order/paginate";
import OrderFilters from "../components/Order/filters";
import end from '../assets/img/end.svg'
import {StyledProduct} from '../styles/layout'
import ReactGA from 'react-ga';

export const Order = (props) => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const [rating, setRatings] = useState(0)
    const [filter, setFilter] = useState(true)
  return (
      <StyledProduct>
      {filter ? (
      <div className="flex  flex-wrap bg-product-pattern bg-contain md:bg-none justify-center flex-col items-center px-8 md:px-16 ">
        <div className="flex flex-wrap justify-between my-12 w-full">
       <section className="hidden md:flex md:flex-wrap flex-col">
       <OrderFilters rating={rating} setRatings = {setRatings}/>
       </section>
       <section className="w-full md:hidden mb-12">
       <button onClick={() => {setFilter(!filter)}} className="w-full  bg-white border border-gray-500 text-black rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-900 focus:text-white focus:border-gray-200">
       Filter Results
       <svg className=" mx-2 inline-block" xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
<path d="M5.83333 10H9.16667V8.33333H5.83333V10ZM0 0V1.66667H15V0H0ZM2.5 5.83333H12.5V4.16667H2.5V5.83333Z" fill="#0F142C"/>
</svg>
       </button>
       </section>
       <section className="overflow-auto md:w-3/5 lg:w-4/5 flex flex-wrap justify-end">
      <OrderItem/>
       </section>
       <Paginate />
        </div>
<div>
    <p className="flex flex-row text-center mb-4">
        Yaay! You're all caught up
        <img className="mx-4" src={end} alt="end"/>
    </p>
</div>

</div>):(
<div className="z-10 absolute h-screen mb-0 w-full bg-white top-0 bottom-0">
<header className="bg-gray-900 text-lg font-bold text-white flex justify-between p-4">
    Filter results
    <span className=" cursor-pointer" onClick={() => {setFilter(!filter)}}>
        X
    </span>
</header>
<section className="px-4">
    <OrderFilters rating={rating} setRatings={setRatings}/>
    <button className="w-full mt-12 mb-4 bg-gray-900 md:w-1/4 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500"> Apply Filters</button>
</section>
</div>
)}
</StyledProduct>
  );
};
