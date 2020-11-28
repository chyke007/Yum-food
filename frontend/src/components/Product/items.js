import React from "react";
import ProductSkeleton from "./skeleton";
import { withRouter  } from 'react-router-dom';
import Card1 from '../../assets/img/chicken-rice.jpg'
import Rating from "./rating"
import end from '../../assets/img/end.svg'

const Items = (props) => {
    return (
        <>
        {!props.loading && props.product && props.product.items.map((product,i) => (
            <div key={i} className="shadow-2xl mb-32 ml-0 md:ml-8  w-full h-64 rounded-lg lg:w-72 cursor-pointer" onClick={() => {props.history.push(`/product/${product._id}`)}}>
            <div className="relative pb-5/6 h-64 hover:opacity-50 focus:opacity-50">
                 <img className=" object-cover w-full h-full rounded-lg shadow-md" src={product.image ? product.image : Card1} alt="imageAlt"/>
            </div>
            <div className="relative px-4 -mt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-baseline">
                        <span className="inline-block bg-green-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">New</span>
                         <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                            {product.name}
                        </div>
                    </div>
               <div className="mt-1">
                ₦{product.price}
                    <span className="text-gray-600 text-sm"> / plate</span>
                </div>
                <div className="mt-2 flex items-center">
                <Rating rating={product.rating}/>
                <span className="ml-2 text-gray-600 text-sm">{product.numReviews} review{product.rating && Number(product.numReviews) > 1 ? 's': ''}</span>
            </div>
        </div>
    </div>

</div>

        ))}
    {props.paginating && <ProductSkeleton/>}
    {props.loading ? <ProductSkeleton/> :
   !props.paginating && !props.willPaginate &&
    <p className="flex mx-4 w-full flex-row justify-center items-center text-center mb-4">
        Yaay! You're all caught up
        <img className="" src={end} alt="end"/>
    </p>
}
        </>
    )
}

export default withRouter (Items);