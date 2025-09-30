'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import { TuToastify } from '@/lib/reactToastify';
import { useUpdateMarksMutation } from '@/redux/api/studentEnrollCourseMarkApi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UpdateMarksProps {
  searchParams: {
    examType: string;
    marks: string | number;
    academicSemesterId: string;
    studentId: string;
    courseId: string;
    offeredCourseSectionId: string;
  };
}

const UpdateMarksPage = ({ searchParams }: UpdateMarksProps) => {
  const { examType, marks, academicSemesterId, studentId, courseId, offeredCourseSectionId } =
    searchParams;

  const [updateMarks] = useUpdateMarksMutation();

  const onSubmit = async (values: { marks: string | number }) => {
    values.marks = Number(values.marks);
    try {
      const res = await updateMarks(values).unwrap();
      if (res) {
        TuToastify('Marks updated', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const defaultValues = {
    examType,
    marks,
    academicSemesterId,
    studentId,
    courseId,
    offeredCourseSectionId,
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Update Marks</h1>

      <Card className='shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-lg'>Exam Type: {examType}</CardTitle>
        </CardHeader>

        <CardContent>
          <Form defaultValues={defaultValues} submitHandler={onSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormInput name='marks' label='Marks' />
              <div className='flex items-end'>
                <Button type='submit' className='w-full'>
                  Update
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateMarksPage;
