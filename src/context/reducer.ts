import axios from "axios";

import { initialState } from "./GlobalContext";
import { LoginResponse, axios_server } from "../backend";

export interface User {
  id: number | null;
  role: string;
  email: string;
  created_at: string;
  accessToken: string;
  refreshToken: string;
  is_authenticated: boolean;
}

export interface Store {
  user: LoginResponse["data"] | null;
}

export interface Action {
  type: string;
  payload?: any;
}

export enum Actions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  AUTHENTICATE = "AUTHENTICATE",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  SET_USER = "SET_USER",
  SET_SIGN_IN_MODAL = "SET_SIGN_IN_MODAL",
  SET_SIGN_UP_MODAL = "SET_SIGN_UP_MODAL",
}

const Reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case Actions.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));

      return {
        ...state,
        user: action.payload,
      };
    case Actions.LOGOUT:
      delete axios.defaults.headers.common["Authorization"];
      delete axios_server.defaults.headers.common["Authorization"];
      localStorage.removeItem("user");

      return { ...initialState };
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export { Reducer };
