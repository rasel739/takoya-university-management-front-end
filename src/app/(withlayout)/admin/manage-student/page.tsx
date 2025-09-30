'use client';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import UMTable from '@/components/ui/UMTable';
import dayjs from 'dayjs';
import { useStudentsQuery } from '@/redux/api/studentApi';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Repeat, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

const StudentPage = () => {
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

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading } = useStudentsQuery({ ...query });

  const students = data?.students;
  const meta = data?.meta;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'studentId',
      sorter: true,
    },
    {
      title: 'Name',
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: function (data: string) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
      sorter: true,
    },
    {
      title: 'Contact no.',
      dataIndex: 'contactNo',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: function (data: { id: string }) {
        return (
          <>
            <Link href={`/admin/manage-faculty/details/${data.id}`}>
              <Button variant='default'>
                <Eye />
              </Button>
            </Link>
            <Link href={`/admin/manage-faculty/edit/${data.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                variant='default'
              >
                <Edit />
              </Button>
            </Link>
            <Button variant='outline'>
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
  const onTableChange = (paginationOrSortColumn?: string, filterOrSortOrder?: string) => {
    if (typeof paginationOrSortColumn === 'string' || paginationOrSortColumn === undefined) {
      const sortColumn = paginationOrSortColumn as string | undefined;
      const sortOrder = filterOrSortOrder as 'asc' | 'desc' | undefined;

      setSortBy(sortColumn || '');
      setSortOrder(sortOrder || '');
      return;
    }
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };
  return (
    <div>
      <Input
        placeholder='Search'
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '20%',
        }}
      />
      <div>
        <ActionBar
          title={actionBarObj.studentList.title}
          link={actionBarObj.studentList.link}
          btnText={actionBarObj.studentList.btnText}
        />
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button style={{ margin: '0px 5px' }} variant='default' onClick={resetFilters}>
            <Repeat />
          </Button>
        )}
      </div>

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={students as []}
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

export default StudentPage;
