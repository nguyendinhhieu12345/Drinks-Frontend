function FilterCategory() {
  return (
    <div className="min-w-0 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0 mb-4">
      <div className="py-2 px-4">
        <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <input
              className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white  focus:border-gray-200 border-gray-200"
              type="search"
              name="search"
              placeholder="Search Category"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-5 mr-1"
            ></button>
          </div>
          <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <div className="w-full mx-1">
              <button
                className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                type="submit"
              >
                Filter
              </button>
            </div>
            <div className="w-full mx-1">
              <button
                className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                type="reset"
              >
                <span className="text-black ">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterCategory;
