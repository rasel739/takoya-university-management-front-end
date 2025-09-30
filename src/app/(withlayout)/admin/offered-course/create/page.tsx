'use client';

import ACDepartmentField from '@/components/forms/ACDepartmentField';
import Form from '@/components/forms/Form';
import FormSelectField from '@/components/forms/FormSelectField';
import OfferedCoursesField from '@/components/forms/OfferedCoursesField';
import { TuToastify } from '@/lib/reactToastify';
import { useAddOfferedCourseMutation } from '@/redux/api/offeredCourseApi';
import { useSemesterRegistrationsQuery } from '@/redux/api/semesterRegistrationApi';
import { Button } from '@/components/ui/button';

type SelectOptions = {
  label?: string;
  value: string;
};

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data } = useSemesterRegistrationsQuery({
    limit: 10,
    page: 1,
  });

  const semesterRegistrations = data?.semesterRegistrations;
  const semesterRegistrationsOptions: SelectOptions[] =
    semesterRegistrations?.map((semester) => ({
      label: semester?.academicSemester?.title,
      value: semester?.id,
    })) ?? [];

  const onSubmit = async (values: Record<string, unknown>) => {
    TuToastify('Creating...', 'loading');
    try {
      const res = await addOfferedCourse(values).unwrap();
      if (res?.id) {
        TuToastify('Offered Course created successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
        Create Offered Course
      </h1>

      <Form submitHandler={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <FormSelectField
            options={semesterRegistrationsOptions as []}
            name='semesterRegistrationId'
            label='Semester registration'
          />

          <OfferedCoursesField name='courseIds' label='Courses' />

          <ACDepartmentField name='academicDepartmentId' label='Academic department' />
        </div>
        <div className='mt-6'>
          <Button type='submit' className='px-6'>
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOfferedCoursePage;
