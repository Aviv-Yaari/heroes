import Axios, { AxiosError, Method } from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/';
const axios = Axios.create({
  withCredentials: true,
});

async function ajax(endpoint: string, method: Method = 'GET', data: {} | null = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    });
    return res.data;
  } catch (err) {
    console.dir(err);
    throw (err as AxiosError).response?.data.err;
  }
}

export const httpService = {
  get(endpoint: string, data?: {}) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint: string, data?: {} | null) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint: string, data?: {} | null) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint: string, data?: {}) {
    return ajax(endpoint, 'DELETE', data);
  },
};
