import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as orderApi from "@/api/adminApi/orderApi/orderApi";
import { configRouter } from "@/configs/router";
import { toast } from "react-toastify";
import { ArrowLeft } from "@phosphor-icons/react";
import { formatVND } from "@/utils/helper";
import PDFDocument from "@/components/Order/PDFDocument";

interface Topping {
  name: string;
  price: number;
}

interface ItemDetail {
  quantity: number;
  toppingList: Topping[];
  size: string;
  price: number;
  note: string;
}

interface Item {
  productId: string;
  name: string;
  itemDetailList: ItemDetail[];
}

interface ShippingInformation {
  detail: string;
  longitude: number;
  latitude: number;
  note: string;
  recipientName: string;
  phoneNumber: string;
}

interface Transaction {
  id: string;
  status: string;
  paymentType: string;
  totalPaid: number;
}

interface Data {
  id: string;
  totalPayment: number;
  shippingFee: number;
  totalItemPrice: number;
  orderType: string;
  shippingInformation: ShippingInformation;
  createdAt: string;
  itemList: Item[];
  transaction: Transaction;
  branchAddress: string;
}

interface IResponseOrderDetail {
  timestamp: string;
  success: boolean;
  message: string;
  data: Data;
}

function OrderDetail() {
  const [showPDF, setShowPDF] = useState(false);

  const handlePrintInvoice = () => {
    setShowPDF(true);
  };

  const handleDownloadInvoice = () => {
    const fileName = "invoice.pdf"; // Đường dẫn đến file PDF đã tạo
    fetch(fileName)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
      });
  };
  const { id } = useParams();
  const nav = useNavigate();
  const [orderDetail, setOrderDetail] = useState<IResponseOrderDetail>();

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const data = await orderApi.getOrderById(id as string);
        if (data?.success) {
          setOrderDetail(data);
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
        nav(configRouter.orders);
      }
    };
    getOrderDetail();
  }, []);

  const handleRedirectOrders = () => {
    nav(configRouter.orders);
  };

  return (
    <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
      <div className="flex items-center">
        <button
          onClick={handleRedirectOrders}
          className="mr-3 cursor-pointer p-2 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft />
        </button>
        <h1 className="my-6 text-lg font-bold text-gray-700"> Invoice </h1>
      </div>

      <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <div>
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 ">
            <h1 className="font-bold font-serif text-xl uppercase">
              Invoice
              <p className="text-xs mt-1 text-gray-500">
                Status
                <span className="pl-2 font-medium text-xs capitalize">
                  {" "}
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 ">
                      {orderDetail?.data?.orderType}
                    </span>
                  </span>
                </span>
              </p>
            </h1>
            <div className="lg:text-right text-left">
              <p className="text-sm text-gray-500  mt-2">
                {orderDetail?.data?.branchAddress} <br></br>
              </p>
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                DATE
              </span>
              <span className="text-sm text-gray-500  block">
                {orderDetail?.data?.createdAt}
              </span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                INVOICE NO
              </span>
              <span className="text-sm text-gray-500  block">
                {orderDetail?.data?.id}
              </span>
            </div>
            <div className="flex flex-col lg:text-right text-left">
              <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                INVOICE TO
              </span>
              <p className="text-sm text-gray-500  mt-2">
                {orderDetail?.data?.shippingInformation?.detail} <br></br>
                {orderDetail?.data?.shippingInformation?.phoneNumber}
                <br></br>
                <span>
                  {orderDetail?.data?.shippingInformation?.recipientName}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full overflow-hidden border border-gray-200  rounded-lg my-8">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100 ">
                  <tr>
                    <td className="px-4 py-2 text-center">SR.</td>
                    <td className="px-4 py-2 text-center">Product Title</td>
                    <td className="px-4 py-2 text-center">DETAIL</td>
                  </tr>
                </thead>
                <tbody className="text-gray-800  bg-white  divide-y divide-gray-100 text-serif text-sm my-2">
                  {orderDetail?.data?.itemList?.map((item, index) => (
                    <tr className="my-2" key={index}>
                      <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                        <span className="text-gray-700 font-semibold  text-xs text-center my-2">
                          {item?.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap font-bold text-center my-2">
                        <ul>
                          {item?.itemDetailList.map((item) => (
                            <li>
                              Size: {item?.size} - Quantity: {item?.quantity} -
                              price: {formatVND(item?.price ? item?.price : 0)}{" "}
                              <br></br>
                              {item?.toppingList?.length > 0 &&
                                "Topping list: "}
                              {item?.toppingList?.length > 0 &&
                                item?.toppingList?.map((topping) => (
                                  <span>
                                    {topping?.name} -{" "}
                                    {formatVND(
                                      topping?.price ? topping?.price : 0
                                    )}
                                    ,
                                  </span>
                                ))}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 ">
          <div className="flex lg:flex-row md:flex-row flex-col justify-between">
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                PAYMENT METHOD
              </span>
              <span className="text-sm text-gray-500  font-semibold font-serif block">
                {orderDetail?.data?.transaction?.paymentType}
              </span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                SHIPPING COST
              </span>
              <span className="text-sm text-gray-500  font-semibold font-serif block">
                {formatVND(
                  orderDetail?.data?.shippingFee
                    ? orderDetail?.data?.shippingFee
                    : 0
                )}
              </span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                TOAL ITEM PRICE
              </span>
              <span className="text-sm text-gray-500  font-semibold font-serif block">
                {formatVND(
                  orderDetail?.data?.totalItemPrice
                    ? orderDetail?.data?.totalItemPrice
                    : 0
                )}
              </span>
            </div>
            <div className="flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                TOTAL AMOUNT
              </span>
              <span className="text-xl font-serif font-bold text-red-500  block">
                {formatVND(
                  orderDetail?.data?.totalPayment
                    ? orderDetail?.data?.totalPayment
                    : 0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-3 flex justify-between">
        <button
          onClick={handleDownloadInvoice}
          className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent w-auto cursor-pointer"
        >
          Download Invoice
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
        <button
          onClick={handlePrintInvoice}
          className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent w-auto"
        >
          Print Invoice
          <span className="ml-2">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </span>
        </button>
      </div>
      {showPDF && <PDFDocument invoiceContent="sss" />}
    </div>
  );
}

export default OrderDetail;
