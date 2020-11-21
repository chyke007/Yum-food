import React from "react";
import { NavLink } from 'react-router-dom';
import {Styled404} from "../styles/layout"
import Four0Four from '../assets/img/404_2.png'

export const NotFound = (props) => {
  return (
    <Styled404>
            <div id="content" className="sm:w-1/2">
                <p className="font-mono text-5xl text-gray-900 uppercase">Whoops!</p>
                <p>
                Sorry the page you are looking for doesn't exist.
                </p>
                <button className="bg-gray-900 mt-6 hover:bg-gray-200 hover:text-gray-900 rounded-md cursor-pointer text-white px-3 py-3 uppercase ">
                <NavLink to="/">
                Go Home
                </NavLink>
                </button>
            </div>

            <div id="image" className="sm:w-1/3  hidden sm:block mb-12 sm:m-6">
           <img src={Four0Four} alt="Logo" className="mt-32 h-32  sm:h-32 xl:h-64 object-cover "/>
            </div>
        </Styled404>
  );
};
