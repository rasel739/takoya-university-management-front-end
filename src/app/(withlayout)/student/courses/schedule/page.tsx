'use client';
import ClassSchedule from '@/components/ui/ClassSchedule';
import UMTable from '@/components/ui/UMTable';
import { useMyCourseSchedulesQuery } from '@/redux/api/studentApi';
import { IOfferedCourseSchedule } from '@/types';

const MyCourseSchedulePage = () => {
  const { data, isLoading } = useMyCourseSchedulesQuery({});
  const myCourseSchedules = data?.myCourseSchedules;

  const columns = [
    {
      title: 'Course name',
      dataIndex: 'offeredCourse',
      render: function (data: { course: { title: string } }) {
        return <>{data.course.title}</>;
      },
    },
    {
      title: 'Credit',
      dataIndex: 'offeredCourse',
      render: function (data: { course: { credits: number } }) {
        return <>{data.course.credits}</>;
      },
    },
    {
      title: 'Section',
      dataIndex: 'offeredCourseSection',
      render: function (data: { title: string }) {
        return <>{data.title}</>;
      },
    },
    {
      title: 'Class Schedules',
      dataIndex: 'offeredCourseSection',
      render: function (data: { offeredCourseClassSchedules: IOfferedCourseSchedule[] }) {
        return (
          <>
            <ClassSchedule data={data.offeredCourseClassSchedules as IOfferedCourseSchedule[]} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <h1 className='text-2xl font-bold tracking-tight'>My course schedules</h1>

      <UMTable
        loading={isLoading}
        dataSource={myCourseSchedules as []}
        columns={columns as []}
        showPagination={false}
      />
    </>
  );
};

export default MyCourseSchedulePage;
