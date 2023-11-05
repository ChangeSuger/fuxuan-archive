import axios from "axios";
import type { AxiosResponse } from 'axios';

const TIMEOUT = 5; // second

const service = axios.create({
  timeout: TIMEOUT * 1000,
  headers: {},
  withCredentials: false,
});

service.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;