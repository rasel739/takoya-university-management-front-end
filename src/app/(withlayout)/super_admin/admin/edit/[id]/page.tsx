'use client';

import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormSelectField from '@/components/forms/FormSelectField';
import FormTextArea from '@/components/forms/FormTextArea';
import FormDatePicker from '@/components/forms/FormDatePicker';
import { bloodGroupOptions, genderOptions } from '@/constants/global';
import { useAdminQuery, useUpdateAdminMutation } from '@/redux/api/adminApi';
import { useDepartmentsQuery } from '@/redux/api/departmentApi';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';

type Params = { id: string };

type IDepartment = {
  id: string;
  title: string;
};

export type AdminFormValues = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  designation?: string;
  presentAddress?: string;
  permanentAddress?: string;
  gender?: string;
  bloodGroup?: string;
  managementDepartment?: string | null;
};

type Props = {
  params: Params;
};

const EditAdminPage = ({ params }: Props) => {
  const { data: adminData } = useAdminQuery(params?.id);
  const [updateAdmin] = useUpdateAdminMutation();

  const { data } = useDepartmentsQuery({ limit: 100, page: 1 });
  const departments: IDepartment[] = Array.isArray(data?.departments) ? data!.departments : [];

  const departmentOptions = departments.map((dept) => ({
    label: dept.title,
    value: dept.id,
  }));

  const defaultValues = {
    name: {
      firstName: adminData?.name?.firstName || '',
      middleName: adminData?.name?.middleName || '',
      lastName: adminData?.name?.lastName || '',
    },
    dateOfBirth: adminData?.dateOfBirth || '',
    email: adminData?.email || '',
    contactNo: adminData?.contactNo || '',
    emergencyContactNo: adminData?.emergencyContactNo || '',
    designation: adminData?.designation || '',
    presentAddress: adminData?.presentAddress || '',
    permanentAddress: adminData?.permanentAddress || '',
    gender: adminData?.gender || '',
    bloodGroup: adminData?.bloodGroup || '',
    managementDepartment: adminData?.managementDepartment?.id || '',
  };

  const onSubmit = async (values: AdminFormValues) => {
    try {
      await updateAdmin({ id: params?.id, body: values }).unwrap();
      TuToastify('Admin Successfully Updated!', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold my-4'>Edit Admin</h1>

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        {/* Admin Info */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <h2 className='text-xl font-medium mb-4'>Admin Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <FormInput name='name.firstName' label='First Name' />
            <FormInput name='name.middleName' label='Middle Name' />
            <FormInput name='name.lastName' label='Last Name' />
            <FormSelectField
              name='gender'
              label='Gender'
              options={genderOptions}
              placeholder='Select'
            />
            <FormSelectField
              name='managementDepartment'
              label='Department'
              options={departmentOptions}
              placeholder='Select'
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <h2 className='text-xl font-medium mb-4'>Basic Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <FormInput name='email' label='Email Address' />
            <FormInput name='contactNo' label='Contact No.' />
            <FormInput name='emergencyContactNo' label='Emergency Contact No.' />
            <FormDatePicker name='dateOfBirth' label='Date of Birth' />
            <FormSelectField
              name='bloodGroup'
              label='Blood Group'
              options={bloodGroupOptions}
              placeholder='Select'
            />
            <FormInput name='designation' label='Designation' />
            <FormTextArea
              name='presentAddress'
              label='Present Address'
              rows={4}
              className='md:col-span-3'
            />
            <FormTextArea
              name='permanentAddress'
              label='Permanent Address'
              rows={4}
              className='md:col-span-3'
            />
          </div>
        </div>

        <Button type='submit' className='w-full md:w-auto'>
          Update Admin
        </Button>
      </Form>
    </div>
  );
};

export default EditAdminPage;
