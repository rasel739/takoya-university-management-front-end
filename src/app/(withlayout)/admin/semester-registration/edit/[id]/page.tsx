'use client';

import ACSemesterField from '@/components/forms/ACSemesterField';
import Form from '@/components/forms/Form';
import FormDatePicker from '@/components/forms/FormDatePicker';
import FormInput from '@/components/forms/FormInput';
import FormSelectField, { SelectOptions } from '@/components/forms/FormSelectField';
import { semesterRegistrationStatus } from '@/constants/global';
import { TuToastify } from '@/lib/reactToastify';
import {
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationsMutation,
} from '@/redux/api/semesterRegistrationApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import { Params } from 'next/dist/server/request/params';

interface SemesterRegistrationFormValues {
  startDate: string | Date;
  endDate: string | Date;
  academicSemesterId: string;
  minCredit: number | string;
  maxCredit: number | string;
  status: string;
}

const EditSemesterRegistration = ({ params }: { params: Params }) => {
  const { id } = params;
  const { data } = useSemesterRegistrationQuery(id);
  const [updateSemesterRegistration] = useUpdateSemesterRegistrationsMutation();

  const updateOnSubmit = async (values: SemesterRegistrationFormValues) => {
    const tempObject = {
      ...values,
      startDate: dayjs(values.startDate).toISOString(),
      endDate: dayjs(values.endDate).toISOString(),
      minCredit: Number(values.minCredit),
      maxCredit: Number(values.maxCredit),
    };

    TuToastify('Updating...', 'loading');
    try {
      const res = await updateSemesterRegistration({
        id,
        body: tempObject,
      }).unwrap();
      if (res?.id) {
        TuToastify('Updated Semester registration successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  const statusOptions: SelectOptions[] =
    semesterRegistrationStatus?.map((status) => {
      let disabled = false;
      if (data?.status === 'UPCOMING' && status === 'ENDED') disabled = true;
      if (data?.status === 'ONGOING' && status === 'UPCOMING') disabled = true;
      if (data?.status === 'ENDED' && (status === 'UPCOMING' || status === 'ONGOING'))
        disabled = true;

      return { label: status, value: status, disabled };
    }) ?? [];

  const defaultValues: SemesterRegistrationFormValues = {
    startDate: data?.startDate ?? '',
    endDate: data?.endDate ?? '',
    academicSemesterId: data?.academicSemester?.id ?? '',
    minCredit: data?.minCredit ?? '',
    maxCredit: data?.maxCredit ?? '',
    status: data?.status ?? '',
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Edit Semester Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={updateOnSubmit} defaultValues={defaultValues}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormDatePicker name='startDate' label='Start Date' />
              <FormDatePicker name='endDate' label='End Date' />
              <ACSemesterField name='academicSemesterId' label='Academic Semester' />
              <FormInput type='number' name='minCredit' label='Min Credit' />
              <FormInput type='number' name='maxCredit' label='Max Credit' />
              <FormSelectField options={statusOptions} name='status' label='Status' />
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

export default EditSemesterRegistration;
