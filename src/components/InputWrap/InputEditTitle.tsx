import { Pencil } from "@phosphor-icons/react";
import React from "react";

const InputEditTitle = (props: {
  value?: string;
  onSubmit?: (data: string) => void;
  className?: string;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>(props.value || "");
  const [enableEditTitle, setEnableEditTitle] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (props.onSubmit) {
      inputRef.current?.focus();
      if (enableEditTitle === false) {
        if (value !== props.value) {
          props.onSubmit(value);
        }
      }
    }
  }, [enableEditTitle]);
  return (
    <div>
      {!enableEditTitle ? (
        <div
          className="flex items-center justify-start gap-2"
          onClick={() => setEnableEditTitle(true)}
        >
          <h3
            className={
              props.className ? props.className : "text-black font-bold text-lg max-w-48 break-all"
            }
          >
            {value}
          </h3>
          <Pencil size={20} className="text-gary-500" />
        </div>
      ) : (
        <input
          className="border border-gray-300 rounded-md px-2"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEnableEditTitle(false)}
        />
      )}
    </div>
  );
};

export default InputEditTitle;
