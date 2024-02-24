import { CaretLeft, CaretRight } from "@phosphor-icons/react";

function TablePaging() {
  return (
    <div className="px-4 py-3 border-t border-gray-200  bg-white text-gray-500 ">
      <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 ">
        <span className="flex items-center font-semibold tracking-wide uppercase">
          Showing 1-10 of 500
        </span>
        <div className="flex mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Product Page Navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                  type="button"
                  aria-label="Previous"
                >
                  <CaretLeft size={12} />
                </button>
              </li>
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className={`${
                    i === 0
                      ? "bg-green-500 rounded-md"
                      : "hover:bg-gray-100 rounded-md"
                  }`}
                >
                  <button
                    className={`${
                      i === 0 ? "bg-green-500 hover:bg-green-500" : ""
                    }inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 border border-transparent `}
                    type="button"
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                  type="button"
                  aria-label="Next"
                >
                  <CaretRight size={12} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TablePaging;
