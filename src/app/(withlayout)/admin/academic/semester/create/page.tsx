'use client';

import { useAddAcademicSemesterMutation } from '@/redux/api/academic/semesterApi';
import { monthOptions } from '@/constants/global';

import FormYearPicker from '@/components/forms/FormYearPicker';
import FormSelectField from '@/components/forms/FormSelectField';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TuToastify } from '@/lib/reactToastify';
import Form from '@/components/forms/Form';

const semesterOptions = [
  { label: 'Autumn', value: 'Autumn' },
  { label: 'Summer', value: 'Summer' },
  { label: 'Fall', value: 'Fall' },
];

type AcademicSemesterFormValues = {
  title: 'Autumn' | 'Summer' | 'Fall';
  startMonth: string;
  endMonth: string;
  year: string | number;
  code?: string;
};

const CreateACSemesterPage = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: AcademicSemesterFormValues) => {
    if (data?.title === 'Autumn') data['code'] = '01';
    else if (data?.title === 'Summer') data['code'] = '02';
    else data['code'] = '03';

    data.year = Number(data?.year);

    TuToastify('Creating...', 'loading');

    try {
      const res = await addAcademicSemester(data).unwrap();
      if (res) {
        TuToastify('Academic Semester Created successfully ✅', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';

      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 p-6'>
      <Card className='w-full max-w-2xl shadow-lg border rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center'>
            Create Academic Semester
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={onSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormSelectField
                size='large'
                name='title'
                options={semesterOptions}
                label='Title'
                placeholder='Select'
              />
              <FormSelectField
                size='large'
                name='startMonth'
                options={monthOptions}
                label='Start Month'
                placeholder='Select'
              />
              <FormSelectField
                size='large'
                name='endMonth'
                options={monthOptions}
                label='End Month'
                placeholder='Select'
              />
              <FormYearPicker name='year' label='Year' picker='year' />
            </div>

            <div className='flex justify-end mt-6'>
              <Button type='submit' className='px-6'>
                Add Semester
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateACSemesterPage;
