'use client';

import React from 'react';
import FormInput from '../forms/FormInput';
import FormDatePicker from '../forms/FormDatePicker';
import FormSelectField from '../forms/FormSelectField';
import FormTextArea from '../forms/FormTextArea';
import { bloodGroupOptions } from '@/constants/global';

const StudentBasicInfo: React.FC = () => {
  return (
    <section className='border border-gray-200 rounded-md p-4 my-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <FormInput type='email' name='student.email' label='Email address' size='large' />

        <FormInput name='student.contactNo' label='Contact no.' size='large' />

        <FormInput name='student.emergencyContactNo' label='Emergency contact no.' size='large' />

        <div className='sm:col-span-1 lg:col-span-2'>
          <FormDatePicker name='student.dateOfBirth' label='Date of birth' size='large' />
        </div>

        <FormSelectField
          name='student.bloodGroup'
          label='Blood group'
          options={bloodGroupOptions}
          size='large'
        />

        <div className='sm:col-span-1 lg:col-span-2'>
          <FormTextArea name='student.presentAddress' label='Present address' rows={4} />
        </div>

        <div className='sm:col-span-1 lg:col-span-2'>
          <FormTextArea name='student.permanentAddress' label='Permanent address' rows={4} />
        </div>
      </div>
    </section>
  );
};

export default StudentBasicInfo;
