import React from "react";
import Item1 from '../../assets/img/chicken-rice.jpg'
import { QTY } from "../../constants";
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
              {!props.place && (
              <th scope="col" className="px-6 py-3 bg-gray-50">
                <span className="sr-only">Remove</span>
              </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {props.items && props.items.map((order,i) => (
            <tr key={i}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 rounded-full object-cover" src={order.image ? order.image :Item1} alt="item"/>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium uppercase text-gray-900">
                  {order.name && order.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{order.price && order.price}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2  text-xs leading-5 font-semibold rounded-full ">
             <div className="text-sm text-gray-500">
             {props.place ? (order.qty && order.qty) : (
                <input className="appearance-none outline-none" onChange={(e) => props.change(e,QTY,order._id) }  defaultValue={order.qty} min="0" name="quantity" type="number"/>
             )}
              </div>
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.total && order.total}
            </td>
            {!props.place && (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={(e) => props.change(e,QTY,order._id) } defaultValue={0} className="text-indigo-600 hover:text-indigo-900">Remove</button>
            </td>
            )}
          </tr>
          ))}
          {props.items && props.items.length === 0 && (
            <tr>
            <td colSpan="4" className="px-6 py-4 whitespace-nowrap cursor-pointer">
             <div className="text-sm text-gray-900 text-center">No data available</div>
            </td>
            </tr>
          )}
            </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    )
}