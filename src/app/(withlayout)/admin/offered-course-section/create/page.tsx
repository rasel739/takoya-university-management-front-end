'use client';

import { useState } from 'react';
import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormSelectField, { SelectOptions } from '@/components/forms/FormSelectField';
import ACDepartmentIDField from '@/components/forms/ACDepartmentIDField';
import SemesterRegistrationField from '@/components/forms/SemesterRegistrationField';
import FormDynamicFields from '@/components/ui/FormDynamicFields';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';
import { useOfferedCoursesQuery } from '@/redux/api/offeredCourseApi';
import { useAddOfferedCourseSectionMutation } from '@/redux/api/offeredCourseSectionApi';

const CreateOfferedCourseSectionPage = () => {
  const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();
  const [acDepartmentId, setAcDepartmentId] = useState<string>();
  const [semesterRegistrationId, setSemesterRegistrationId] = useState<string>();

  const query: Record<string, unknown> = {};
  if (acDepartmentId) query['academicDepartmentId'] = acDepartmentId;
  if (semesterRegistrationId) query['semesterRegistrationId'] = semesterRegistrationId;

  const { data } = useOfferedCoursesQuery({
    limit: 10,
    page: 1,
    ...query,
  });

  const offeredCourses = data?.offeredCourses;
  const offeredCoursesOptions: SelectOptions[] =
    offeredCourses?.map((offCourse) => ({
      label: offCourse?.course?.title ?? 'Untitled Course',
      value: offCourse?.id as string,
    })) ?? [];

  const onSubmit = async (formData: {
    title: string;
    maxCapacity: string | number;
    offeredCourseId: string;
  }) => {
    const payload = {
      ...formData,
      maxCapacity: Number(formData.maxCapacity),
    };

    TuToastify('Creating...', 'loading');
    try {
      const res = await addOfferedCourseSection(payload).unwrap();
      if (res?.id) {
        TuToastify('Offered Course Section created successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold'>Create Offered Course Section</h1>
      <Form submitHandler={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='space-y-4'>
            <SemesterRegistrationField
              name='semesterRegistration'
              label='Semester Registration'
              onChange={(el) => setSemesterRegistrationId(el)}
            />

            <ACDepartmentIDField
              name='academicDepartment'
              label='Academic Department'
              onChange={(el) => setAcDepartmentId(el)}
            />

            <FormSelectField
              options={offeredCoursesOptions}
              name='offeredCourseId'
              label='Offered Course'
            />

            <FormInput label='Section' name='title' />

            <FormInput label='Max Capacity' name='maxCapacity' />

            <Button type='submit' className='w-full'>
              Add
            </Button>
          </div>

          <div className='md:col-span-2'>
            <FormDynamicFields />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateOfferedCourseSectionPage;
