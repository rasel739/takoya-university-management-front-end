import LoginForm from '@/components/forms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TU - Login',
  description: 'Takoya University Management System',
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
