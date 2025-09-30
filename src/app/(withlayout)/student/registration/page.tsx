'use client';

import {
  useMyRegistrationQuery,
  useStartRegistrationMutation,
} from '@/redux/api/semesterRegistrationApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, Info } from 'lucide-react';

const StudentRegistrationPage = () => {
  const { data, isLoading } = useMyRegistrationQuery({});
  const [startRegistration] = useStartRegistrationMutation();
  const router = useRouter();

  const goToRegistrationHandler = async () => {
    if (!data?.studentSemesterRegistration) {
      try {
        await startRegistration({}).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
    router.push('/student/pre-registration');
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[200px]'>
        <Loader2 className='animate-spin w-6 h-6 text-primary' />
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
      {data?.semesterRegistration &&
      data?.semesterRegistration?.status === 'ONGOING' &&
      !data?.studentSemesterRegistration?.isConfirmed ? (
        <div className='flex justify-center'>
          <Button onClick={goToRegistrationHandler} className='px-6 py-3 text-lg font-semibold'>
            Go to Registration
          </Button>
        </div>
      ) : (
        <Alert className='border-yellow-300 bg-yellow-50'>
          <Info className='h-4 w-4 text-yellow-600' />
          <AlertTitle className='text-yellow-800'>Notice</AlertTitle>
          <AlertDescription className='text-yellow-700'>
            You are not allowed to register yet. Please stay tuned.
          </AlertDescription>
        </Alert>
      )}

      {(!data?.semesterRegistration || data?.studentSemesterRegistration?.isConfirmed) && (
        <Alert className='border-green-300 bg-green-50'>
          <CheckCircle className='h-4 w-4 text-green-600' />
          <AlertTitle className='text-green-800'>Registration Completed</AlertTitle>
          <AlertDescription className='text-green-700 flex items-center'>
            <span>Your registration has been completed successfully.</span>
            <Link
              href='/student/courses'
              className='ml-2 text-sm font-medium text-primary hover:underline'
            >
              View Your Courses
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StudentRegistrationPage;
