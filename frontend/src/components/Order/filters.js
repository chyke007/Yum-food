import React from "react";
export default (props) => {
    return (
        <>
          <div className="side-menu">
                <h3 className="text-gray-900 text-lg font-bold">Price</h3>
                <div className="flex flex-col">
                <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"price") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="100-5000" /><span className="ml-2 text-gray-700">₦100 - ₦5000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"price") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="5100-10000" /><span className="ml-2 text-gray-700">₦5100 - ₦10000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"price") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="10100-15000" /><span className="ml-2 text-gray-700">₦10100 - ₦15000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"price") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="15100-20000" /><span className="ml-2 text-gray-700">₦15100 - ₦20000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"price") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="21000-25000" /><span className="ml-2 text-gray-700">₦21000 - ₦25000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"price") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="25100-*" /><span className="ml-2 text-gray-700">₦25100+</span>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className="text-gray-900 text-lg font-bold">Status</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"status") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="ACCEPTED" /><span className="ml-2 text-gray-700">ACCEPTED</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"status") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="PENDING" /><span className="ml-2 text-gray-700">PENDING</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input onChange={(e) => props.change(e,"status") } type="checkbox" className="cursor-pointer h-8 w-8 form-tick text-white appearance-none border border-gray-300 rounded-md checked:bg-gray-600 checked:border-transparent text-center focus:outline-none p-1" defaultValue="DECLINED" /><span className="ml-2 text-gray-700">DECLINED</span>
                    </label>
                </div>
            </div>
        </>
    )
}