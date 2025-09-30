'use client';

import ACDepartmentField from '@/components/forms/ACDepartmentField';
import ACFacultyField from '@/components/forms/ACFacultyField';
import Form from '@/components/forms/Form';
import FormDatePicker from '@/components/forms/FormDatePicker';
import FormInput from '@/components/forms/FormInput';
import FormSelectField from '@/components/forms/FormSelectField';
import FormTextArea from '@/components/forms/FormTextArea';
import UploadImage from '@/components/ui/UploadImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { bloodGroupOptions, genderOptions } from '@/constants/global';
import { TuToastify } from '@/lib/reactToastify';
import { useAddFacultyWithFormDataMutation } from '@/redux/api/facultyApi';

type FacultyFormValues = {
  faculty: {
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    gender: string;
    academicFaculty: string;
    academicDepartment: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    designation: string;
    presentAddress: string;
    permanentAddress: string;
  };
  password: string;
  file?: File;
};

const CreateFacultyPage = () => {
  const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();

  const adminOnSubmit = async (values: FacultyFormValues) => {
    const { file, ...rest } = values as FacultyFormValues & { file?: File };
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(rest));

    TuToastify('Creating...', 'loading');
    try {
      await addFacultyWithFormData(formData).unwrap();
      TuToastify('Faculty created successfully!', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='flex justify-center items-center p-6 bg-gray-50 min-h-screen'>
      <Card className='w-full max-w-6xl shadow-md rounded-2xl'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold text-center'>Create Faculty</CardTitle>
        </CardHeader>
        <CardContent>
          <Form submitHandler={adminOnSubmit}>
            <div className='border rounded-lg p-6 mb-6'>
              <p className='text-lg font-medium mb-4'>Faculty Information</p>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
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
            <div className='border rounded-lg p-6 mb-6'>
              <p className='text-lg font-medium mb-4'>Basic Information</p>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                <FormTextArea name='faculty.presentAddress' label='Present Address' rows={4} />
                <FormTextArea name='faculty.permanentAddress' label='Permanent Address' rows={4} />
              </div>
            </div>

            <div className='flex justify-end'>
              <Button variant='default' type='submit' className='px-6'>
                Submit
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFacultyPage;
