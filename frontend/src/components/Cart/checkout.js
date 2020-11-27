import React from "react";
export default (props) => {
    return (
        <div className=" shadow-2xl rounded-lg border-gray-500 mx-2  xl:mx-0 p-4">
   <table className="border-gray-200 p-4 w-full">
            <tbody>
            <tr className="font-bold text-lg rounded-xl text-white bg-gray-900 my-2 p-2">
                    <td className="px-2">{props.header}</td>
                    <td>₦{props.total}</td>
                </tr>
                <tr className="text-black ">
                    <td>Items({props.qty ? props.qty : '1'})</td>
                    <td>₦{props.items}</td>
                </tr>
                <tr className="text-black">
                    <td>Shipping</td>
                    <td>₦{props.shipping}</td>
                </tr>
                <tr className="text-black ">
                    <td>Tax</td>
                    <td>₦{props.tax}</td>
                </tr>
            </tbody>
        </table>
{props.children}
        </div>
    )
}