import axios from 'axios';
import { useLoading } from './useLoading'; // 引入封装的 useLoading

// 创建自定义 axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com', // 你的 API 地址
  timeout: 10000, // 请求超时时间
});

// 获取 useLoading 的方法
const { showLoading, hideLoading } = useLoading();

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    showLoading(); // 请求开始时显示 loading
    return config;
  },
  (error) => {
    hideLoading(); // 请求失败时隐藏 loading
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    hideLoading(); // 请求成功时隐藏 loading
    return response;
  },
  (error) => {
    hideLoading(); // 请求失败时隐藏 loading
    return Promise.reject(error);
  }
);

export default instance;