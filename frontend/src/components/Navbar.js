import React, {useState} from "react"
import { NavLink } from 'react-router-dom';
import {StyledNavbar} from "../styles/navbar"
import logo from '../assets/img/logo.svg'


export const Navbar = (props) => {
    const [display, setDisplay] = useState(false);
    return (
        <>
        <StyledNavbar>
        <div>
            <span>
                <NavLink to="/">

            <img src={logo} alt="Logo"/>
                </NavLink>
            </span>
            <span id="button">
                <button type="button"  onClick = {() => setDisplay(!display)}>
                <svg viewBox="0 0 24 24">
                     {
                         display ?
                         (<path fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>)
                     : (<path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>)
    }
                     </svg>
                </button>
            </span>
        </div>
        <div id="links" className={`${display ? `block` : `hidden`}`}>
            <NavLink to="/login"> Login</NavLink>
            <NavLink to="/signup"> Sign Up</NavLink>
            <NavLink to="/product"> Menu</NavLink>
            <NavLink to="/checkout"> Cart <span className="bg-red-500  text-white text-xs ml-4 mt-1 sm:-ml-1 sm:-mt-2  inline-block px-1  absolute rounded-full"> 3</span></NavLink>
        </div>

        </StyledNavbar>
        </>
  );
};