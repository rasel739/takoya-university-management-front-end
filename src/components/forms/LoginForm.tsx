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
      <div className='min-h-screen flex justify-center items-center gap-10'>
        <div>
          <Image src={loginImage} alt='Login-gif' width={500} />
        </div>
        <div>
          <h1>First Login your account</h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div style={{ margin: '15px 0' }}>
                <FormInput type='text' size='large' placeholder='ID' name='id' label='User Id' />
              </div>
              <div style={{ margin: '15px 0' }}>
                <FormInput
                  type='password'
                  size='large'
                  placeholder='Password'
                  name='password'
                  label='User Password'
                />
              </div>
              <div>
                <Button variant='outline'>Login</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
