import React,{useState} from "react";
import {  useLocation,useParams,Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {SingleOrder as SOrder} from "../../styles/layout";
import AddProduct from "./add";
import { selectRole } from "../../reducers";
import { ADMIN,USER } from "../../constants"
import { deleteProduct,addReview,editReview,deleteReview } from "../../actions/product"
import Rating from "./rating"
import Card1 from '../../assets/img/chicken-rice.jpg'
import loader from '../../assets/img/loader-cube.svg'
import avatar from '../../assets/img/avatar.png'
import ReactHtmlParser from "react-html-parser";
import {validateReview} from '../../helper'
import moment from "moment"
import ReactGA from 'react-ga';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const SingleProduct = (props) => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    let { id } = useParams();
    let query = useQuery();
    let product = props.product.filter((e) => String(e._id) === String(id))[0];
    const [cart, setCart] = useState(false)
    const [errors, setErrors] = useState("");
    const [editComment, setEditComment] = useState("");
    const [editState,setEditState] = useState(false)
    const [editRating, setEditRating] = useState({})
    let comment = React.createRef();
    let rating = React.createRef();


    if(!product) return <Redirect to="/product" />

    const addToCart = () => {
        setCart(true)
    }
    const refreshForm = () => {
        rating = "";
        comment =""
    }
    const replaceForm = (rating,comment) => {
        setEditRating(rating)
        setEditComment(comment)
        setEditState(true)
    }

    const saveReview = async ({current:{value: rating}},{current:{value: comment}}) => {
    let check = validateReview({rating,comment})
    let dis = {}
    if (check.valid === false) {
      if (check.errors.rating) {
        dis.rating = check.errors.rating
        setErrors(dis)
      }
      if (check.errors.comment) {
        dis.comment = check.errors.comment
        setErrors(dis)
      }
      return
    }
    setErrors({})
    let res = null
    if(editState){
      res  =  await props.editReview(id,Number(rating),comment)
      res && setEditState(false)
      return refreshForm()
    }
    res = await props.addReview(id,Number(rating),comment)
    if(res) return refreshForm()
    }

    return (
        <div>
        {query.get("edit") && query.get("edit") && props.role === ADMIN
        ?
        (
            <AddProduct edit={true} id={id} data={product}/>
        ):
        (
            <SOrder>
            <section className="flex flex-col  m-4 p-2">
               <div className="w-full flex flex-wrap flex-shrink justify-between">
               <aside className="w-full flex justify-center items-center h-96 my-6  xl:w-6/12">
                  <img src={product.image ? product.image : Card1}  className=" object-cover w-full lg:w-9/12 h-80 lg:h-96" alt="item"/>
               </aside>
               <section className="w-full xl:w-6/12 my-8 xl:my-0">
                  <p className="font-bold text-5xl lg:text-8xl capitalize">{product.name && product.name}</p>
                  <div className="mt-4">
                    <span className="font-bold text-4xl">₦{product.price && product.price}</span>
                    <span className="text-gray-600 text-lg"> / plate</span>
                 </div>
                 <div className="flex mt-4 items-center">
                 <Rating rating={product.rating && product.rating}/>
                 <span className="mx-2 text-lg">{product.numReviews && product.numReviews} review{product.rating && Number(product.numReviews) > 1 ? 's': ''}</span>
                </div>
                <div className="flex mt-4">
                      <span className="text-lg">{ReactHtmlParser(product.description && product.description)}</span>
                </div>
                <div className="flex mt-8 flex-col">
                    {props.role === USER ? (

                <button disabled={cart} onClick={() => addToCart(product._id && product._id)} className={`w-full flex justify-center hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-6 uppercase ${ cart ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900  text-white cursor-pointer"}`}>
                    {cart ? 'Added to Cart' :'Add to cart'}
                </button>
                    ): (
                        <>
                        <NavLink to={`/product/${id}?edit=true`} title="Edit menu" className="w-full flex justify-center mt-3 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase bg-gray-900 text-white cursor-pointer">
                        Edit Menu
                        </NavLink>
                        <button onClick={() => props.deleteProduct(id) } className={`w-full flex justify-center mt-3 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-white text-black cursor-pointer"}`}>
                           {props.loading ?  (
                            <>
                            <img src={loader} className="h-6 w-10 px-2 fill-current" alt="..."/>
                            loading &nbsp;...
                            </>
                        ):'Delete Menu'}
                        </button>
                        </>
                    )}
                </div>
               </section>
               </div>
               {props.role === USER && (

               <div className="w-full mt-4">
                   <header className="w-full bg-gray-900 text-white uppercase font-bold text-lg px-2">Reviews</header>
                   <aside className="flex flex-col h-40 overflow-scroll bg-gray-200 w-full m-2 px-2 py-4">
                        {product.reviews && product.reviews.map((review,i) =>
                        (<div key={i} className="flex w-full m-2">
                           <span className="w-2/12 py-4 px-2">

                           <img src={review && review.image ? review.image : avatar} className=" rounded-full w-8" alt="user"/>
                           </span>
                            <span className="w-9/12">
                                <p>{review && review.user && review.user.name && review.user.name}</p>
                                <p>{review && review.comment && review.comment}</p>
                                <p className="flex flex-row items-center">
                                <Rating rating={review && review.rating && review.rating}/>
                                <span className="ml-2">{moment(review.updatedAt).format("DD/MM/YYYY")}</span>
                               <button onClick={() => replaceForm(review.rating,review.comment)} className="ml-2 text-yellow-600 hover:text-yellow-900 mx-1">Edit</button>
                               <button onClick={() => props.deleteReview(product._id)} className="ml-2 text-red-600 hover:text-red-900 mx-1">{props.loading ? 'Deleting..': 'Delete'}</button>
                                </p>
                            </span>
                       </div>)
                        )}
                   </aside>
                   <footer className="w-full bg-gray-100 my-2 p-2">
                       <form onSubmit= {(e) => {e.preventDefault() ;saveReview(rating,comment)}} className="flex flex-wrap justify-center items-center p-2">
                           <span className = "block w-10/12 lg:w-2/3  mx-2 w-1/12 border">
                            <input ref={comment} defaultValue={editState ? editComment : ""} maxLength="30" className={`appearance-none w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ errors.comment ? "border-red-500": "border-gray-200"}`} id="grid-comment" type="text" placeholder="Great food"/>
                            {errors.comment ? (
                            <p className="text-red-500 text-xs italic">{errors.comment}</p>

                            ) : ''}
                            </span>
                            <span className = "mx-2 w-1/12">
                            <select className={`rounded w-full border py-3 leading-tight focus:outline-none ${ errors.rating ? "border-red-500": "border-gray-200"}`} ref={rating}>
                                <option defaultValue={editState ? editRating : 1}>1</option>
                                <option defaultValue={editState ? editRating : 2}>2</option>
                                <option defaultValue={editState ? editRating : 3}>3</option>
                                <option defaultValue={editState ? editRating : 4}>4</option>
                                <option defaultValue={editState ? editRating : 5}>5</option>
                            </select>
                            {errors.rating ? (
                            <p className="text-red-500 text-xs italic">{errors.rating}</p>

                            ) : ''}
                            </span>
                            <button disabled={props.loading} className={`w-full lg:w-1/6 lg:-mt-0 border  mt-3 flex justify-center hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-3 uppercase ${ props.loading ? "bg-gray-200  text-black cursor-not-allowed": "bg-gray-900  text-white cursor-pointer"}`}>
                            {props.loading ?  (
                                <>
                                <img src={loader} className="h-6 w-10 px-2 fill-current" alt="loading..."/>
                                loading &nbsp;...
                                </>
                            ): editState ? "EDIT" :"ADD"}
                            </button>
                       </form>
                   </footer>
               </div>
               ) }
            </section>
            {props.role === ADMIN &&
            <>
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
    return bindActionCreators({ deleteProduct,addReview,editReview,deleteReview }, dispatch);
  };
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);