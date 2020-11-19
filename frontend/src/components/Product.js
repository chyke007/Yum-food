import React,{useState} from "react";
import Card1 from '../assets/img/chicken-rice.jpg'
import Card2 from '../assets/img/chicken-fried.jpg'
import Card3 from '../assets/img/yam-sauce.jpg'
import Card4 from '../assets/img/chicken-recipe.jpg'
import end from '../assets/img/end.svg'

export const Product = (props) => {
    const [rating, setRatings] = useState(0)
    const [filter, setFilter] = useState(true)
  return (
      <>
      {filter ? (
      <div className="flex  flex-wrap bg-product-pattern bg-contain md:bg-none justify-center flex-col items-center px-8 md:px-16 ">
         <div className="flex  flex-wrap  bg-product-pattern pb-2 md:px-32 md:py-48 justify-center text-center  text-3xl sm:w-full mt-16 md:mt-8 text-gray-700 md:text-3xl font-bold ">

          <p className="">
          Find the Most Delicious Meals
          Here On <span className="text-gray-900">YumFood</span>
          </p>
         </div>
        <div className="w-full p-4 shadow-xl rounded sm:w-full  bg-white">
        <form>
        <div className="flex flex-wrap justify-center items-center mb-2 ">
            <div className="w-full md:w-2/3 md:px-3 mb-6 md:mb-0">
            <button type="submit" className="absolute mt-5 ml-4">
            <svg className="h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
            </button>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="name" placeholder="Menu name or description"/>
            </div>
           <button className="w-full bg-gray-900 md:w-1/4 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500"> Search</button>
        </div>
        </form>
        </div>

        <div className="flex flex-wrap justify-between my-12 w-full">
       <section className="hidden md:flex md:flex-wrap flex-col">
            <div className="side-menu">
                <h3 className="text-gray-900 text-lg font-bold">Price</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦1 - ₦5000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦5100 - ₦10000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦10100 - ₦15000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦15100 - ₦20000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦20000 - ₦25000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦25100+</span>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className="text-gray-900 text-lg font-bold">Reviews</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">1 - 10</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">11 - 20</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">21 - 30</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">31 - 40</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">41 - 50</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">50+</span>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className=" text-gray-900 text-lg font-bold">Ratings</h3>
                <div className="flex flex-col">
                <p className="py-2"> {rating} Rating</p>
                    <label className="inline-flex items-center mt-3">
                    <input type="range" onChange= {(e) => setRatings(e.target.value)} className="appearance-none h-1 outline-none w-full bg-gray-400 rounded" min="0" max="5" name="ratings" defaultValue="0"></input>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className="text-gray-900 text-lg font-bold">Active</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">Yes</span>
                    </label>
                </div>
            </div>
       </section>
       <section className="w-full md:hidden mb-12">
       <button onClick={() => {setFilter(!filter)}} className="w-full  bg-white border border-gray-500 text-black rounded py-4 px-4 leading-tight focus:outline-none focus:bg-gray-900 focus:text-white focus:border-gray-200">
       Filter Results
       <svg className=" mx-2 inline-block" xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
<path d="M5.83333 10H9.16667V8.33333H5.83333V10ZM0 0V1.66667H15V0H0ZM2.5 5.83333H12.5V4.16667H2.5V5.83333Z" fill="#0F142C"/>
</svg>
       </button>
       </section>
       <section className="w-full md:w-3/5 lg:w-4/5 flex flex-wrap justify-end">
       <div className="shadow-2xl mb-32 ml-0 md:ml-8  w-full h-64 lg:w-72 cursor-pointer">
                <div className="relative pb-5/6 h-64">
                     <img className=" h-full w-full object-cover rounded-lg shadow-md" src={Card1} alt="imageAlt"/>
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                            <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">New</span>
                             <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                Fried rice and chicken
                            </div>
                        </div>
                    <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
                        Tasty fried rice as you like it
                    </h4>
                    <div className="mt-1">
                    ₦5000
                        <span className="text-gray-600 text-sm"> / plate</span>
                    </div>
                    <div className="mt-2 flex items-center">
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-gray-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <span className="ml-2 text-gray-600 text-sm">222 reviews</span>
                </div>
            </div>
        </div>

    </div>
    <div className="shadow-2xl mb-32 ml-0 md:ml-8  w-full h-64 lg:w-72 cursor-pointer">
                <div className="relative pb-5/6 h-64">
                     <img className=" h-full w-full object-cover rounded-lg shadow-md" src={Card2} alt="imageAlt"/>
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                             <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                             Vegan Fried rice and  paprika chicken
                            </div>
                        </div>
                    <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
                        Tasty fried rice as you like it delivered to your doorstep
                    </h4>
                    <div className="mt-1">
                    ₦8500
                        <span className="text-gray-600 text-sm"> / plate</span>
                    </div>
                    <div className="mt-2 flex items-center">
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-gray-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <span className="ml-2 text-gray-600 text-sm">96 reviews</span>
                </div>
            </div>
        </div>

    </div>
    <div className="shadow-2xl mb-32 ml-0 md:ml-8  w-full h-64 lg:w-72 cursor-pointer">
                <div className="relative pb-5/6 h-64">
                     <img className=" h-full w-full object-cover rounded-lg shadow-md" src={Card3} alt="imageAlt"/>
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                            <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">New</span>
                             <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                Nigerian Egg stew
                            </div>
                        </div>
                    <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
                        One of its kind delivered straight to
                    </h4>
                    <div className="mt-1">
                    ₦2500
                        <span className="text-gray-600 text-sm"> / plate</span>
                    </div>
                    <div className="mt-2 flex items-center">
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <span className="ml-2 text-gray-600 text-sm">16 reviews</span>
                </div>
            </div>
        </div>

    </div>
    <div className="shadow-2xl mb-32 ml-0 md:ml-8  w-full h-64 lg:w-72 cursor-pointer">
                <div className="relative pb-5/6 h-64">
                     <img className=" h-full w-full object-cover rounded-lg shadow-md" src={Card4} alt="imageAlt"/>
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                            <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">New</span>
                             <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                             Somerset chicken recipe
                            </div>
                        </div>
                    <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
                       Delicious Chicken recipe as you love it, delivered to your doorstep
                    </h4>
                    <div className="mt-1">
                    ₦7600
                        <span className="text-gray-600 text-sm"> / plate</span>
                    </div>
                    <div className="mt-2 flex items-center">
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-teal-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="text-gray-500 h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <span className="ml-2 text-gray-600 text-sm">67 reviews</span>
                </div>
            </div>
        </div>

    </div>
    <div className="animate-pulse shadow-2xl mb-32 m-2  md:m-0 md:mb-32 md:ml-8  w-full h-64 lg:w-72 cursor-pointer">
                <div className="relative pb-5/6 h-64 rounded-lg shadow-md bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300" >
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                             <div className="ml-2 bg-gray-300 w-full text-gray-300 text-xs uppercase font-semibold tracking-wide">
                                Fn
                            </div>
                        </div>
                    <h4 className="mt-1 font-semibold text-gray-300 w-full  bg-gray-300 leading-tight truncate">
                        s
                    </h4>
                    <div className="mt-1">
                    <span className="text-gray-300  bg-gray-300 ">1000 naira</span>&nbsp;&nbsp;&nbsp;
                    <span className=" text-gray-300  bg-gray-300  text-sm">plate number</span>
                    </div>
                    <div className="mt-2 flex items-center">
                    <br/>
                    <span className=" text-gray-300  bg-gray-300  text-sm">star1 start2 start3</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className=" text-gray-300  bg-gray-300  text-sm">reviews number</span>
                </div>
            </div>
        </div>

    </div>
    <div className="animate-pulse shadow-2xl mb-32 m-2 md:m-0 md:mb-32 md:ml-8  w-full h-64 lg:w-72 cursor-pointer">
                <div className="relative pb-5/6 h-64 rounded-lg shadow-md bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300" >
                </div>
                <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                             <div className="ml-2 bg-gray-300 w-full text-gray-300 text-xs uppercase font-semibold tracking-wide">
                                Fn
                            </div>
                        </div>
                    <h4 className="mt-1 font-semibold text-gray-300 w-full  bg-gray-300 leading-tight truncate">
                        s
                    </h4>
                    <div className="mt-1">
                    <span className="text-gray-300  bg-gray-300 ">1000 naira</span>&nbsp;&nbsp;&nbsp;
                    <span className=" text-gray-300  bg-gray-300  text-sm">plate number</span>
                    </div>
                    <div className="mt-2 flex items-center">
                    <br/>
                    <span className=" text-gray-300  bg-gray-300  text-sm">star1 start2 start3</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className=" text-gray-300  bg-gray-300  text-sm">reviews number</span>
                </div>
            </div>
        </div>

    </div>
 </section>
        </div>
<div>
    <p className="flex flex-row text-center mb-4">
        Yaay! You're all caught up
        <img className="mx-4" src={end} alt="end"/>
    </p>
</div>

</div>):(
<div className="z-10 absolute h-screen mb-0 w-full bg-white top-0 bottom-0">
<header className="bg-gray-900 text-lg font-bold text-white flex justify-between p-4">
    Filter results
    <span className=" cursor-pointer" onClick={() => {setFilter(!filter)}}>
        X
    </span>
</header>
<section className="px-4">
<div className="side-menu">
                <h3 className="text-gray-900 text-lg font-bold">Price</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦1 - ₦5000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦5100 - ₦10000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦10100 - ₦15000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦15100 - ₦20000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦20000 - ₦25000</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">₦25100+</span>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className="text-gray-900 text-lg font-bold">Reviews</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">1 - 10</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">11 - 20</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">21 - 30</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">31 - 40</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">41 - 50</span>
                    </label>
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">50+</span>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className=" text-gray-900 text-lg font-bold">Ratings</h3>
                <div className="flex flex-col">
                <p className="py-2"> {rating} Rating</p>
                    <label className="inline-flex items-center mt-3">
                    <input type="range" onChange= {(e) => setRatings(e.target.value)} className="appearance-none h-1 outline-none w-full bg-gray-400 rounded" min="0" max="5" name="ratings" defaultValue="0"></input>
                    </label>
                </div>
            </div>
            <div className="side-menu mt-12">
                <h3 className="text-gray-900 text-lg font-bold">Active</h3>
                <div className="flex flex-col">
                    <label className="inline-flex items-center mt-3">
                     <input type="checkbox" className="cursor-pointer h-8 w-8 text-gray-900 p-4" /><span className="ml-2 text-gray-700">Yes</span>
                    </label>
                </div>
            </div>
            <button className="w-full mt-12 mb-4 bg-gray-900 md:w-1/4 border border-gray-200 text-white rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:text-black focus:border-gray-500"> Apply Filters</button>
</section>
</div>
)}
</>
  );
};
