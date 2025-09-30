'use client';

import StepperForm from '@/components/StepperForm/StepperForm';
import GuardianInfo from '@/components/StudentForms/GuardianInfo';
import LocalGuardianInfo from '@/components/StudentForms/LocalGuardianInfo';
import StudentBasicInfo from '@/components/StudentForms/StudentBasicInfo';
import StudentInfo from '@/components/StudentForms/StudentInfo';
import { TuToastify } from '@/lib/reactToastify';
import { useAddStudentWithFormDataMutation } from '@/redux/api/studentApi';

interface StudentFormValues {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNo: string;
  gender: string;
  guardianName?: string;
  guardianPhone?: string;
  localGuardianName?: string;
  localGuardianPhone?: string;
  file: File;
}

const CreateStudentPage = () => {
  const [addStudentWithFormData] = useAddStudentWithFormDataMutation();

  const steps = [
    {
      title: 'Student Information',
      content: <StudentInfo />,
    },
    {
      title: 'Basic Information',
      content: <StudentBasicInfo />,
    },
    {
      title: 'Guardian Information',
      content: <GuardianInfo />,
    },
    {
      title: 'Local Guardian Information',
      content: <LocalGuardianInfo />,
    },
  ];

  const handleStudentSubmit = async (values: StudentFormValues) => {
    const { file, ...rest } = values;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(rest));

    TuToastify('Creating...', 'loading');
    try {
      const res = await addStudentWithFormData(formData).unwrap();
      if (res) {
        TuToastify('Student created successfully!', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
        Create Student
      </h1>

      <StepperForm
        persistKey='student-create-form'
        submitHandler={handleStudentSubmit}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
