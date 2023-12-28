import axios from "axios";
import { AxiosResponse } from "axios";
// const serverUrl = " http://172.20.0.201:5555/";
const serverUrl = " http://192.168.1.109:5555/";

export const API = axios.create({
  baseURL: serverUrl,
  headers: {
    "Access-Control-Allow-Origin": false,
    "content-Type": "application/json",
    withCredentials: true,
  },
});




API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] =  `Bearer ${token}`;


    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const errorApi = (error: {
  response: { data?: { msg?: string } };
  message: string;
}) =>
  error.response && error.response.data
      ? error.response.data.msg
      : error.message;
const error_api =(error_res:any, url: string, method: string, body={}) =>{
    const error_msg = errorApi(error_res)
     console.error(`${method} ${url} error message: ${error_msg}, body: ${JSON.stringify(body)}`);
    return error_msg
    
}
export const objApi = {
  post: async (url:string, body={}) => {
    try {
      const response: AxiosResponse = await API.post(url, body);
      const data = response.data;
      return [true, data];
    } catch (error: any) {
      return [false, error_api(error, url, 'POST', body)]
    }
  },
  get: async (url:string) => {
    try {
      const response: AxiosResponse = await API.get(url);
      const data = response.data;
      return [true, data];
    } catch (error: any) {
      return [false, error_api(error, url, 'GET')]
    }
  },
  put: async (url:string, body={}) => {
    try {
      const response: AxiosResponse = await API.put(url, body);

      const data = response.data;
      return [true, data];
    } catch (error: any) {
      return [false, error_api(error, url, 'PUT', body)]

    }
  },
  delete: async (url:string) => {
    try {
      const response: AxiosResponse = await API.delete(url);
      const data = response.data;
      return [true, data];
    } catch (error: any) {
      return [false, error_api(error, url, 'DELETE')]
    }
  },
}
