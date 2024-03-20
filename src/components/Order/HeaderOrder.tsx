const HeaderOrder = () => {
  return (
    <div className="flex items-start justify-between mb-4">
      <h1 className="mt-2 mb-4 text-lg font-bold text-gray-700 ">Orders</h1>
      <div className="mx-1">
        <button
          type="button"
          className="flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-green-500 border border-transparent hover:bg-green-600 "
        >
          Download All Orders
          <span className="ml-2 text-base">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeaderOrder;
