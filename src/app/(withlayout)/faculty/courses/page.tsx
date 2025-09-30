'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import UMTable from '@/components/ui/UMTable';
import { IOfferedCourseSchedule, IOfferedCourseSection } from '@/types';
import { useFacultyCoursesQuery } from '@/redux/api/facultyApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Repeat } from 'lucide-react';

interface FacultyCourseRow {
  course: {
    id: string;
    title: string;
    code: string;
    credits: number;
  };
  sections: {
    section: IOfferedCourseSection;
    classSchedules: IOfferedCourseSchedule[];
  }[];
}

const FacultyCoursesPage = () => {
  const query: Record<string, unknown> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useFacultyCoursesQuery({ ...query });

  const myCourses = data?.myCourses as FacultyCourseRow[] | undefined;
  const meta = data?.meta;

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course',
      render: (course: FacultyCourseRow['course']) => <>{course?.title}</>,
    },
    {
      title: 'Code',
      dataIndex: 'course',
      render: (course: FacultyCourseRow['course']) => <>{course?.code}</>,
    },
    {
      title: 'Credit',
      dataIndex: 'course',
      render: (course: FacultyCourseRow['course']) => <>{course?.credits}</>,
    },
    {
      title: 'Sections',
      dataIndex: 'sections',
      render: (sections: FacultyCourseRow['sections']) => (
        <div className='space-y-2'>
          {sections?.map((el, index) => (
            <div key={index} className='rounded-md border p-2 bg-muted/40 text-sm'>
              Sec - {el.section?.title} ({el.section?.currentlyEnrolledStudent}/
              {el.section?.maxCapacity})
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Action',
      render: (row: FacultyCourseRow) => (
        <div className='space-y-2'>
          {row.sections?.map((el, index) => (
            <Link
              key={index}
              href={`/faculty/courses/student?courseId=${row.course.id}&offeredCourseSectionId=${el.section?.id}`}
            >
              <Button variant='default' size='sm'>
                View all students
              </Button>
            </Link>
          ))}
        </div>
      ),
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (
    _pagination: number,
    _filter: number,
    sorter: { order: string; field: string }
  ) => {
    const { order, field } = sorter;
    setSortBy(field || '');
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
        <h1 className='text-2xl font-bold'>My Courses</h1>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Search'
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full md:w-64'
          />
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button variant='default' onClick={resetFilters}>
              <Repeat className='h-4 w-4' />
            </Button>
          )}
        </div>
      </div>

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={myCourses as []}
        pageSize={size}
        totalRecords={meta?.total}
        showSizeChanger
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination
      />
    </div>
  );
};

export default FacultyCoursesPage;
