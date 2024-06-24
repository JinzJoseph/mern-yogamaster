import React, { useEffect } from "react";
import axios from "axios";
const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return()=>{
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.request.eject(responseInterceptor);
    }
  }, [axiosInstance]);
  return axiosInstance;
};

export default useAxiosFetch;
