'use client';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import UMTable from '@/components/ui/UMTable';
import { useFacultyCourseStudentsQuery } from '@/redux/api/facultyApi';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Repeat } from 'lucide-react';

const FacultyCoursesStudentsPage = ({ searchParams }: Record<string, never>) => {
  const { courseId, offeredCourseSectionId } = searchParams;

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

  if (!!courseId) {
    query['courseId'] = courseId;
  }
  if (!!offeredCourseSectionId) {
    query['offeredCourseSectionId'] = offeredCourseSectionId;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading } = useFacultyCourseStudentsQuery({ ...query });

  const myCourseStudents = data?.myCourseStudents;
  const meta = data?.meta;

  const columns = [
    {
      title: 'Student Name',
      render: function (data: { firstName: string; middleName: string; lastName: string }) {
        return (
          <>
            {data?.firstName}
            {data?.middleName}
            {data?.lastName}
          </>
        );
      },
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'contactNo',
    },

    {
      title: 'Action',
      render: function (data: { id: string }) {
        return (
          <div key='1' style={{ margin: '20px 0px' }}>
            <Link
              href={`/faculty/student-result?studentId=${data.id}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`}
            >
              <Button variant='default'>View Marks</Button>
            </Link>
          </div>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log('Page:', page, 'PageSize:', pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (
    pagination: number,
    filter: number,
    sorter: { order: string; field: string }
  ) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };
  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight'>My Course Students</h1>
      <Input
        placeholder='Search'
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '20%',
        }}
      />
      <div>
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button style={{ margin: '0px 5px' }} onClick={resetFilters}>
            <Repeat />
          </Button>
        )}
      </div>

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={myCourseStudents as []}
        pageSize={size}
        totalRecords={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default FacultyCoursesStudentsPage;
