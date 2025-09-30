'use client';
import UMTable from '@/components/ui/UMTable';

import Link from 'next/link';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';
import {
  useAcademicDepartmentsQuery,
  useDeleteAcademicDepartmentMutation,
} from '@/redux/api/academic/departmentApi';
import { TuToastify } from '@/lib/reactToastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import { Repeat } from 'lucide-react';

const ACDepartmentPage = () => {
  const query: Record<string, unknown> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();

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
  const { data, isLoading } = useAcademicDepartmentsQuery({ ...query });

  const academicDepartments = data?.academicDepartments;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    TuToastify('Deleting.....', 'loading');
    try {
      const res = await deleteAcademicDepartment(id);
      if (res) {
        TuToastify('Department Deleted successfully', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Faculty',
      dataIndex: 'academicFaculty',
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
            <Link href={`/admin/academic/department/edit/${data?.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                variant='default'
              >
                Edit
              </Button>
            </Link>
            <Button onClick={() => deleteHandler(data?.id)}>Delete</Button>
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
          title={actionBarObj.academicDepartment.title}
          link={actionBarObj.academicDepartment.link}
          btnText={actionBarObj.academicDepartment.btnText}
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
        dataSource={academicDepartments as []}
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

export default ACDepartmentPage;
