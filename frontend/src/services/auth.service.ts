import { AxiosError } from "axios";
import { httpService } from "./http.service";

export const login = async (username: string, password: string) => {
  try {
    const token = await httpService.post("auth/login", { username, password });
    return token;
  } catch (err) {
    throw (err as AxiosError).response?.data.err;
  }
};

export const signup = async (username: string, fullname: string, password: string) => {
  try {
    const token = await httpService.post("auth/signup", { username, fullname, password });
    return token;
  } catch (err) {
    const errInfo = (err as AxiosError).response?.data.err;
    if (Array.isArray(errInfo)) throw errInfo.join("<br>");
    throw (err as AxiosError).response?.data.err;
  }
};
