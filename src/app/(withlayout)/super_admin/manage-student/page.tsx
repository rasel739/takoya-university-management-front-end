'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UMTable from '@/components/ui/UMTable';
import { Eye, Edit, Trash, ReplyIcon } from 'lucide-react';
import { useDebounced } from '@/redux/hooks';
import { useStudentsQuery } from '@/redux/api/studentApi';

const StudentPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const query: Record<string, unknown> = {
    limit: size,
    page: page,
    sortBy,
    sortOrder,
  };

  const debouncedSearchTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  if (debouncedSearchTerm) query['searchTerm'] = debouncedSearchTerm;

  const { data, isLoading } = useStudentsQuery({ ...query });
  const students = data?.students ?? [];
  const meta = data?.meta;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'studentId',
      sorter: true,
    },
    {
      title: 'Name',
      render: (row: { firstName: string; middleName: string; lastName: string }) =>
        `${row.firstName} ${row.middleName} ${row.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (row: string) => row && dayjs(row).format('MMM D, YYYY hh:mm A'),
      sorter: true,
    },
    {
      title: 'Contact No.',
      dataIndex: 'contactNo',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: true,
    },
    {
      title: 'Action',
      render: (row: { id: number }) => (
        <div className='flex gap-2'>
          <Link href={`/super_admin/manage-student/details/${row.id}`}>
            <Button size='sm' variant='outline'>
              <Eye className='w-4 h-4' />
            </Button>
          </Link>
          <Link href={`/super_admin/manage-student/edit/${row.id}`}>
            <Button size='sm' variant='outline'>
              <Edit className='w-4 h-4' />
            </Button>
          </Link>
          <Button size='sm' variant='destructive'>
            <Trash className='w-4 h-4' />
          </Button>
        </div>
      ),
    },
  ];

  const onPaginationChange = (newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  };

  const onTableChange = (sortColumn?: string, sortOrderParam?: 'asc' | 'desc') => {
    setSortBy(sortColumn ?? '');
    setSortOrder(sortOrderParam ?? '');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div className='min-h-screen p-6 bg-gray-50 space-y-4'>
      <ActionBar
        title={actionBarObj.student.title}
        link={actionBarObj.student.link}
        btnText={actionBarObj.student.btnText}
      />

      {/* Filters */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <Input
          placeholder='Search students...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-xs'
        />
        <div className='flex items-center gap-2'>
          <Link href='/super_admin/manage-student/create'>
            <Button>Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button variant='outline' onClick={resetFilters}>
              <ReplyIcon className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={students as []}
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

export default StudentPage;
