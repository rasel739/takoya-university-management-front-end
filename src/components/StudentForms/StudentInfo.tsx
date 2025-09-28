'use client';

import React from 'react';
import FormInput from '../forms/FormInput';
import FormSelectField from '../forms/FormSelectField';
import UploadImage from '../ui/UploadImage';
import { genderOptions } from '@/constants/global';
import ACDepartmentField from '../forms/ACDepartmentField';
import ACFacultyField from '../forms/ACFacultyField';
import ACSemesterField from '../forms/ACSemesterField';

const StudentInfo: React.FC = () => {
  return (
    <section className='border border-gray-200 rounded-md p-4 my-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <FormInput type='text' name='student.name.firstName' size='large' label='First Name' />

        <FormInput type='text' name='student.name.middleName' size='large' label='Middle Name' />

        <FormInput type='text' name='student.name.lastName' size='large' label='Last Name' />

        <FormInput type='password' name='password' size='large' label='Password' />

        <ACDepartmentField name='student.academicDepartment' label='Academic Department' />

        <ACFacultyField name='student.academicFaculty' label='Academic Faculty' />

        <ACSemesterField name='student.academicSemester' label='Academic Semester' />

        <FormSelectField
          size='large'
          name='student.gender'
          options={genderOptions}
          label='Gender'
          placeholder='Select'
        />

        <UploadImage name='file' />
      </div>
    </section>
  );
};

export default StudentInfo;
