import { ReactNode, useEffect, useState } from "react";
import TablePaging from "./TablePaging";

interface ITableAdmin {
  fieldTable: string[];
  data: any;
  title: string;
  isPaging: boolean;
  scriptData?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;
  getAllProduct?: (
    key: string,
    page: number,
    productStatus: string,
    categoryId: string
  ) => Promise<void>;
  getAllOrder?: (key: string, page: number, status: string) => Promise<void>;
  getAllAlbum?: (album_type: string, sort_type: string, currentPage: number) => Promise<void>;
}

function TableAdmin(props: ITableAdmin) {
  const [pageActive, setPageActive] = useState<number>(1);

  useEffect(() => {
    props.getAllProduct && props.getAllProduct("", pageActive, "", "");
    props.getAllOrder && props.getAllOrder("", pageActive, "");
    props.getAllAlbum && props.getAllAlbum("", "", pageActive);
  }, [pageActive]);

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
            <tr>
              {/* <td className="px-4 py-2">
                <input id="selectAll" name="selectAll" type="checkbox" />
              </td> */}
              {props.fieldTable.map((e, index) => (
                <td
                  key={index}
                  className={`px-4 py-2 ${index === props.fieldTable.length - 1 ? "text-right" : ""
                    }`}
                >
                  {e}
                </td>
              ))}
            </tr>
          </thead>
          {props.scriptData as ReactNode}
        </table>
      </div>
      {/* paging */}
      {props.isPaging && props?.data?.data?.totalPage >= 2 && (
        <TablePaging
          data={props?.data}
          setPageActive={setPageActive}
          pageActive={pageActive}
        />
      )}
    </div>
  );
}

export default TableAdmin;
