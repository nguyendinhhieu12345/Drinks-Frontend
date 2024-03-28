import { AuthState } from "@/features/auth/authSlice";
import { SocketState } from "@/features/socket/socketSlice";

export interface SliceState {
  authSlice: AuthState;
  socketSlice: SocketState;
}

export interface IUser {
  username: string;
  full_name: string;
  email: string;
  avatar: string;
  phone: string;
  role: string;
  birthday: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
}

export interface IProduct {
  id: string;
  name: string;
  thumbnailUrl: string;
  status: string;
  price: number;
}

export interface IBranch {
  id: string;
  name: string;
  status: string;
  phoneNumber: string;
  fullAddress: string;
  operatingTime: string;
}

export interface IStaff {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: boolean;
  status: string;
}

export interface ICoupon {
  code: string,
  description: string,
  usageConditionList?: {
    type: string,
    value?: number
  }[],
  combinationConditionList?: {
    type: string
  }[],
  minPurchaseCondition?: {
    value: string
  },
  targetObjectConditionList?: {
    objectId: string;
    value: number
  }[],
  unitReward: string,
  valueReward: number,
  startDate: string,
  expirationDate: string
}
