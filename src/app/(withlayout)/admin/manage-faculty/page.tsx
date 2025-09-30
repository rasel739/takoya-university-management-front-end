'use client';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import UMTable from '@/components/ui/UMTable';
import { IDepartment } from '@/types';
import dayjs from 'dayjs';
import { useFacultiesQuery } from '@/redux/api/facultyApi';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Repeat, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FacultyPage = () => {
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
  const { data, isLoading } = useFacultiesQuery({ ...query });

  const faculties = data?.faculties;
  const meta = data?.meta;
  console.log(faculties);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'facultyId',
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
      title: 'Department',
      dataIndex: 'academicDepartment',
      render: function (data: IDepartment) {
        return <>{data?.title}</>;
      },
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
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
            <Button variant='destructive'>
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
        placeholder='Search'
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '20%',
        }}
      />
      <div>
        <ActionBar
          title={actionBarObj.facultyList.title}
          link={actionBarObj.facultyList.link}
          btnText={actionBarObj.facultyList.btnText}
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
        dataSource={faculties as []}
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

export default FacultyPage;
