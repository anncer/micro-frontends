/* eslint-disable @typescript-eslint/no-non-null-assertion */
import GlobalRequest from "./request";
import cookie from "@/utils/cache";
// @ts-ignore
// import { portMap } from "../utils";
import type { AxiosRequestHeaders } from 'axios';


const Api = new GlobalRequest({
  baseURL: `http://localhost:${8090}`,
  interceptors: {
    requestInterceptor: (config) => {
      const token = cookie.get("ESP-TOKEN");
      console.log(config, 'config')
      // if (token) {
        const headers:AxiosRequestHeaders = {};
        headers['ESP-TOKEN'] = token;
        headers.Authorization = token;
        config.headers = config.headers ? { ...config.headers, ...headers } : headers;
      // }
      return config;
    },
    requestInterceptorCatch: (error) => {
      return Promise.reject(error);
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (error) => {
      return Promise.reject(error);
    }
  }
});

export default Api;
