import { toast } from 'react-toastify';

type ToastifyType = 'success' | 'error' | 'info' | 'warning' | 'dark' | 'loading' | 'promise';

export const toastifyMessage = {
  loginSuccess: 'Login successful!',
  loginFailed: 'Login failed. Please try again.',
  logoutSuccess: 'Logout successful!',
  logoutFailed: 'Logout failed. Please try again.',
};

export const TuToastify = (message: string, type: ToastifyType) => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'info':
      return toast.info(message);
    case 'warning':
      return toast.warn(message);
    case 'dark':
      return toast.dark(message);
    case 'loading':
      return toast.loading(message);
    case 'promise':
      return toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
        pending: 'Loading...',
        success: 'Loaded successfully!',
        error: 'Failed to load!',
      });

    default:
      return toast(message);
  }
};
