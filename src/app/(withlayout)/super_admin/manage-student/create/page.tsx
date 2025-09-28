'use client';

import StepperForm from '@/components/StepperForm/StepperForm';
import GuardianInfo from '@/components/StudentForms/GuardianInfo';
import LocalGuardianInfo from '@/components/StudentForms/LocalGuardianInfo';
import StudentBasicInfo from '@/components/StudentForms/StudentBasicInfo';
import StudentInfo from '@/components/StudentForms/StudentInfo';
import { useAddStudentWithFormDataMutation } from '@/redux/api/studentApi';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';

const CreateStudentPage = () => {
  const [addStudentWithFormData] = useAddStudentWithFormDataMutation();
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: 'Student Information', content: <StudentInfo /> },
    { title: 'Basic Information', content: <StudentBasicInfo /> },
    { title: 'Guardian Information', content: <GuardianInfo /> },
    { title: 'Local Guardian Information', content: <LocalGuardianInfo /> },
  ];

  const handleStudentSubmit = async (values: any) => {
    setLoading(true);
    const { file, ...rest } = values;
    const formData = new FormData();
    if (file) formData.append('file', file as Blob);
    formData.append('data', JSON.stringify(rest));

    try {
      const res: any = await addStudentWithFormData(formData);
      if (res) {
        TuToastify('Student created successfully!', 'success');
      }
    } catch (err: any) {
      TuToastify('Failed to create student', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen p-6 space-y-6 bg-gray-50'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-800'>Create Student</h1>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} size='sm'>
          Scroll to top
        </Button>
      </div>

      {/* Stepper Form */}
      <div className='bg-white shadow rounded-lg p-6'>
        <StepperForm
          persistKey='student-create-form'
          submitHandler={handleStudentSubmit}
          steps={steps}
        />
      </div>

      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
          <div className='p-4 bg-white rounded shadow-lg animate-pulse'>Creating student...</div>
        </div>
      )}
    </div>
  );
};

export default CreateStudentPage;
