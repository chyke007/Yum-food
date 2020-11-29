import React, { useState } from "react";
import {  useParams,Redirect,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Delivery from "../Cart/delivery";
import CartItem from "../Cart/items";
import CartCheckout from "../Cart/checkout";
import {SingleOrder as SOrder} from "../../styles/layout";
import loader from '../../assets/img/loader-cube.svg'
import { selectRole } from "../../reducers";
import { updateStatus,deleteOrder,editOrder,editOrderItems } from "../../actions/order";
import {ACCEPTED,PENDING,DECLINED,PAYSTACK_SUCCESS,ADMIN,USER,STATUS,EDIT,DELETE,QTY, CITY, ADDRESS, POSTAL_CODE, COUNTRY} from "../../constants"
import {ORDER_MUST_HAVE_AT_LEAST_ONE_ITEM} from "../../message"
import {validateDelivery} from '../../helper'
import { usePaystackPayment } from 'react-paystack';
import ReactGA from 'react-ga';
import { toastr } from 'react-redux-toastr'


const performAction = async (props,id,mode,status) => {
if(mode === STATUS){
    props.updateStatus(id,status)
}
if(mode === EDIT){
    return await props.editOrder(id,status)
}
if(mode === DELETE){
props.deleteOrder(id)
}
}

const SingleOrder = (props) => {
    process.env.NODE_ENV === 'production' &&  ReactGA.pageview(window.location.pathname + window.location.search)
    const [order,setOrder] = useState(true);
    const [clicked,setClicked] = useState(null);
    const [errors, setErrors] = useState({});
    const [payment,setPayment] = useState(false)
    let { id } = useParams();
    let singleOrder = props.order.filter((e) => String(e._id) === String(id))[0];
    let index = props.order.findIndex(e => String(e._id) === String(id));

    if(!singleOrder) return <Redirect to="/orders" />
    if(singleOrder.orderItems.length === 0){
       toastr.error(ORDER_MUST_HAVE_AT_LEAST_ONE_ITEM)
        window.location.href = "/orders"
    }

    const config = {
      reference: (new Date()).getTime(),
      email: "admin@example.com",
      amount: Number(singleOrder.totalPrice) * 100,
      publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY

  };
    const toggleEdit = async () => {
        if(order) return setOrder(!order);
        //perform validation
        let check = validateDelivery(singleOrder.shipping)
        let dis = {}
        if (check.valid === false) {
        if (check.errors.address) {
            dis.address = check.errors.address
            setErrors(dis)
        }
        if (check.errors.city) {
            dis.city = check.errors.city
            setErrors(dis)
        }
        if (check.errors.postalCode) {
            dis.postalCode = check.errors.postalCode
            setErrors(dis)
        }
        if (check.errors.country) {
            dis.country = check.errors.country
            setErrors(dis)
        }
        return
        }
        setErrors({})
        setPayment(true)
        setClicked(EDIT);
      }

      const PaystackHookExample = async () => {
        const initializePayment = usePaystackPayment(config);
        if(singleOrder.orderItems.length === 0) return
        if(!payment) return
        initializePayment(function(e){
          setPayment(false)
          if(e.status === PAYSTACK_SUCCESS)
            return performAction(props,id,EDIT,singleOrder).then((res) => {
                if(res) return  setOrder(!order)
                toastr.error("Error","Unknown error")
              })
          toastr.error("Error","Unknown error")

        })
      };

      //Assign paystack hook that watches for order
      PaystackHookExample()

     const handleFilterChange = (e,filterType,in_id) => {
        switch(filterType){
          case QTY:
              props.editOrderItems(in_id,id,QTY,e.target.value,index)
              break;
          case ADDRESS:
            props.editOrderItems(false,id,ADDRESS,e.target.value)
              break;
          case CITY:
            props.editOrderItems(false,id,CITY,e.target.value)
              break;
          case POSTAL_CODE:
            props.editOrderItems(false,id,POSTAL_CODE,e.target.value)
              break;
          case COUNTRY:
            props.editOrderItems(false,id,COUNTRY,e.target.value)
              break;
          default: break
        }
      }

    return (
        <SOrder>
 <section>
    <div className="py-4 px-2 flex flex-wrap flex-shrink justify-between">
    <aside className="w-full xl:w-9/12 p-4">
        <div className="px-8 my-2 mb-4">
        <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Delivery Details</p>
       <Delivery place={!order} delivery={singleOrder.shipping} change={handleFilterChange} errors={errors}/>
        </div>
        <div className=" px-8 my-2 mb-4">
          <p className="font-bold text-lg text-gray-900 text-center w-full my-2">Item(s) Detail</p>
        <CartItem place={order} items={singleOrder.orderItems} change={handleFilterChange} />
        </div>
    </aside>
    <section className="w-full xl:w-3/12 my-8 xl:my-6">
        <CartCheckout header={'Order Summary'} qty={singleOrder.orderItems.length} total={singleOrder.totalPrice} items={singleOrder.totalPrice} shipping={0} tax={0} to={'/order/1233'}>
        {singleOrder.status === PENDING && props.role ===  USER && singleOrder.orderItems.length > 0 &&
   <button onClick={()=> toggleEdit()} className={`w-full flex justify-center mt-4 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900 text-white cursor-pointer"}`}>
   {props.loading   ?  (
     <>
    <img src={loader} className="h-6 w-10 px-2 fill-current" alt="..."/>
     loading &nbsp;...
     </>
   ):order ? 'Edit Order' : 'Place order'}
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
    return bindActionCreators({ updateStatus,deleteOrder,editOrder,editOrderItems }, dispatch);
  };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingleOrder));