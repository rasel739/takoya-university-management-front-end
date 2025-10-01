'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TuToastify } from '@/lib/reactToastify';
import { useDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/departmentApi';

type IDProps = {
  params: { id: string };
};
const EditDepartmentPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useDepartmentQuery(id);
  const [updateDepartment] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    TuToastify('Updating.....', 'loading');
    try {
      await updateDepartment({ id, body: values }).unwrap();
      TuToastify('Department updated successfully', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const defaultValues = {
    title: data?.title || '',
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 p-6'>
      <Card className='w-full max-w-lg shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center'>Update Department</CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className='grid grid-cols-1 gap-4'>
              <FormInput name='title' label='Title' />
            </div>
            <div className='mt-6 flex justify-end'>
              <Button type='submit' className='px-6'>
                Update
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDepartmentPage;
