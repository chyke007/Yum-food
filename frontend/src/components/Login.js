import React from "react";
import {StyledLogin} from "../styles/cards"
import register from '../assets/img/register.png'

export const Login = (props) => {
  return (
    <StyledLogin>
       <div id="image" className=" hidden sm:block sm:w-1/3 mb-12 ">
            <img src={register} className="mt-32 h-32  sm:h-32 xl:h-64 object-cover" alt="Logo"/>
            </div>
            <div id="content" className=" sm:w-1/2">
            <span class="text-gray-900  text-3xl mb-6 font-bold">
                Welcome back!
            </span>
            <p className="text-gray-900 text-md">
           Sign into your YumFood account
            </p>
            <form className="w-full max-w-lg mt-6">
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Email
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="test@gmail.com"/>
    </div>
    </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
    </div>
  </div>
  <button className="w-full mt-3 bg-gray-900 hover:bg-gray-200 hover:text-gray-900 rounded-md cursor-pointer text-white px-3 py-3 uppercase ">
    SIGN UP
  </button>
</form>
        </div>
        </StyledLogin>
  );
};
