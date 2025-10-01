'use client';
import ActionBar, { actionBarObj } from '@/components/ui/ActionBar';
import Link from 'next/link';

import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import UMTable from '@/components/ui/UMTable';
import { useAdminsQuery, useDeleteAdminMutation } from '@/redux/api/adminApi';
import { IDepartment } from '@/types';
import dayjs from 'dayjs';
import UMModal from '@/components/ui/UMModal';
import { Button } from '@/components/ui/button';
import { TuToastify } from '@/lib/reactToastify';
import { Input } from '@/components/ui/input';

const AdminPage = () => {
  const query: Record<string, string | number> = {};
  const [deleteAdmin] = useDeleteAdminMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>('');

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
  const { data, isLoading } = useAdminsQuery({ ...query });

  const admins = data?.admins;
  const meta = data?.meta;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      dataIndex: 'managementDepartment',
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
      render: function (data: string) {
        return (
          <>
            <Link href={`/super_admin/admin/details/${data}`}>
              <Button onClick={() => console.log(data)}>Details icon</Button>
            </Link>
            <Link href={`/super_admin/admin/edit/${data}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                onClick={() => console.log(data)}
              >
                Edit Icon
              </Button>
            </Link>
            <Button
              onClick={() => {
                setOpen(true);
                setAdminId(data);
              }}
              style={{ marginLeft: '3px' }}
            >
              Delete Icon
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

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  const deleteAdminHandler = async (id: string) => {
    try {
      const res = await deleteAdmin(id);
      if (res) {
        TuToastify('Admin Successfully Deleted!', 'success');
        setOpen(false);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      TuToastify(errorMessage, 'error');
    }
  };

  return (
    <div>
      <ActionBar
        title='Admin List'
        link={actionBarObj.admin.link}
        btnText={actionBarObj.admin.btnText}
      />
      <Input
        placeholder='Search'
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '20%',
        }}
      />
      <div>
        <Link href='/super_admin/admin/create'>
          <Button>Create Admin</Button>
        </Link>
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button style={{ margin: '0px 5px' }} onClick={resetFilters}>
            Reload Icon
          </Button>
        )}
      </div>

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={admins as []}
        pageSize={size}
        totalRecords={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        showPagination={true}
      />

      <UMModal
        title='Remove admin'
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className='my-5'>Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default AdminPage;
