import { formatVND } from "@/utils/helper";
import { ReactNode, SVGProps } from "react";

interface IColumnDashboard {
    icon: SVGProps<SVGSVGElement>;
    title: string;
    price: number;
    bgColor: string;
    setTypeSelect: React.Dispatch<React.SetStateAction<string>>
    typeSelect: string
}
export const ColumnDashboard = (props: IColumnDashboard) => {
    const handleSetType = () => {
        if (props?.title === "Today Orders") {
            props?.setTypeSelect("day")
        }
        else if (props?.title === "This Month") {
            props?.setTypeSelect("month")
        }
        else {
            props?.setTypeSelect("year")
        }
    }

    return (
        <button onClick={handleSetType} className={`min-w-0 w-[30%] bg-${props?.bgColor} active:bg-green-500 focus:bg-green-500 rounded-lg overflow-hidden bg-blue-400 flex justify-center text-center h-full`}>
            <div
                className={`w-full p-6 rounded-lg text-white`}
            >
                <div
                    className={`text-center inline-block text-3xl text-white`}
                >
                    {props.icon as ReactNode}
                </div>
                <div>
                    <p className="mb-3 text-base font-medium text-gray-50 ">
                        {props.title}
                    </p>
                    <p className="text-2xl font-bold leading-none text-gray-50 ">
                        {formatVND(props.price as number)}
                    </p>
                </div>
            </div>
        </button>
    );
};
