'use client';
import { Button, Col, Row } from 'antd';
import loginImage from '@/assets/Login.gif';
import Image from 'next/image';
import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { setUserInfo } from '@/service/auth.service';
import { useRouter } from 'next/navigation';

type FormData = {
  id: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        router.push('/profile');
      }

      setUserInfo({ accessToken: res?.accessToken });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-bg'>
      <Row style={{ minHeight: '100vh' }} justify='center' align='middle'>
        <Col sm={12} md={16} lg={10}>
          <Image src={loginImage} alt='Login-gif' width={500} />
        </Col>
        <Col sm={12} md={8} lg={8}>
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
                <Button type='primary' htmlType='submit' size='large'>
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
