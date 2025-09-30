'use client';

import UMTable from '@/components/ui/UMTable';
import Link from 'next/link';
import { useState } from 'react';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';

import {
  useDeleteOfferedCourseMutation,
  useOfferedCoursesQuery,
} from '@/redux/api/offeredCourseApi';
import { TuToastify } from '@/lib/reactToastify';
import { Button } from '@/components/ui/button';
import { Edit, Repeat, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

const OfferedCoursePage = () => {
  const query: Record<string, unknown> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data, isLoading } = useOfferedCoursesQuery({ ...query });

  const offeredCourses = data?.offeredCourses;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    TuToastify('Deleting.....', 'loading');
    try {
      const res = await deleteOfferedCourse(id);
      if (res) {
        TuToastify('Offered Course Deleted successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const columns = [
    {
      title: 'Course',
      dataIndex: 'course',
      sorter: true,
      render: function (data: { title: string }) {
        return <>{data?.title}</>;
      },
    },
    {
      title: 'Academic department',
      dataIndex: 'academicDepartment',
      sorter: true,
      render: function (data: { title: string }) {
        return <>{data?.title}</>;
      },
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      render: function (data: string) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
      sorter: true,
    },
    {
      title: 'Action',
      render: function (data: { id: string }) {
        return (
          <>
            <Link href={`/admin/offered-course/edit/${data?.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                variant='default'
              >
                <Edit />
              </Button>
            </Link>
            <Button onClick={() => deleteHandler(data?.id)} variant='default'>
              <Trash />
            </Button>
          </>
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
      <Input
        type='text'
        placeholder='Search...'
        style={{
          width: '20%',
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div>
        <ActionBar
          title={actionBarObj.offeredCourseList.title}
          link={actionBarObj.offeredCourseList.link}
          btnText={actionBarObj.offeredCourseList.btnText}
        />
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button onClick={resetFilters} variant='default' style={{ margin: '0px 5px' }}>
            <Repeat />
          </Button>
        )}
      </div>

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={offeredCourses as []}
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

export default OfferedCoursePage;
