'use client';

import FormInput from '@/components/forms/FormInput';
import { useAddDepartmentMutation } from '@/redux/api/departmentApi';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';
import Form from '@/components/forms/Form';

const CreateDepartmentPage = () => {
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  const onSubmit = async (data: { title: string }) => {
    TuToastify('Creating...', 'promise');
    try {
      await addDepartment(data);
      TuToastify('Department added successfully!', 'success');
    } catch (err: any) {
      TuToastify('Failed to create department', 'error');
    }
  };

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      {/* Page Title */}
      <h1 className='text-2xl font-semibold'>Create Department</h1>

      {/* Form */}
      <Form submitHandler={onSubmit}>
        <div className='flex flex-col gap-4'>
          <FormInput name='title' label='Title' />
        </div>

        <Button type='submit' className='w-32' disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </Form>
    </div>
  );
};

export default CreateDepartmentPage;
