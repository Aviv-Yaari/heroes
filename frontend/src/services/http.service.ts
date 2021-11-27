import Axios, { Method } from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3030/api/";

async function ajax(endpoint: string, method: Method = "GET", data: {} | null = null) {
  try {
    const res = await Axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
    );
    throw err;
  }
}

export const httpService = {
  get(endpoint: string, data?: {}) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data: {} | null) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data: {} | null) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string, data?: {}) {
    return ajax(endpoint, "DELETE", data);
  },
};
