'use client';

import UMTable from '@/components/ui/UMTable';
import { useMyAcademicInfosQuery } from '@/redux/api/studentApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ICourse {
  id: string;
  course: {
    title: string;
  };
  grade: string;
  point: number;
  status: string;
  totalMarks: number;
}

interface IAcademicSemester {
  title: string;
  year: number;
  isCurrent: boolean;
}

interface IAcademicData {
  id: string;
  academicSemester: IAcademicSemester;
  completedCourses: ICourse[];
}

interface IAcademicInfo {
  cgpa: number;
  totalCompletedCredit: number;
}

interface IResponseData {
  academicInfo: IAcademicInfo;
  courses: IAcademicData[];
}

const AcademicReport = () => {
  const query: Record<string, unknown> = {};
  const { data, isLoading } = useMyAcademicInfosQuery({ ...query });

  const academicData = data as IResponseData | undefined;

  const columns = [
    {
      title: 'Grade Report',
      dataIndex: '',
      render: function (row: IAcademicData) {
        return (
          <div className='mb-6 p-4 border rounded-lg bg-muted/30'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-lg font-semibold'>
                {row.academicSemester.title} - {row.academicSemester.year}
              </h3>
              {row.academicSemester.isCurrent && <Badge className='bg-blue-600'>Ongoing</Badge>}
            </div>

            <ul className='space-y-3'>
              {row.completedCourses.map((course) => (
                <li key={course.id}>
                  <Card className='shadow-sm'>
                    <CardContent className='p-4'>
                      <h4 className='font-medium'>{course.course.title}</h4>
                      <div className='mt-2 flex flex-wrap gap-4 text-sm'>
                        <span>
                          Grade: <b>{course.grade}</b>
                        </span>
                        <span>
                          GPA: <b>{course.point}</b>
                        </span>
                        <span>
                          Status: <b>{course.status}</b>
                        </span>
                        <span>
                          Marks: <b>{course.totalMarks}</b>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
  ];

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold tracking-tight'>My Academic Grade Report</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='shadow'>
          <CardHeader>
            <CardTitle>Total CGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-semibold'>{academicData?.academicInfo?.cgpa ?? '-'}</p>
          </CardContent>
        </Card>

        <Card className='shadow'>
          <CardHeader>
            <CardTitle>Total Completed Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-semibold'>
              {academicData?.academicInfo?.totalCompletedCredit}{' '}
              {academicData?.academicInfo?.totalCompletedCredit === 1 ? 'credit' : 'credits'}
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <UMTable
          loading={isLoading}
          dataSource={academicData?.courses as []}
          columns={columns as []}
          showPagination={false}
        />
      </div>
    </div>
  );
};

export default AcademicReport;
