export default function AddProduct() {
  return (
    <div className="w-full h-auto min-h-full bg-white shadow-lg rounded-xl overflow-auto p-3">
      <h1 className="mb-4 mt-2 text-lg font-bold text-gray-700 ">
        Create Product
      </h1>

      {/* Input product name */}
      <div className="flex items-start mb-6">
        <label className="block w-[10%] text-gray-800 font-medium text-sm">
          Product Name
        </label>
        <div className="w-[90%]">
          <input
            className="block w-full h-10 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
            type="text"
            name="name"
            placeholder="Product Name"
            value=""
          />
        </div>
      </div>

      {/* Input thumnail */}
      <div className="flex items-start mb-6">
        <label className="block w-[10%] text-gray-800 font-medium text-sm">
          Thumnail Product
        </label>
        <div className="w-[90%]">
          <div className="w-full text-center">
            <div className="border-2 border-gray-300 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6">
              <input
                accept="image/*,.jpeg,.jpg,.png,.webp"
                type="file"
                className="hidden"
              />
              <span className="mx-auto flex justify-center">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-3xl text-green-500"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </span>
              <p className="text-sm mt-2">Drag your images here</p>
              <em className="text-xs text-gray-400">
                (Only *.jpeg, *.webp and *.png images will be accepted)
              </em>
            </div>
            <div className="text-emerald-500"></div>
            <aside className="flex flex-row flex-wrap mt-4"></aside>
          </div>
        </div>
      </div>

      {/* Input size */}
      
    </div>
  );
}
