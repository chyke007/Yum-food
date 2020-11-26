import React from "react";
import ProductSkeleton from "./skeleton";
import { withRouter  } from 'react-router-dom';
import Card1 from '../../assets/img/chicken-rice.jpg'
import end from '../../assets/img/end.svg'

const Items = (props) => {
    return (
        <>
        {!props.loading && props.product && props.product.items.map((product) => (
            <div className="shadow-2xl mb-32 ml-0 md:ml-8  w-full h-64 rounded-lg lg:w-72 cursor-pointer" onClick={() => {props.history.push('/product/1234')}}>
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
                <h4 className="mt-1 font-semibold text-lg uppercase leading-tight truncate">
                    {product.description}
                </h4>
                <div className="mt-1">
                ₦{product.price}
                    <span className="text-gray-600 text-sm"> / plate</span>
                </div>
                <div className="mt-2 flex items-center">
                <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-current ${ product.numReviews > 0 ? "text-green-500": "text-gray-500"}`}>
                    <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                </svg>
                <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-current ${ product.numReviews > 1 ? "text-green-500": "text-gray-500"}`}>
                    <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                </svg>
                <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-current ${ product.numReviews > 2 ? "text-green-500": "text-gray-500"}`}>
                    <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                </svg>
                <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-current ${ product.numReviews > 3 ? "text-green-500": "text-gray-500"}`}>
                    <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                </svg>
                <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-current ${ product.numReviews > 4 ? "text-green-500": "text-gray-500"}`}>
                    <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                </svg>
                <span className="ml-2 text-gray-600 text-sm">{product.numReviews} reviews</span>
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