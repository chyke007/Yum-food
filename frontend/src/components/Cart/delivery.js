import React from "react";
export default (props) => {
    return (
        <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Postal Code
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                {props.place ? (
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder="2A/12 Mopi drive, LA, Pluto"/>
                ) : '2A/12 Mopi drive, LA, Pluto'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {props.place ? (
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Lagos"/>
                ) : 'Lagos'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
              {props.place ? (
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-postal" type="text" placeholder="028293"/>
                ) : '028293'}
              </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
              <div className="text-sm text-gray-900">
                {props.place ? (
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 mb-4 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country" type="text" placeholder="Pluto"/>
                ) : 'Pluto'}
              </div>
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