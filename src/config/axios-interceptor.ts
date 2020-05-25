import axios from 'axios';
import { SERVER_API_URL, AUTH_TOKEN_KEY } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
//axios.defaults.withCredentials = true;
// axios.defaults.headers.common["xsrfcookiename"] = "aaaaa";
// axios.defaults.headers.common["xsrfheadername"] = "bbbb";

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
       config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = 'Basic em9uZTpteXBhc3N3b3Jk';
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    console.log(JSON.stringify(err));
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
