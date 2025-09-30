'use client';

import FormInput from '@/components/forms/FormInput';
import { useAddBuildingMutation } from '@/redux/api/buildingApi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TuToastify } from '@/lib/reactToastify';
import Form from '@/components/forms/Form';

const CreateBuildPage = () => {
  const [addBuilding] = useAddBuildingMutation();

  const onSubmit = async (data: { title: string }) => {
    TuToastify('Creating...', 'loading');
    try {
      const res = await addBuilding(data).unwrap();
      if (res?.id) {
        TuToastify('Building added successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <Card className='p-6 shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Create Building</h1>

        <Form submitHandler={onSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <FormInput name='title' label='Title' />
          </div>

          <div className='flex justify-end'>
            <Button type='submit' className='px-6'>
              Add
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateBuildPage;
