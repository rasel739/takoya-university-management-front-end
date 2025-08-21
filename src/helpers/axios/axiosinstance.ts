import { authKey } from '@/constants/storageKey';
import { ResponseErrorType, ResponseSuccessType } from '@/types';
import { getLocalStorage } from '@/utils/local-storage';
import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000; // 60 seconds

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
instance.interceptors.response.use( function onFulfilled(response) {
    const responseData: ResponseSuccessType = {
      data: response?.data?.data ?? response?.data,
      meta: response?.data?.meta ?? null,
    };
    return responseData;
  },
  function onRejected(error) {
    const errorResponseObject: ResponseErrorType = {
      statusCode: error?.response?.data?.status || 500,
      message: error?.response?.data?.message || 'An error occurred',
      errorMessage: error?.response?.data?.message,
    };

    return Promise.reject(errorResponseObject);
  }
);

export { instance };
