import React, { useState } from "react";
import {  useParams,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Delivery from "../Cart/delivery";
import CartItem from "../Cart/items";
import CartCheckout from "../Cart/checkout";
import {SingleOrder as SOrder} from "../../styles/layout";
import loader from '../../assets/img/loader-cube.svg'
import { selectRole } from "../../reducers";
import { updateStatus,deleteOrder } from "../../actions/order";
import {ACCEPTED,PENDING,DECLINED,ADMIN,USER,STATUS,EDIT,DELETE} from "../../constants"
import ReactGA from 'react-ga';

const performAction = (props,id,mode,status) => {
if(mode === STATUS){
    props.updateStatus(id,status)
}
if(mode === EDIT){

}
if(mode === DELETE){
props.deleteOrder(id)
}
}

const SingleOrder = (props) => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    const [order,setOrder] = useState(true);
    const [clicked,setClicked] = useState(null);
    let { id } = useParams();
    let singleOrder = props.order.filter((e) => String(e._id) === String(id))[0];
    if(!singleOrder) return <Redirect to="/orders" />
    return (
        <SOrder>
 <section>
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
        <div className="px-8 my-2 mb-4">
            <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Delivery Details</p>
       <Delivery place={!order} delivery={singleOrder.shipping}/>
        </div>
        <div className=" px-8 my-2 mb-4">
          <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Item(s) Detail</p>
        <CartItem place={order} items={singleOrder.orderItems}/>
        </div>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-6">
        <CartCheckout header={'Order Summary'} qty={singleOrder.orderItems.length} total={singleOrder.totalPrice} items={singleOrder.totalPrice} shipping={0} tax={0} to={'/order/1233'}>
        {singleOrder.status === PENDING && props.role ===  USER &&
   <button onClick={()=> {setOrder(!order)}} className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
   { order ? 'Edit Order' : 'Place order'}
   </button>
}
   {singleOrder.status === PENDING && props.role ===  ADMIN &&
   <>
   <button onClick={() => {setClicked(ACCEPTED); performAction(props,id,STATUS,ACCEPTED)}} className={`w-full mt-4  flex justify-center border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900 text-white cursor-pointer"}`}>

   {props.loading  && clicked === ACCEPTED ?  (
     <>
     <img src={loader} className="h-6 w-10 px-2 fill-current" alt="..."/>
     loading &nbsp;...
     </>
   ):'Accept Order'}
   </button>
   <button onClick={() => {setClicked(DECLINED); performAction(props,id,STATUS,DECLINED)}} className={`w-full mt-4  flex justify-center border border-red-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-white text-black cursor-pointer"}`}>

    {props.loading  && clicked === DECLINED  ?  (
     <>
     <img src={loader} className="h-6 w-10 px-2 fill-current" alt="..."/>
     loading &nbsp;...
     </>
   ):'Decline Order'}
   </button>
   </>
}
{props.role ===  ADMIN &&
   <>
   <button onClick={() => {setClicked(DELETE); performAction(props,id,DELETE)}} className={`w-full mt-4 flex justify-center border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-red-500 hover:bg-white hover:text-black hover:border-red-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-red-900 text-white cursor-pointer"}`}>

    {props.loading && clicked === DELETE ?  (
     <>
     <img src={loader} className="h-6 w-10 px-2 fill-current" alt="..."/>
     loading &nbsp;...
     </>
   ):'Delete Order'}
   </button>

   </>
}
        </CartCheckout>
    </section>
    </div>
 </section>

        </SOrder>
    )
}


const mapStateToProps = (state) => ({
    loading: state.loading.status,
    role: selectRole(state),
    order: state.order.items,
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateStatus,deleteOrder }, dispatch);
  };
export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);