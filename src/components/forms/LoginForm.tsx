'use client';
import loginImage from '@/assets/Login.gif';
import Image from 'next/image';
import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { toastifyMessage, TuToastify } from '@/lib/reactToastify';
import { Button } from '../ui/button';

type FormData = {
  id: string;
  password: string;
};
const LoginForm = () => {
  const router = useRouter();
  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        console.log('Login successful:', res);
        TuToastify(toastifyMessage.loginSuccess, 'success');
        router.push('/profile');
      }
    } catch (error) {
      TuToastify(toastifyMessage.loginFailed, 'error');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-bg'>
      <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center'>
        <div>
          <Image src={loginImage} alt='Login-gif' width={500} />
        </div>
        <div>
          <h1 className='mb-5'>First Login your account</h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div>
                <FormInput type='text' size='large' placeholder='ID' name='id' label='ID' />
              </div>
              <div className='my-4'>
                <FormInput
                  type='password'
                  size='large'
                  placeholder='Password'
                  name='password'
                  label='Password'
                />
              </div>
              <div>
                <Button
                  variant='ghost'
                  className='bg-slate-800 text-slate-200 w-full mx-w-sm hover:bg-slate-900 hover:text-white'
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
