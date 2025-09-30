'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TuToastify } from '@/lib/reactToastify';
import { useAddDepartmentMutation } from '@/redux/api/departmentApi';

const CreateDepartmentPage = () => {
  const [addDepartment] = useAddDepartmentMutation();

  const onSubmit = async (data: { title: string }) => {
    TuToastify('Creating.....', 'loading');
    try {
      await addDepartment(data).unwrap();
      TuToastify('Department added successfully', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 p-6'>
      <Card className='w-full max-w-lg shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center'>Create Department</CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={onSubmit}>
            <div className='grid grid-cols-1 gap-4'>
              <FormInput name='title' label='Title' />
            </div>
            <div className='mt-6 flex justify-end'>
              <Button variant='default' type='submit' className='px-6'>
                Add
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDepartmentPage;
