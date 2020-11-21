import React from "react";
export default () => {
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
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder="Mars"/>
    </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-city">
        City
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Yemen"/>
    </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-postal">
        Postal Code
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-postal" type="text" placeholder="Mars"/>
    </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-country">
        Country
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country" type="text" placeholder="Sweden"/>
    </div>
    </div>
</form>
            </div>
          </div>
        </div>
      </div>
      )
      }