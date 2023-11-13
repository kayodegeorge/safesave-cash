import axios from "axios";

import { ValidationSchemaType } from "../components/CustomerRegistrationForm";
import { VerifyCustomerSchemaType } from "../components/CustomerVerificationForm";
import { ResetPasswordSchemaType } from "../components/ResetPasswordForm";
import { SignUpSchemaType } from "../components/SignUpForm";
import { StaffVerificationSchemaType } from "../components/StaffVerification";

export type LoginResponse = {
  status: boolean;
  data: {
    id: number;
    email: string;
    phoneNumber: string;
    staffID: string;
    staffName: string;
    branch: string;
    sessionToken: string;
    accessToken: string;
    signUpDate: string;
  };
  message: string;
};

type RegistrationResponse = {
  status: boolean;
  data: Array<any>;
  message: string;
};

export type VerifyCustomerResponse = {
  status: boolean;
  data: {
    fullname: string;
    sex: string;
    foto: string;
    addr: Array<string>;
    fone: Array<string>;
  };
  message: string;
};

type ResetPasswordResponse = {
  status: boolean;
  data: Array<any>;
  message: string;
};

type CreateAccountResponse = {
  status: boolean;
  data: {
    $id: string;
    Payload: {
      $id: string;
      Id: string;
      Name: string;
    };
    ErrorDetails: any;
    ResponseCode: any;
  };
  message: string;
};

type VerifyStaffResponse = {
  status: boolean;
  data: [
    {
      id: string;
      staffid: string;
      fullName: string;
    }
  ];
  message: string;
};

export const API_URL = "https://astrapolarismfb.onrender.com/v1";

export const axios_server = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "*/*",
    "content-type": "application/json",
  },
});

const authUrls = ["/staff-login", "/staff-registration"];

axios_server.interceptors.request.use(function (request) {
  const isAuthUrl = authUrls.some((url) => request.url?.includes(url));

  if (isAuthUrl) return request;

  const accessToken = JSON.parse(localStorage.getItem("user")!).accessToken;
  const sessionToken = JSON.parse(localStorage.getItem("user")!).sessionToken;

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (sessionToken) {
    request.headers["sessionToken"] = sessionToken;
  }

  return request;
});

export async function login(data: Record<"password" | "userID", string>) {
  const res = await axios_server.post<LoginResponse>("/staff-login", data);
  return res.data;
}

export async function registerStaff(data: SignUpSchemaType) {
  const res = await axios_server.post<RegistrationResponse>(
    "/staff-registration",
    data
  );
  return res.data;
}

export async function verifyCustomer(data: VerifyCustomerSchemaType) {
  const res = await axios_server.post<VerifyCustomerResponse>(
    "/verify-customer",
    data
  );
  return res.data;
}

export async function registerCustomer(data: ValidationSchemaType) {
  const res = await axios_server.post<VerifyCustomerResponse>(
    "/customer-registration",
    data
  );
  return res.data;
}

export async function createAccount({
  bvn,
  address,
  phoneNumber,
}: {
  bvn: string;
  address: string;
  phoneNumber: string;
}) {
  const res = await axios_server.post<CreateAccountResponse>(
    "/create-account",
    { bvn: bvn, address: address, phoneNumber: phoneNumber }
  );
  return res.data;
}

export async function resetPassword(data: ResetPasswordSchemaType) {
  const res = await axios_server.put<ResetPasswordResponse>(
    "/reset-password",
    data
  );
  return res.data;
}

export async function verifyStaff(data: StaffVerificationSchemaType) {
  const res = await axios_server.post<VerifyStaffResponse>(
    "/verify-staff",
    data
  );
  return res.data;
}
