import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

type ActionBarProps = {
  title?: string;
  link: string;
  btnText?: string;
};

type ActionBarKey = 'admin' | 'department' | 'faculty' | 'student' | 'user';

type ActionBarObjType = Record<ActionBarKey, ActionBarProps>;

export const actionBarObj: ActionBarObjType = {
  admin: {
    title: 'Manage Admin',
    link: '/super_admin/admin/create',
    btnText: 'Create Admin',
  },
  department: {
    title: 'Manage Department',
    link: '/super_admin/department/create',
    btnText: 'Create Department',
  },
  faculty: {
    title: 'Manage Faculty',
    link: '/super_admin/manage-faculty/create',
    btnText: 'Create Faculty',
  },
  student: {
    title: 'Manage Student',
    link: '/super_admin/manage-student/create',
    btnText: 'Create Student',
  },
  user: {
    title: 'Manage User',
    link: '/super_admin/user/create',
    btnText: 'Create User',
  },
};

const ActionBar = ({ title, link, btnText }: ActionBarProps) => {
  return (
    <>
      <h1>{title}</h1>
      <Link href={link}>
        <Button type='primary'>{btnText}</Button>
      </Link>
    </>
  );
};

export default ActionBar;
