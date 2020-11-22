import React from "react";
import { NavLink  } from 'react-router-dom';
export default (props) => {
    return (
        <>
        <NavLink to="/product/add" title="Add menu">
            <div className="fixed flex items-center justify-center font-bold cursor-pointer text-center bg-gray-900 rounded-full bottom-10 right-10 text-white shadow-2xl w-12 p-3 h-12">
                +
            </div>
        </NavLink>
        </>
    )
}