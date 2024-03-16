import { MagnifyingGlassPlus, Printer } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import * as orderApi from "@/api/adminApi/orderApi/orderApi";
import { useEffect, useState } from "react";
import TableAdmin from "@/components/TableAdmin/TableAdmin";
import HeaderOrder from "@/components/Order/HeaderOrder";
import FilterOrder from "@/components/Order/FilterOrder";

interface IResponseOrders {
  timestamp: string;
  success: boolean;
  message: string;
  data: {
    totalPage: number;
    orderList: IOrder[];
  };
}
interface IOrder {
  id: string;
  createdAt: string;
  orderType: string;
  customerName: string;
  total: number;
  statusLastEvent: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<IResponseOrders>();
  const nav = useNavigate();

  const getAllOrder = async (key: string, page: number, status: string) => {
    const data = await orderApi.getAllOrder(key, page, status);
    setOrders(data);
  };

  const handleRedirectOrderDetail = () => {
    nav("/admin/orders/123");
  };

  useEffect(() => {
    getAllOrder("", 1, "");
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        {/* Header order */}
        <HeaderOrder />

        {/* Filter */}
        <FilterOrder getAllOrder={getAllOrder} />

        {/* Table category */}
        <TableAdmin
          fieldTable={[
            "id",
            "Type order",
            "Customer",
            "Total",
            "Status",
            "actions",
          ]}
          data={orders}
          isPaging={true}
          title="Orders"
          getAllOrder={getAllOrder}
          scriptData={
            <tbody className="bg-white divide-y divide-gray-100  text-gray-800">
              {orders?.data?.orderList?.map((order, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">
                    <span className="text-sm">{order.id}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-sm">{order.orderType}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-sm font-semibold">
                      {order?.customerName}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-sm font-semibold">
                      {order?.total}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-sm font-semibold">
                      {order?.statusLastEvent}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex justify-end text-right">
                      <button className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none">
                        <p data-tip="true" data-for="edit" className="text-xl">
                          <Printer />
                        </p>
                      </button>
                      <button
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        onClick={handleRedirectOrderDetail}
                      >
                        <p
                          data-tip="true"
                          data-for="delete"
                          className="text-xl"
                        >
                          <MagnifyingGlassPlus />
                        </p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        />
      </div>
    </div>
  );
}
