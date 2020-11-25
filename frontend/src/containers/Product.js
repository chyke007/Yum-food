import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductItem from "../components/Product/items";
import ProductSkeleton from "../components/Product/skeleton";
import AddButton from "../components/Product/addButton";
import ProductFilters from "../components/Product/filters";
import { getProduct } from "../actions/product";
import {StyledProduct} from '../styles/layout'
import ReactGA from 'react-ga';
ReactGA.pageview(window.location.pathname + window.location.search);

 const Product = (props) => {
    const [rating, setRatings] = useState(0)
    const [filter, setFilter] = useState(true)
    useEffect(()=> {
        document.title = `YumFood - Menu List`;
    })
  return (
      <StyledProduct>
      {filter ? (
      <div className="flex  flex-wrap bg-product-pattern bg-contain md:bg-none justify-center flex-col items-center px-8 md:px-16 ">
         <div className="flex  flex-wrap  bg-product-pattern pb-2 md:px-32 md:py-48 justify-center text-center  text-3xl sm:w-full mt-16 md:mt-8 text-gray-700 md:text-3xl font-bold ">

          <p className="">
          Find the Most Delicious Meals
          Here On <span className="text-gray-900">YumFood</span>
          </p>
         </div>
        <div className="w-full p-4 shadow-xl rounded sm:w-full  bg-white">
        <form>
        <div className="flex flex-wrap justify-center items-center mb-2 ">
            <div className="w-full md:w-2/3 md:px-3 mb-6 md:mb-0">
            <button type="submit" className="absolute mt-5 ml-4 items-center pointer-events-none">
            <svg className="h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
            </button>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="name" placeholder="Menu name or description"/>
            </div>
           <button className="w-full bg-gray-900 md:w-1/4 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500"> Search</button>
        </div>
        </form>
        </div>

        <div className="flex flex-wrap justify-between my-12 w-full">
       <section className="hidden md:flex md:flex-wrap flex-col">
       <ProductFilters rating={rating} setRatings = {setRatings}/>
       </section>
       <section className="w-full md:hidden mb-12">
       <button onClick={() => {setFilter(!filter)}} className="w-full  bg-white border border-gray-500 text-black rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-900 focus:text-white focus:border-gray-200">
       Filter Results
       <svg className=" mx-2 inline-block" xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
<path d="M5.83333 10H9.16667V8.33333H5.83333V10ZM0 0V1.66667H15V0H0ZM2.5 5.83333H12.5V4.16667H2.5V5.83333Z" fill="#0F142C"/>
</svg>
       </button>
       </section>
       <section className="w-full md:w-3/5 lg:w-4/5 flex flex-wrap justify-end">
       <ProductItem/>
       <ProductSkeleton/>
       </section>
        </div>
<div>

</div>
<AddButton/>
</div>):(
<div className="z-10 absolute h-screen mb-0 w-full bg-white top-0 bottom-0">
<header className="bg-gray-900 text-lg font-bold text-white flex justify-between p-4">
    Filter results
    <span className=" cursor-pointer" onClick={() => {setFilter(!filter)}}>
        X
    </span>
</header>
<section className="px-4">
    <ProductFilters rating={rating} setRatings={setRatings}/>
    <button className="w-full mt-12 mb-4 bg-gray-900 md:w-1/4 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500"> Apply Filters</button>
</section>
</div>
)}
</StyledProduct>
  );
};

const mapStateToProps = (state) => ({
    loading: state.loading.status,
    product: state.auth.product
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getProduct }, dispatch);
  };
export default connect(mapStateToProps, mapDispatchToProps)(Product);