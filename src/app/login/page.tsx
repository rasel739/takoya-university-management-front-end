import LoginForm from '@/components/forms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TUS | Login',
};

const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
