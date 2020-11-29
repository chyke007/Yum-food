import React from "react";
import { ADDRESS, CITY, POSTAL_CODE, COUNTRY } from "../../constants";
export default (props) => {
    return (
        <div className="flex flex-col w-full items-center">
            <div className="-my-2 overflow-x-auto w-full sm:-mx-6 lg:-mx-8">
             <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex justify-center shadow overflow-hidden items-center border-b border-gray-200 sm:rounded-lg">
              <form className="w-full max-w-lg mt-8">
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-address">
        Address
      </label>
      <input onChange={(e) => props.change(e,ADDRESS) } defaultValue={props.shipping && props.shipping.address}  maxLength="100" className={`appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ props.errors.address ? "border-red-500": "border-gray-200"}`} id="grid-address" type="text" placeholder="2A/12 Mopi drive, LA, Pluto"/>
            {props.errors.address &&  (
      <p className="text-red-500 text-xs italic">{props.errors.address}</p>
      )}
     </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-city">
        City
      </label>
      <input onChange={(e) => props.change(e,CITY) } defaultValue={props.shipping && props.shipping.city}  maxLength="100" className={`appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ props.errors.city ? "border-red-500": "border-gray-200"}`} id="grid-city" type="text" placeholder="Yemen"/>
            {props.errors.city &&  (
      <p className="text-red-500 text-xs italic">{props.errors.city}</p>
      )}
     </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-postal">
        Postal Code
      </label>
      <input onChange={(e) => props.change(e,POSTAL_CODE) } defaultValue={props.shipping && props.shipping.postalCode}  maxLength="100" className={`appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ props.errors.postalCode ? "border-red-500": "border-gray-200"}`} id="grid-postalCode" type="text" placeholder="009282"/>
       {props.errors.postalCode &&  (
        <p className="text-red-500 text-xs italic">{props.errors.postalCode}</p>
      )}
    </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-country">
        Country
      </label>
      <input onChange={(e) => props.change(e,COUNTRY) } defaultValue={props.shipping && props.shipping.country}  maxLength="100" className={`appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${ props.errors.country ? "border-red-500": "border-gray-200"}`} id="grid-country" type="text" placeholder="sweden"/>
       {props.errors.country &&  (
        <p className="text-red-500 text-xs italic">{props.errors.country}</p>
      )}
    </div>
  </div>
</form>
            </div>
          </div>
        </div>
      </div>
      )
      }