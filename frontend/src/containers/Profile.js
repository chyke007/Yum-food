import React from "react";
import avatar from '../assets/img/avatar.png'
export const Profile = (props) => {
  return (
    <>
<div class="bg-white m-4 flex flex-col justify-center items-center shadow overflow-hidden sm:rounded-lg">
    <button className="my-2 py-2"id="user-profile" aria-haspopup="true">
    <span className="sr-only">Open user menu</span>
     <img className=" h-44 w-44 rounded-full object-contain" src={avatar} alt=""/>
    </button>

  <div class="px-4 py-5 w-full sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      User Information
    </h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Personal details
    </p>
  </div>
  <div class="w-full border-t border-gray-200">
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Full name
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          Margot Foster
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Account Type
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          User
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Email address
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          johndoe@example.com
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Phone number
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          +234594048394
        </dd>
      </div>
     </dl>
  </div>
</div>
</>
  );
};
