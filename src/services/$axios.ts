import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  timeout: 5 * 1000, // 超时设置(单位毫秒)，无超时时间设置为 0。
  responseType: "json", // 响应的数据格式：json/blob/document/arraybuffer/text/stream
  headers: {
    "X-Requested-With": "XMLHttpRequest", // CAS 依靠此参数识别是否为 ajax 请求
    "Content-Type": "application/json",
  },
};

const $axios = axios.create(config);

$axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (res) => {
    // if (res.data.rspCode !== "0000") {
    //   notification.error({
    //     // key: res.data.rspCode,
    //     message: res.data.rspMsg,
    //   });
    //   return Promise.reject(res.data.rspMsg);
    // }

    return res;
  },
  (error) => {
    // if (error?.response?.status === 401) {
    //   const url = `http://ops${domain}.ximalaya.com/pay-boss-admin-web/biz_financial/login.do?redirect_uri=${encodeURIComponent(
    //     window.location.href
    //   )}`;
    //   window.location.href = url;

    //   return Promise.reject(error);
    // }

    return Promise.reject(error);
  }
);

export default $axios;
