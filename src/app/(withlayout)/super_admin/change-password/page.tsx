'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';

const ResetPassPage = () => {
  const onSubmit = async (data: { oldPassword: string; newPassword: string }) => {
    try {
      console.log(data);
      TuToastify('Password reset successfully!', 'success');
    } catch {
      TuToastify('Failed to reset password', 'error');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Reset Password</h2>
        <Form submitHandler={onSubmit}>
          <FormInput name='oldPassword' label='Old Password' type='password' />
          <FormInput name='newPassword' label='New Password' type='password' />
          <Button type='submit' className='w-full mt-4'>
            Change
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassPage;
