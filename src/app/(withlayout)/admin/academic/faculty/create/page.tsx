'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { TuToastify } from '@/lib/reactToastify';
import { useAddAcademicFacultyMutation } from '@/redux/api/academic/facultyApi';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type FacultyFormValues = {
  title: string;
};

const CreateACFacultyPage = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: FacultyFormValues) => {
    TuToastify('Creating...', 'loading');
    try {
      const res = await addAcademicFaculty(data).unwrap();
      if (res) {
        TuToastify('Academic Faculty Created Successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 p-6'>
      <Card className='w-full max-w-lg shadow-lg border rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center'>
            Create Academic Faculty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form<FacultyFormValues> submitHandler={onSubmit}>
            <div className='grid grid-cols-1 gap-6'>
              <FormInput name='title' label='Title' placeholder='Enter faculty title' />
            </div>

            <div className='flex justify-end mt-6'>
              <Button type='submit' className='px-6'>
                Add Faculty
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateACFacultyPage;
