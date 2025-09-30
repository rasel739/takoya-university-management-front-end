import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <div className='max-w-3xl w-full space-y-6'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>🎓 Student Dashboard</CardTitle>
          </CardHeader>
          <CardContent className='text-center text-gray-600'>
            Welcome to the student portal. Here you can view courses, grades, and academic details.
          </CardContent>
        </Card>

        {/* Grid of sections */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='hover:shadow-md transition'>
            <CardHeader>
              <CardTitle className='text-indigo-700'>My Courses</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm text-gray-600'>View and manage your enrolled courses.</p>
              <Button className='w-full'>View Courses</Button>
            </CardContent>
          </Card>

          <Card className='hover:shadow-md transition'>
            <CardHeader>
              <CardTitle className='text-green-700'>Grades & Reports</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm text-gray-600'>Check your academic progress and results.</p>
              <Button className='w-full' variant='outline'>
                View Grades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
