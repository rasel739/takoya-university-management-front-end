'use client';
import { useState } from 'react';
import UMTable from '@/components/ui/UMTable';
import { useMyCoursesQuery } from '@/redux/api/studentApi';

const StudentCoursesPage = () => {
  const query: Record<string, unknown> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const { data, isLoading } = useMyCoursesQuery({ ...query });

  const myCourses = data?.myCourses;
  const meta = data?.meta;

  const columns = [
    {
      title: 'Course name',
      dataIndex: 'course',
      render: function (data: { title: string }) {
        return <>{data?.title}</>;
      },
    },
    {
      title: 'Code',
      dataIndex: 'course',
      render: function (data: { code: string }) {
        return <>{data?.code}</>;
      },
    },
    {
      title: 'Credit',
      dataIndex: 'course',
      render: function (data: { credits: number }) {
        return <>{data?.credits}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      render: function (data: string) {
        return <>{!data ? <>-</> : data}</>;
      },
    },
    {
      title: 'Points',
      dataIndex: 'point',
    },
    {
      title: 'Total marks',
      dataIndex: 'totalMarks',
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

  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight'>My Courses</h1>

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={myCourses as []}
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

export default StudentCoursesPage;
