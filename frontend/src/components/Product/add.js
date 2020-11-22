import React from "react";
import Item1 from '../../assets/img/chicken-rice.jpg'
export default (props) => {
  return (
    <>
<div class="bg-white m-4 flex flex-col justify-center items-center shadow overflow-hidden sm:rounded-lg">
    <button className="my-2 py-2"id="user-profile" aria-haspopup="true">
    <span className="sr-only">Open user menu</span>
     <img className=" h-44 w-44 rounded-full object-contain" src={Item1} alt=""/>
    </button>

  <div class="px-4 py-5 w-full sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Add Product
    </h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Fill in product deatils
    </p>
  </div>
  <div class="w-full border-t border-gray-200">
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Product Name
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="Jellof rice"/>
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
         Product price
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <span className="w-full inline-flex items-center rounded-md border border-r-1  bg-gray-200 text-gray-700 mb-2 border-gray-200 text-sm  focus:outline-none focus:bg-white focus:border-gray-500">
        <span className="h-8 w-10 px-4 py-2 font-bold cursor-pointer fill-current">₦</span>
        <input className="appearance-none block w-full py-3 px-4 leading-tight" id="grid-price" type='text' placeholder="1000"/>
          <span className="h-8 w-10 px-2 py-2  cursor-pointer fill-current">.00</span>
        </span>
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Product description
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" aria-label=""></textarea>
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <button className="w-full mt-4 bg-gray-900 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500 hover:bg-white hover:text-black hover:border-gray-500">
            ADD
        </button>
        </dd>
      </div>
     </dl>
  </div>
</div>
</>
  );
};
