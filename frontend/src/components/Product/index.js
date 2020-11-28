import React, { useState } from "react";
import {  useLocation,useParams,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Delivery from "../Cart/delivery";
import CartItem from "../Cart/items";
import FloatingButton from "./floatButton";
import CartCheckout from "../Cart/checkout";
import {SingleOrder as SOrder} from "../../styles/layout";
import AddProduct from "./add";
import { selectRole } from "../../reducers";
import { ADMIN } from "../../constants"
import { deleteProduct } from "../../actions/product"
import ReactGA from 'react-ga';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const SingleProduct = (props) => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    let { id } = useParams();
    let query = useQuery();
    let product = props.product.filter((e) => String(e._id) === String(id))[0];
    const [order,setOrder] = useState(true);
    console.log(product);
    if(!product) return <Redirect to="/product" />
    return (
        <div>
        {query.get("edit") && query.get("edit") && props.role === ADMIN
        ?
        (
            <AddProduct edit={true} id={id} data={product}/>
        ):
        (
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
            {props.role === ADMIN &&
            <>
           <FloatingButton to={`/product/${id}?edit=true`} title={"Edit menu"} val={"!"}/>
           <div title="Delete menu" onClick={() => props.deleteProduct(id)} className="fixed flex items-center justify-center font-bold cursor-pointer text-center bg-white-900 rounded-full bottom-30 right-10 text-red border border-red-700 shadow-2xl w-12 p-3 h-12">
               x
            </div>
            </>
            }
                   </SOrder>

        )
        }
        </div>
        )
}


const mapStateToProps = (state) => ({
    loading: state.loading.status,
    role: selectRole(state),
    product: state.product.items,
  });

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ deleteProduct }, dispatch);
  };
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);