'use client';

import ACDepartmentField from '@/components/forms/ACDepartmentField';
import ACFacultyField from '@/components/forms/ACFacultyField';
import Form from '@/components/forms/Form';
import FormDatePicker from '@/components/forms/FormDatePicker';
import FormInput from '@/components/forms/FormInput';
import FormSelectField from '@/components/forms/FormSelectField';
import FormTextArea from '@/components/forms/FormTextArea';
import UploadImage from '@/components/ui/UploadImage';
import { bloodGroupOptions, genderOptions } from '@/constants/global';
import { useAddFacultyWithFormDataMutation } from '@/redux/api/facultyApi';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';

type FormValues = Record<string, string | number | boolean | File | undefined>;

const CreateFacultyPage = () => {
  const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();
  const handleSubmit = async (values: FormValues) => {
    const obj = { ...values };
    const file = obj['file'];
    delete obj['file'];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('data', data);

    TuToastify('Creating faculty...', 'loading');

    try {
      const res = await addFacultyWithFormData(formData);
      if (res) {
        TuToastify('Faculty created successfully!', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='min-h-screen p-6 space-y-6 bg-gray-50'>
      <h1 className='text-2xl font-semibold'>Create Faculty</h1>

      <Form submitHandler={handleSubmit}>
        {/* Faculty Information */}
        <div className='p-6 bg-white rounded-lg shadow space-y-4'>
          <h2 className='text-lg font-medium'>Faculty Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <FormInput name='faculty.name.firstName' label='First Name' />
            <FormInput name='faculty.name.middleName' label='Middle Name' />
            <FormInput name='faculty.name.lastName' label='Last Name' />
            <FormInput type='password' name='password' label='Password' />
            <FormSelectField name='faculty.gender' label='Gender' options={genderOptions} />
            <ACFacultyField name='faculty.academicFaculty' label='Academic Faculty' />
            <ACDepartmentField name='faculty.academicDepartment' label='Academic Department' />
            <UploadImage name='file' />
          </div>
        </div>

        {/* Basic Information */}
        <div className='p-6 bg-white rounded-lg shadow space-y-4'>
          <h2 className='text-lg font-medium'>Basic Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <FormInput type='email' name='faculty.email' label='Email Address' />
            <FormInput name='faculty.contactNo' label='Contact No.' />
            <FormInput name='faculty.emergencyContactNo' label='Emergency Contact No.' />
            <FormDatePicker name='faculty.dateOfBirth' label='Date of Birth' />
            <FormSelectField
              name='faculty.bloodGroup'
              label='Blood Group'
              options={bloodGroupOptions}
            />
            <FormInput name='faculty.designation' label='Designation' />
            <FormTextArea name='faculty.presentAddress' label='Present Address' rows={4} />
            <FormTextArea name='faculty.permanentAddress' label='Permanent Address' rows={4} />
          </div>
        </div>

        <Button type='submit' className='w-full md:w-auto'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateFacultyPage;
