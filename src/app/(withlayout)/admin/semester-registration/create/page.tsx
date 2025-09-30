'use client';

import ACSemesterField from '@/components/forms/ACSemesterField';
import Form from '@/components/forms/Form';
import FormDatePicker from '@/components/forms/FormDatePicker';
import FormInput from '@/components/forms/FormInput';
import { TuToastify } from '@/lib/reactToastify';
import { useAddSemesterRegistrationsMutation } from '@/redux/api/semesterRegistrationApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SemesterRegistrationFormValues {
  startDate: string | Date;
  endDate: string | Date;
  academicSemesterId: string;
  minCredit: number | string;
  maxCredit: number | string;
}

const CreateSemesterRegistrationPage = () => {
  const [addSemesterRegistrations] = useAddSemesterRegistrationsMutation();

  const onSubmit = async (data: SemesterRegistrationFormValues) => {
    const formattedData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    TuToastify('Creating...', 'loading');
    try {
      const res = await addSemesterRegistrations(formattedData).unwrap();
      if (res?.id) {
        TuToastify('Semester registration successfully added', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Create Semester Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={onSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormDatePicker name='startDate' label='Start Date' />
              <FormDatePicker name='endDate' label='End Date' />
              <ACSemesterField name='academicSemesterId' label='Academic Semester' />
              <FormInput name='minCredit' label='Min Credit' type='number' />
              <FormInput name='maxCredit' label='Max Credit' type='number' />
            </div>
            <div className='mt-6 flex justify-end'>
              <Button type='submit' className='px-6'>
                Add
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSemesterRegistrationPage;
