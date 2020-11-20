import React from "react";
import Item1 from '../../assets/img/chicken-rice.jpg'
import Item2 from '../../assets/img/chicken-fried.jpg'
import Item3 from '../../assets/img/yam-sauce.jpg'
import Item4 from '../../assets/img/chicken-recipe.jpg'
export default () => {
    return (
        <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
              <th scope="col" className="px-6 py-3 bg-gray-50">
                <span className="sr-only">Remove</span>
              </th>
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
                <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
                </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Remove</a>
              </td>
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
                <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
                </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Remove</a>
              </td>
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
                <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
                </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Remove</a>
              </td>
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
                <input className="appearance-none outline-none " min="0" name="quantity" defaultValue="1" type="number"/>
                </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              3000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Remove</a>
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