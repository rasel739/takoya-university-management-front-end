import { authKey } from '@/constants/storageKey';
import { instance as axiosInstance } from '@/helpers/axios/axiosinstance';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { decodedToken } from '@/utils/jwt';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getLocalStorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return '';
  }
};

export const isLoggedIn = () => {
  const authToken = getLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
