interface IFilterAlbums {
    setFilters: (value: React.SetStateAction<{
        album_type: string;
        sort_type: string;
    }>) => void,
    handleFilter: () => void,
    handleResetFilter: () => void
}

function FilterAlbums({ setFilters, handleFilter, handleResetFilter }: IFilterAlbums) {
    return (
        <div className="min-w-0 my-5 rounded-lg overflow-hidden bg-white shadow-xs rounded-t-lg rounded-0">
            <div className="py-2 px-4">
                <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <select
                            onChange={(e) => setFilters((prev: any) => ({
                                ...prev,
                                album_type: e.target.value.toUpperCase()
                            }))}
                            className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:shadow-none leading-5"
                        >
                            <option value="All">
                                All
                            </option>
                            <option value="Product">
                                Product
                            </option>
                            <option value="Category">
                                Category
                            </option>
                        </select>
                    </div>
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <select
                            onChange={(e) => setFilters((prev: any) => ({
                                ...prev,
                                sort_type: e.target.value.toUpperCase()
                            }))}
                            className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:shadow-none leading-5"
                        >
                            <option value="CREATED_AT_ASC">
                                Created ASC
                            </option>
                            <option value="CREATED_AT_DESC">
                                Created DESC
                            </option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <div className="w-full mx-1">
                            <button
                                className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 h-12 w-full"
                                type="submit"
                                onClick={handleFilter}
                            >
                                Filter
                            </button>
                        </div>
                        <div className="w-full mx-1">
                            <button
                                className="transition-colors duration-150 font-medium text-gray-600 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm"
                                type="reset"
                                onClick={handleResetFilter}
                            >
                                <span className="text-black ">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterAlbums