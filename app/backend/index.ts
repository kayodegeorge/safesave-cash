import axios from "axios";
import { getSession } from "next-auth/react";
import { SignUpSchemaType } from "../components/SignUpForm";

type LoginResponse = {
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
  status: boolean,
  data: Array<any>,
  message: string
}

export const API_URL = "https://astrapolarismfb.onrender.com/v1";

export const axios_server = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "*/*",
    "content-type": "application/json",
  },
});

axios_server.interceptors.request.use(async (request) => {
  // Get the session
  const session = await getSession();

  // Add your desired session value to the request headers
  if (session) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
    request.headers["sessionToken"] = session.sessionToken;
  }

  return request;
});

export async function login(data: Record<"password" | "userID", string>) {
  const res = await axios_server.post<LoginResponse>("/staff-login", data);
  return res.data;
}

export async function registerStaff ( data: SignUpSchemaType) {
  const res = await axios_server.post<RegistrationResponse>("/staff-registration", data);
  return res.data;
}