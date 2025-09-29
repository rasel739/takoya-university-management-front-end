'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import UMTable from '@/components/ui/UMTable';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import { useFacultiesQuery } from '@/redux/api/facultyApi';
import { useDebounced } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/lib/icons';
import { Edit, RefreshCcw, Trash } from 'lucide-react';

const FacultyPage = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const query: Record<string, unknown> = {
    limit: size,
    page,
    sortBy,
    sortOrder,
  };

  const debouncedSearchTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  if (debouncedSearchTerm) query['searchTerm'] = debouncedSearchTerm;

  const { data, isLoading } = useFacultiesQuery({ ...query });
  const faculties = data?.faculties ?? [];
  const meta = data?.meta;

  const columns = [
    { title: 'Id', dataIndex: 'facultyId', sorter: true },
    {
      title: 'Name',
      render: (row: { firstName: string; middleName: string; lastName: string }) =>
        `${row?.firstName} ${row?.middleName || ''} ${row?.lastName}`,
    },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Department',
      dataIndex: 'academicDepartment',
      render: (dept: { title: string }) => dept?.title,
    },
    { title: 'Designation', dataIndex: 'designation' },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: (val: string) => val && dayjs(val).format('MMM D, YYYY hh:mm A'),
      sorter: true,
    },
    { title: 'Contact no.', dataIndex: 'contactNo' },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => (
        <div className='flex gap-2'>
          <Link href={`/super_admin/manage-faculty/details/${id}`}>
            <Button size='sm' variant='outline'>
              <Icons.Eye className='w-4 h-4' />
            </Button>
          </Link>
          <Link href={`/super_admin/manage-faculty/edit/${id}`}>
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

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (sortColumn?: string, sortOrder?: 'asc' | 'desc') => {
    setSortBy(sortColumn || '');
    setSortOrder(sortOrder || '');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div className='min-h-screen p-6 space-y-6 bg-gray-50'>
      {/* Action Bar */}
      <ActionBar title='Faculty List' link={actionBarObj.faculty.link} />

      {/* Filters */}
      <div className='flex flex-col sm:flex-row items-center gap-4'>
        <Input
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full sm:w-1/4'
        />
        <div className='flex gap-2'>
          <Link href='/super_admin/manage-faculty/create'>
            <Button>Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button variant='outline' onClick={resetFilters}>
              <RefreshCcw className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={faculties as []}
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

export default FacultyPage;
