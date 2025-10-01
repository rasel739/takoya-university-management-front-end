'use client';

import Title from '@/app/components/common/Title';

import FormInput from '@/components/forms/FormInput';

import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import { useDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/departmentApi';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';
import Form from '@/components/forms/Form';

interface PageProps {
  params: {
    id: string;
  };
}

const EditDepartmentPage = ({ params }: PageProps) => {
  const { id } = params;

  const { data } = useDepartmentQuery(id);
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    TuToastify('Updating...', 'loading');
    try {
      await updateDepartment({ id, body: values });
      TuToastify('Department updated successfully!', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  const defaultValues = {
    title: data?.title || '',
  };

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      {/* Page Title */}
      <Title title='Update Department' />

      {/* Action Bar (optional) */}
      <ActionBar title='Edit Department' link={actionBarObj.department.link} />

      {/* Form */}
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className='flex flex-col gap-4'>
          <FormInput name='title' label='Title' />
        </div>

        <Button type='submit' className='w-32' disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </Form>
    </div>
  );
};

export default EditDepartmentPage;
