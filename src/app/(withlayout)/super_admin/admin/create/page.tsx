'use client';

import Form from '@/components/forms/Form';
import FormDatePicker from '@/components/forms/FormDatePicker';
import FormInput from '@/components/forms/FormInput';
import FormSelectField from '@/components/forms/FormSelectField';
import FormTextArea from '@/components/forms/FormTextArea';
import UploadImage from '@/components/ui/UploadImage';
import { bloodGroupOptions, genderOptions } from '@/constants/global';
import { useAddAdminWithFormDataMutation } from '@/redux/api/adminApi';
import { useDepartmentsQuery } from '@/redux/api/departmentApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IDepartment } from '@/types';
import { FieldValues } from 'react-hook-form';
import { TuToastify } from '@/lib/reactToastify';

export interface CreateAdminFormValues extends FieldValues {
  password: string;
  file: File;
  admin: {
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    email: string;
    contactNo?: string;
    emergencyContactNo?: string;
    designation: string;
    dateOfBirth: string;
    bloodGroup?: string;
    gender?: string;
    managementDepartment?: string;
    presentAddress?: string;
    permanentAddress?: string;
  };
}

const CreateAdminPage = () => {
  const { data } = useDepartmentsQuery({ limit: 100, page: 1 });
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
  const departments: IDepartment[] = Array.isArray(data?.departments) ? data!.departments : [];

  const departmentOptions = departments.map((dept) => ({
    label: dept.title,
    value: dept.id,
  }));

  const onSubmit = async (values: CreateAdminFormValues) => {
    const { file, ...rest } = values;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(rest));

    try {
      await addAdminWithFormData(formData);
      alert('Admin created successfully!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error?.message : 'Admin created Field!';

      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Create Admin</h1>

      <Form submitHandler={onSubmit}>
        {/* Admin Information */}
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Admin Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <FormInput name='admin.name.firstName' label='First Name' />
              <FormInput name='admin.name.middleName' label='Middle Name' />
              <FormInput name='admin.name.lastName' label='Last Name' />
              <FormInput type='password' name='password' label='Password' />
              <FormSelectField
                name='admin.gender'
                label='Gender'
                options={genderOptions}
                placeholder='Select'
              />
              <FormSelectField
                name='admin.managementDepartment'
                label='Department'
                options={departmentOptions}
                placeholder='Select'
              />
              <UploadImage name='file' />
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <FormInput name='admin.email' label='Email Address' type='email' />
              <FormInput name='admin.contactNo' label='Contact No.' />
              <FormInput name='admin.emergencyContactNo' label='Emergency Contact No.' />
              <FormDatePicker name='admin.dateOfBirth' label='Date of Birth' />
              <FormSelectField
                name='admin.bloodGroup'
                label='Blood Group'
                options={bloodGroupOptions}
                placeholder='Select'
              />
              <FormInput name='admin.designation' label='Designation' />
              <FormTextArea
                name='admin.presentAddress'
                label='Present Address'
                rows={3}
                className='md:col-span-2'
              />
              <FormTextArea
                name='admin.permanentAddress'
                label='Permanent Address'
                rows={3}
                className='md:col-span-2'
              />
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button type='submit' className='px-6 py-2'>
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateAdminPage;
