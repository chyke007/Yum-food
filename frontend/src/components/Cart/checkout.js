import React from "react";
import { NavLink } from 'react-router-dom';
export default (props) => {
    return (
        <div className=" h-56 shadow-2xl rounded-lg border-gray-500 mx-2  xl:mx-0 p-4">
   <table className="border-gray-200 p-4 w-full">
            <tbody>
            <tr className="font-bold text-lg rounded-xl text-white bg-gray-900 my-2 p-2">
                    <td className="px-2">{props.header}</td>
                    <td>₦{props.total}</td>
                </tr>
                <tr className="text-black ">
                    <td>Items(4)</td>
                    <td>₦{props.items}</td>
                </tr>
                <tr className="text-black">
                    <td>Shipping</td>
                    <td>₦{props.shipping}</td>
                </tr>
                <tr className="text-black ">
                    <td>Tax</td>
                    <td>₦{props.tax}</td>
                </tr>
            </tbody>
        </table>
   <NavLink to={props.to}>
   <button className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
   {props.button}
   </button>
</NavLink>
        </div>
    )
}