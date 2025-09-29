'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import UMTable from '@/components/ui/UMTable';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import { useDepartmentsQuery, useDeleteDepartmentMutation } from '@/redux/api/departmentApi';
import { useDebounced } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, RefreshCw } from 'lucide-react';
import { TuToastify } from '@/lib/reactToastify';

const ManageDepartmentPage = () => {
  const query: Record<string, unknown> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteDepartment] = useDeleteDepartmentMutation();

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  if (!!debouncedTerm) query['searchTerm'] = debouncedTerm;

  const { data, isLoading } = useDepartmentsQuery({ ...query });
  const departments = data?.departments;
  // const meta = data?.meta;

  const handleDelete = async (id: string) => {
    TuToastify('Deleting department...', 'error');
    try {
      await deleteDepartment(id);
      TuToastify('Department deleted successfully!', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  const columns = [
    { title: 'Title', key: 'title', dataIndex: 'title' },
    {
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: string) => value && dayjs(value).format('MMM D, YYYY hh:mm A'),
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (data: { id: string }) => (
        <div className='flex gap-2'>
          <Link href={`/super_admin/department/edit/${data?.id}`}>
            <Button variant='outline' size='sm'>
              <Edit2 className='w-4 h-4' />
            </Button>
          </Link>
          <Button variant='destructive' size='sm' onClick={() => handleDelete(data?.id)}>
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      ),
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  // const onTableChange = (pagination: any, filter: any, sorter: any) => {
  //   const { order, field } = sorter;
  //   setSortBy(field);
  //   setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  // };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <ActionBar title='Department List' link={actionBarObj.department.link} />

      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <Input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-xs'
        />
        <div className='flex gap-2'>
          <Link href='/super_admin/department/create'>
            <Button>Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button onClick={resetFilters} variant='outline'>
              <RefreshCw className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={departments as unknown as []}
        pageSize={size}
        showSizeChanger
        onPaginationChange={onPaginationChange}
        showPagination
      />
    </div>
  );
};

export default ManageDepartmentPage;
