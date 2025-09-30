'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormSelectField, { SelectOptions } from '@/components/forms/FormSelectField';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';

import { useAddAcademicDepartmentMutation } from '@/redux/api/academic/departmentApi';
import { useAcademicFacultiesQuery } from '@/redux/api/academic/facultyApi';

const CreateACDepartmentPage = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const { data } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });

  const academicFaculties = data?.academicFaculties;
  const acFacultiesOptions = academicFaculties?.map((faculty) => ({
    label: faculty?.title,
    value: faculty?.id,
  }));

  const onSubmit = async (formData: Record<string, string>) => {
    TuToastify('Creating.....', 'loading');
    try {
      const res = await addAcademicDepartment(formData);
      if (!!res) {
        TuToastify('AC Department added successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-xl font-semibold mb-6'>Create Academic Department</h1>
      <Form submitHandler={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormInput name='title' label='Academic Department Title' />

          <FormSelectField
            size='large'
            name='academicFacultyId'
            options={acFacultiesOptions as SelectOptions[]}
            label='Academic Faculty'
            placeholder='Select'
          />
        </div>

        <div className='mt-6'>
          <Button variant='default' type='submit'>
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateACDepartmentPage;
