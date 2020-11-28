import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderItem from "../components/Order/items";
import Paginate from "../components/Order/paginate";
import OrderFilters from "../components/Order/filters";
import end from '../assets/img/end.svg'
import {StyledProduct} from '../styles/layout'
import { getOrders,deleteOrder } from "../actions/order";
import { selectRole,selectOrder } from "../reducers";

import ReactGA from 'react-ga';

const Order = (props) => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const [shipping, setShipping] = useState(null)
    const [price, setPrice] = useState(null)
    const [status, setStatus] = useState(null)

    const [filter, setFilter] = useState(true)
    const [savedFilter,setSavedFilter] = useState(null)
    const refreshFilters = () => {
        setShipping(null)
        setPrice(null)
        setStatus(null)
      }
    const setRightList = (order,paginate) => {
        let page = paginate.current_page - 1;
        let chunk = (page * 10)
        return {items: order.slice(chunk,paginate.current_page * 10)}
    }
      const getGeneral = (current,incoming,demo) => {
        if(current){
          current.includes(incoming) ? demo(current.filter((e) => String(e) !== String(incoming))) : demo([...current,incoming])
        }else{
          demo([incoming])
        }
      }
      const addOrder = (next) => {
          console.log(next)
        if(!next) return
        // return
        props.getOrders(savedFilter,props.pagination);
      }

    const handleFilterChange = (e,filterType) => {
        switch(filterType){
          case "shipping":
              setShipping(e.target.value)
              break;
          case "price":
              getGeneral(price,e.target.value,setPrice)
              break;
          case "status":
              getGeneral(status,e.target.value,setStatus)
              break;
          default: break
        }
      }

    useEffect(() => {
        let filters = ""
        if(filter === 'open') return; //used to prevent deafult behaviur in mobile, forces use of Apply button
        if(shipping !== null && shipping !== ""){
          filters=`shipping=${shipping}`
        }
        if(filter === 'postOpen' && filter.length < 1) return;
        if(price !== null && price.length > 0){
          filters === "" ? filters=`totalPrice=${price.join(',')}` : filters=`${filters}&totalPrice=${price.join(',')}`
        }
        if(status !== null && status.length > 0){
          filters === "" ? filters=`status=${status.join(',')}` : filters=`${filters}&status=${status.join(',')}`
        }
        setSavedFilter(filters)
        props.getOrders(filters)  //eslint-disable-next-line
      }, [shipping,price,status,filter]);

  return (
      <StyledProduct>
      {filter !== 'open' ? (
      <div className="flex  flex-wrap bg-product-pattern bg-contain md:bg-none justify-center flex-col items-center px-8 md:px-16 ">
        <div className="flex flex-wrap justify-between my-12 w-full">
       <section className="hidden md:flex md:flex-wrap flex-col">
       <OrderFilters change={handleFilterChange}/>
       </section>
       <section className="w-full md:hidden mb-12">
       <button  onClick={() => {setFilter('open')}}  className="w-full  bg-white border border-gray-500 text-black rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-900 focus:text-white focus:border-gray-200">
       Filter Results
       <svg className=" mx-2 inline-block" xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
<path d="M5.83333 10H9.16667V8.33333H5.83333V10ZM0 0V1.66667H15V0H0ZM2.5 5.83333H12.5V4.16667H2.5V5.83333Z" fill="#0F142C"/>
</svg>
       </button>
       </section>
       <section className="overflow-auto md:w-3/5 lg:w-4/5 flex flex-wrap justify-end">
      <OrderItem order={setRightList(props.order.items,props.pagination)} loading={props.loading} deleteOrder={props.deleteOrder}  change={handleFilterChange}/>
       </section>
       <Paginate pagination={props.pagination} loading={props.loading} nextPage={addOrder}/>
        </div>
<div>
    {!props.loading && !props.next_page_url &&
    <p className="flex flex-row text-center mb-4">
        Yaay! You're all caught up
        <img className="mx-4" src={end} alt="end"/>
    </p>}
</div>

</div>):(
<div className="z-10 absolute h-screen mb-0 w-full bg-white top-0 bottom-0">
<header className="bg-gray-900 text-lg font-bold text-white flex justify-between p-4">
    Filter results
    <span className=" cursor-pointer" onClick={() => {refreshFilters(); setFilter('postOpen')}}>
        X
    </span>
</header>
<section className="px-4">
    <OrderFilters change={handleFilterChange} role={props.role}/>
    <button onClick={() => { setFilter('clicked') }} className="w-full mt-12 mb-4 bg-gray-900 md:w-1/4 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500"> Apply Filters</button>
</section>
</div>
)}
</StyledProduct>
  );
};


const mapStateToProps = (state) => ({
    loading: state.loading.status,
    pagination: state.loading.pagination,
    order: selectOrder(state),
    role: selectRole(state)
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getOrders,deleteOrder }, dispatch);
  };
export default connect(mapStateToProps, mapDispatchToProps)(Order);
