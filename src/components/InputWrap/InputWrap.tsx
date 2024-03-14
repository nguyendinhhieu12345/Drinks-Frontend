import { ChangeEvent } from "react";

interface IInputWrap {
  value: string;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
  placeholder: string;
  type: string;
  title: string;
  keyName: string;
}
function InputWrap(props: IInputWrap) {
  return (
    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
      <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
        {props?.title}
      </label>
      <div className="col-span-8 sm:col-span-4">
        <input
          className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
          type={props.type}
          name="name"
          placeholder={props.placeholder}
          value={props?.value}
          onChange={(e) => props?.handleInputChange(e, props?.keyName)}
        />
      </div>
    </div>
  );
}

export default InputWrap;
