import axios from 'axios';

axios.interceptors.request.use(
  config => {
    config.headers.authorization = localStorage.getItem('token');

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);