'use client';

import React from 'react';
import FormInput from '../forms/FormInput';

const GuardianInfo: React.FC = () => {
  return (
    <section className='border border-gray-200 rounded-md p-4 my-3'>
      <h3 className='text-lg font-medium mb-4'>Guardian information</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <div>
          <FormInput name='student.guardian.fatherName' label='Father name' size='large' />
        </div>

        <div>
          <FormInput
            name='student.guardian.fatherOccupation'
            label='Father occupation'
            size='large'
          />
        </div>

        <div>
          <FormInput
            name='student.guardian.fatherContactNo'
            label='Father contact no.'
            size='large'
          />
        </div>

        <div>
          <FormInput name='student.guardian.motherName' label='Mother name' size='large' />
        </div>

        <div>
          <FormInput
            name='student.guardian.motherOccupation'
            label='Mother occupation'
            size='large'
          />
        </div>

        <div>
          <FormInput
            name='student.guardian.motherContactNo'
            label='Mother contact no.'
            size='large'
          />
        </div>

        <div className='xl:col-span-4 lg:col-span-3 sm:col-span-2'>
          <FormInput name='student.guardian.address' label='Address' size='large' />
        </div>
      </div>
    </section>
  );
};

export default GuardianInfo;
