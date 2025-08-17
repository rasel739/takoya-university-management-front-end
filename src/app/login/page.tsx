'use client';
import Starfield from 'react-starfield';
import { Button, Col, Row } from 'antd';
import loginImage from '@/assets/Login.gif';
import Image from 'next/image';
import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { SubmitHandler } from 'react-hook-form';

type FormData = {
  id: string;
  password: string;
};
const Login = () => {
  const onSubmit: SubmitHandler<FormData> = (data) => {
    try {
      console.log('Login data:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor='white'
      />
      <Row style={{ minHeight: '100vh' }} justify='center' align='middle'>
        <Col sm={12} md={16} lg={10}>
          <Image src={loginImage} alt='Login-gif' width={500} />
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h1>First Login your account</h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div>
                <FormInput type='text' size='large' placeholder='ID' name='id' label='User Id' />
              </div>
              <div>
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
