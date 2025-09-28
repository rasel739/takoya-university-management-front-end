'use client';

import React from 'react';
import FormInput from '../forms/FormInput';

const LocalGuardianInfo: React.FC = () => {
  return (
    <section className='border border-gray-200 rounded-md p-4 my-3'>
      <h3 className='text-lg font-medium mb-4'>Local Guardian Information</h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div>
          <FormInput name='student.localGuardian.name' label='Local guardian name' size='large' />
        </div>

        <div>
          <FormInput
            name='student.localGuardian.occupation'
            label='Local guardian occupation'
            size='large'
          />
        </div>

        <div>
          <FormInput
            name='student.localGuardian.contactNo'
            label='Local guardian contact no.'
            size='large'
          />
        </div>

        <div>
          <FormInput
            name='student.localGuardian.address'
            label='Local guardian address'
            size='large'
          />
        </div>
      </div>
    </section>
  );
};

export default LocalGuardianInfo;
