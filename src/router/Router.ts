// layout
import BlankLayout from "../layout/BlankLayout/blankLayout";
import { configRouter } from "@/configs/router";
import AdminLayout from "@/layout/AdminLayout/adminLayout";
import { FC, lazy } from "react";
// pages

interface LayoutProps {
  children?: React.ReactNode;
}
export interface IRouter {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: FC<LayoutProps>;
  role: string | null;
}

const publicRoutes: IRouter[] = [
  {
    path: configRouter.login,
    component: lazy(() => import("../pages/DefaultPage/Login")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.signUp,
    component: lazy(() => import("../pages/DefaultPage/SignUp")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.forgetPassword,
    component: lazy(() => import("../pages/DefaultPage/ForgetPassword")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.resetPassword,
    component: lazy(() => import("../pages/DefaultPage/ResetPassword")),
    layout: BlankLayout,
    role: null,
  },

  // admin router
  {
    path: configRouter.dashboardAdmin,
    component: lazy(() => import("../pages/AdminPage/DashboardAmin")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.categorys,
    component: lazy(() => import("../pages/AdminPage/Categorys")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.products,
    component: lazy(() => import("../pages/AdminPage/Products")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.profileAdmin,
    component: lazy(() => import("../pages/AdminPage/ProfileAdmin")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.ourStaff,
    component: lazy(() => import("../pages/AdminPage/OurStaff")),
    layout: AdminLayout,
    role: null,
  },

  {
    path: configRouter.orders,
    component: lazy(() => import("../pages/AdminPage/Orders")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.coupons,
    component: lazy(() => import("../pages/AdminPage/Coupons")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.customPage,
    component: lazy(() => import("../pages/AdminPage/CustomPage")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.marketing,
    component: lazy(() => import("../pages/AdminPage/Marketing")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.addMarketting,
    component: lazy(() => import("../pages/AdminPage/AddCampaign")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.addProduct,
    component: lazy(() => import("../pages/AdminPage/AddProduct")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.editProduct,
    component: lazy(() => import("../pages/AdminPage/AddProduct")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.orderDetail,
    component: lazy(() => import("../pages/AdminPage/OrderDetail")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.branchs,
    component: lazy(() => import("../pages/AdminPage/Branchs")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.addBranchs,
    component: lazy(() => import("../components/Branch/CreateBranch")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.editBranchs,
    component: lazy(() => import("../components/Branch/CreateBranch")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.album,
    component: lazy(() => import("../pages/AdminPage/Album")),
    layout: AdminLayout,
    role: null,
  },
  // coupon type
  {
    path: configRouter.couponShipping,
    component: lazy(() => import("../components/Coupon/Shipping/CouponShipping")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponAmountOfProduct,
    component: lazy(() => import("../components/Coupon/AmountOffProduct/ConponAmountOffProduct")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponAmountOfOrder,
    component: lazy(() => import("../components/Coupon/AmountOffOrder/CouponAmountOffOder")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponBuyXGetY,
    component: lazy(() => import("../components/Coupon/BuyXGetY/CouponBuyXGetY")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponShippingEdit,
    component: lazy(() => import("../components/Coupon/Shipping/CouponShipping")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponAmountOfProductEdit,
    component: lazy(() => import("../components/Coupon/AmountOffProduct/ConponAmountOffProduct")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponAmountOfOrderEdit,
    component: lazy(() => import("../components/Coupon/AmountOffOrder/CouponAmountOffOder")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.couponBuyXGetYEdit,
    component: lazy(() => import("../components/Coupon/BuyXGetY/CouponBuyXGetY")),
    layout: AdminLayout,
    role: null,
  },
];
export { publicRoutes };
