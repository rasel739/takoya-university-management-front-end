'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormMultiSelectField from '@/components/forms/FormMultiSelectField';
import { SelectOptions } from '@/components/forms/FormSelectField';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';
import { useAddCourseMutation, useCoursesQuery } from '@/redux/api/courseApi';

type CourseFormValues = {
  title: string;
  code: string;
  credits: string | number;
  coursePreRequisites: string[];
};

const CreateCoursePage = () => {
  const [addCourse] = useAddCourseMutation();
  const { data } = useCoursesQuery({ limit: 10, page: 1 });

  const courses = data?.courses;
  const coursesOptions = courses?.map((course) => ({
    label: course?.title,
    value: course?.id,
  }));

  const onSubmit = async (formData: CourseFormValues) => {
    const payload = {
      ...formData,
      credits: Number(formData.credits),
      coursePreRequisites: formData.coursePreRequisites?.map((id) => ({
        courseId: id,
      })),
    };

    TuToastify('Creating...', 'loading');
    try {
      const res = await addCourse(payload).unwrap();
      if (res?.id) {
        TuToastify('Course created successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Create Course</h1>

      <Form<CourseFormValues> submitHandler={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormInput name='title' label='Title' placeholder='Enter course title' />
          <FormInput name='code' label='Course Code' placeholder='Enter course code' />
          <FormInput name='credits' label='Course Credits' placeholder='Enter credits' />
          <FormMultiSelectField
            options={coursesOptions as SelectOptions[]}
            name='coursePreRequisites'
            label='Pre Requisite Courses'
          />
        </div>

        <div className='mt-6 flex justify-end'>
          <Button variant='default' type='submit' className='px-6'>
            Add Course
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCoursePage;
