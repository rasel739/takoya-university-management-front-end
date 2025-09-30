'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormSelectField, { SelectOptions } from '@/components/forms/FormSelectField';
import { TuToastify } from '@/lib/reactToastify';
import { useBuildingsQuery } from '@/redux/api/buildingApi';
import { useAddRoomMutation } from '@/redux/api/roomApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateRoomPage = () => {
  const [addRoom] = useAddRoomMutation();
  const { data } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });

  const buildings = data?.buildings;
  const buildingOptions: SelectOptions[] =
    buildings?.map((building) => ({
      label: building?.title ?? '',
      value: building?.id ?? '',
    })) ?? [];

  const onSubmit = async (data: Record<string, unknown>) => {
    TuToastify('Creating...', 'loading');
    try {
      const res = await addRoom(data).unwrap();
      if (res?.id) {
        TuToastify('Room created successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Create Room</CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={onSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormInput name='roomNumber' label='Room No.' />
              <FormInput name='floor' label='Floor' />
              <FormSelectField
                name='buildingId'
                options={buildingOptions}
                label='Building'
                placeholder='Select a building'
              />
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

export default CreateRoomPage;
