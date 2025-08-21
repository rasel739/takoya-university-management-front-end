import { authKey } from '@/constants/storageKey';
import { decodedToken } from '@/utils/jwt';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';

export const setUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getLocalStorage(authKey);
  if (authToken) {
    const decodeData = decodedToken(authToken);
    return decodeData;
  } else {
    return '';
  }
};
export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const isLoggedIn = () => {
  const authToken = getLocalStorage(authKey);
  return !!authToken;
};
