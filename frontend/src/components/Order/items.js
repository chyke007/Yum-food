import React from "react";
import { withRouter  } from 'react-router-dom';
const Items = (props) => {
    return (
        <div className="w-full flex flex-col overflow-auto">
  <div className="">
    <div className="py-2  align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div className="w-full flex justify-end my-4">
    <div className="mt-1 flex w-1/2 rounded-md shadow-sm">
      <span className="inline-flex items-center px-3 rounded-l-md border border-r-1 border-gray-300 bg-gray-50 text-gray-500 text-sm">
        <svg className="h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"><path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path></svg>
        </span>
        <input className=" py-2 px-2 border border-1 focus:outline-none focus:bg-white focus:border-gray-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" id="grid-name" type="name" placeholder="Shipping details"/>

      </div>
    </div>
       <div className="shadow  border-b w-full  overflow-hidden border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price(₦)
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unique Items
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shpping Details
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
               <div className="text-sm text-gray-900">johndoe@example.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">5</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
                <p><b>Address</b>: 2A/12 Mopi drive, LA, Pluto</p>
                <p><b>City</b>: Lagos</p>
                <p><b>Postal Code</b>: 028293</p>
                <p><b>Country</b>:Pluto</p>
              </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ACCEPTED
              </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              </td>
            </tr>
            <tr>
            <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">johndoe@example.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap  cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap  cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">5</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
                <p><b>Address</b>: 2A/12 Mopi drive, LA, Pluto</p>
                <p><b>City</b>: Lagos</p>
                <p><b>Postal Code</b>: 028293</p>
                <p><b>Country</b>:Pluto</p>
              </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      DECLINED
              </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mx-1">Delete</button>
              </td>
            </tr>
            <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">johndoe@example.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap  cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <div className="text-sm text-gray-900">5</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
                <p><b>Address</b>: 2A/12 Mopi drive, LA, Pluto</p>
                <p><b>City</b>: Lagos</p>
                <p><b>Postal Code</b>: 028293</p>
                <p><b>Country</b>:Pluto</p>
              </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer" onClick={() => {props.history.push('/order/1234')}}>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      PENDING
              </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 border-0" onClick={() => {props.history.push('/order/22')}}>Edit</button>
                <button className="text-indigo-600 hover:text-indigo-900 mx-1">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    )
}

export default withRouter (Items);