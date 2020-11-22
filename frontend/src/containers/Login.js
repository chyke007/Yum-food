import React, {useState} from "react";
import {StyledLogin} from "../styles/layout"
import register from '../assets/img/sign_in.svg'
import eyeSlash from '../assets/img/eye-slash.png'
import eye from '../assets/img/eye.png'

export const Login = (props) => {
  const [secure, setSecure] = useState(true)
  return (
    <StyledLogin>
       <div id="image" className=" hidden sm:block sm:w-1/3 mb-12 ">
            <img src={register} className="mt-32 h-32  sm:h-32 xl:h-64 object-cover" alt="Logo"/>
            </div>
            <div id="content" className="w-full sm:w-1/2">
            <span class="text-gray-900  text-3xl mb-6 font-bold">
                Welcome back!
            </span>
            <p className="text-gray-900 text-md">
           Sign into your YumFood account
            </p>
            <form className="w-full max-w-lg mt-8">
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-city">
        Email
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="test@gmail.com"/>
    </div>
    </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-password">
        Password
      </label>
      <span className="w-full inline-flex items-center rounded-l-md border border-r-1  bg-gray-200 text-gray-700 mb-2 border-gray-200 text-sm  focus:outline-none focus:bg-white focus:border-gray-500">
          <input className="appearance-none block w-full py-3 px-4 leading-tight" id="grid-password" type={secure ? 'password' : 'text'} placeholder="******************"/>
           {
             secure ? (

               <img src={eyeSlash} alt="slash" onClick={() => { setSecure(!secure)}} className="h-6 w-10 px-2 cursor-pointer fill-current"/>
             ) :(

               <img src={eye} alt="slash" onClick={() => { setSecure(!secure)}} className="h-8 w-10 px-1 cursor-pointer fill-current"/>
             )
           }
        </span>
    </div>
  </div>
  <button className="w-full mt-3 bg-gray-900 hover:bg-gray-200 hover:text-gray-900 rounded-md cursor-pointer text-white px-3 py-3 uppercase ">
    LOG IN
  </button>
</form>
        </div>
        </StyledLogin>
  );
};
