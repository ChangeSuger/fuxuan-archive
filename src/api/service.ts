import axios from "axios";
import type { AxiosResponse } from 'axios';

const TIMEOUT = 60 * 1000; // 60s

const service = axios.create({
  timeout: TIMEOUT,
  headers: {},
  withCredentials: false,
});

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