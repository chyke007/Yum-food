import React from "react";

export default (props) => {
        return (
       <div className="bg-white w-10/12 overflow-auto px-4 py-3 flex items-center sm:px-6">
  <div className="flex-1 flex mt-12 justify-between sm:hidden">
    <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
      Previous
    </a>
    <a href="/" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
      Next
    </a>
  </div>
  <div className="hidden sm:flex-1 ml-32 sm:flex sm:items-center sm:justify-between my-16">
    <div>
      <p className="text-sm px-2 text-gray-700">
        Showing
        <span className="font-medium px-1">1</span>
        to
        <span className="font-medium px-1">10</span>
        of
        <span className="font-medium px-1">97</span>
        results
      </p>
    </div>
    <div>
      <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
        <a href="/" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          1
        </a>
        <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          2
        </a>
        <a href="/" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          3
        </a>
        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
          ...
        </span>
        <a href="/" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          8
        </a>
        <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          9
        </a>
        <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          10
        </a>
        <a href="/" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</div>

    )
}