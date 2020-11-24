import React, {useState} from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink,withRouter } from 'react-router-dom';
import { selectToken } from "../reducers";
import { logout } from "../actions/auth";
import {StyledNavbar} from "../styles/navbar"
import logo from '../assets/img/logo.svg'
import avatar from '../assets/img/avatar.png'

const logUserOut = (props) => {
  props.logout()
  props.history.push('/');
}

const Navbar = (props) => {
    const [display, setDisplay] = useState(false);
    const [menu, setMenu] = useState(false);
    return(
<StyledNavbar>
  <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
          <NavLink to="/">
            <img className="h-24 w-24" src={logo} alt="logo"/>
          </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">

              <NavLink exact to="/" className="px-3 py-2 rounded-md text-sm font-medium  text-gray-300 hover:text-white hover:bg-gray-700">Home</NavLink>

              <NavLink exact to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Login</NavLink>

              <NavLink exact to="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Register</NavLink>

              <NavLink exact to="/product" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Menu</NavLink>
              {props.token ?
              (
              <NavLink exact to="/orders" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Orders</NavLink>
              ):''}
              <NavLink exact to="/checkout" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Cart <span className="bg-red-500  text-white text-xs ml-4 mt-1 sm:-ml-0 sm:-mt-2  inline-block px-1  absolute rounded-full"> 3</span></NavLink>
            </div>
          </div>
        </div>
        {props.token ?
        (
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
         <div className="ml-3 relative">
              <div>
                <button onClick={() => {setMenu(!menu)}} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={avatar} alt=""/>
                </button>
              </div>
              <div className={menu?" origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 block" :"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <NavLink exact to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">My Profile</NavLink>
                <span onClick={() => logUserOut(props)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</span>
              </div>
            </div>
          </div>
        </div>
        ):''}
        <div className="-mr-2 flex md:hidden">
          <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open main menu</span>
            <svg onClick={() => { setDisplay(!display)}} className={display ? "hidden  h-6 w-6":"block h-6 w-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg onClick={() => { setDisplay(!display)}} className={display ? "block  h-6 w-6":"hidden h-6 w-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div className={display ? "md:hidden" :"hidden md:hidden"}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLink exact to="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Home</NavLink>

        <NavLink exact to="/login" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Login</NavLink>

        <NavLink exact to="/signup" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Register</NavLink>

        <NavLink exact to="/product" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Menu</NavLink>
        {props.token ?
        (<NavLink exact to="/orders" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Orders</NavLink>
    ):''}
        <NavLink exact to="/checkout" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Cart <span className="bg-red-500  text-white text-xs ml-2 inline-block h-4 text-center px-1  absolute rounded-full"> 3</span></NavLink>
    </div>
    {props.token ? (
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={avatar} alt=""/>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">John Doe</div>
            <div className="text-sm font-medium leading-none text-gray-400">johndoe@example.com</div>
          </div>
          <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
        <div className="mt-3 px-2 space-y-1">
          <NavLink exact to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">My Profile</NavLink>

          <span onClick={() => logUserOut(props)} className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</span>
        </div>
      </div>):''
      }
    </div>
  </nav>
</StyledNavbar>
    );
};

const mapStateToProps = (state) => ({
  token: selectToken(state)
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));