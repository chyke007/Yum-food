import React from "react";
import Item1 from '../../assets/img/chicken-rice.jpg'
import Item2 from '../../assets/img/chicken-fried.jpg'
import Item3 from '../../assets/img/yam-sauce.jpg'
import Item4 from '../../assets/img/chicken-recipe.jpg'
export default (props) => {
    return (
        <div className="flex flex-col -mb-64">
  <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div className="w-full md:w-2/3  my-4">
            <button type="submit" className="absolute mt-3 ml-2 items-center pointer-events-none">
            <svg className="h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
            </button>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="name" placeholder="Order name , Product name or description"/>
        </div>
       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price(₦)
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total(₦)
              </th>
              {props.place ? '' : (

              <th scope="col" className="px-6 py-3 bg-gray-50">
                <span className="sr-only">Remove</span>
              </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full object-cover" src={Item1} alt="item"/>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium uppercase text-gray-900">
                    FRIED RICE AND CHICKEN
                    </div>
                    <div className="text-sm text-gray-500">
                      Today
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
               {props.place ? '1' : (
                  <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
               )}
                </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              {props.place ? '' : (

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Remove</button>
              </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full object-cover" src={Item2} alt="item"/>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                    VEGAN FRIED RICE AND PAPRIKA CHICKEN
                    </div>
                    <div className="text-sm text-gray-500">
                      Today
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
               {props.place ? '1' : (
                  <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
               )}
               </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              {props.place ? '' : (

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Remove</button>
              </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full object-cover" src={Item3} alt="item"/>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium uppercase text-gray-900">
                    NIGERIAN EGG STEW
                    </div>
                    <div className="text-sm text-gray-500">
                      Today
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
               {props.place ? '1' : (
                  <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
               )}
               </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              {props.place ? '' : (

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Remove</button>
              </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full object-cover" src={Item4} alt="item"/>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium uppercase text-gray-900">
                    SOMERSET CHICKEN RECIPE
                    </div>
                    <div className="text-sm text-gray-500">
                      Today
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">3000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
               <div className="text-sm text-gray-500">
               {props.place ? '1' : (
                  <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
               )}
              </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              {props.place ? '' : (

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">Remove</button>
              </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    )
}