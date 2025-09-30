'use client';
import Link from 'next/link';
import { Button } from './button';

type ActionBarProps = {
  title?: string;
  link: string;
  btnText?: string;
};

type ActionBarKey =
  | 'admin'
  | 'department'
  | 'faculty'
  | 'student'
  | 'user'
  | 'semester'
  | 'academic'
  | 'academicDepartment'
  | 'building'
  | 'course'
  | 'departmentList'
  | 'facultyList'
  | 'studentList'
  | 'offeredCourseList'
  | 'courseSectionList'
  | 'roomList'
  | 'semesterRegistrationList';

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
  semester: {
    title: 'Academic Semester',
    link: '/admin/academic/semester/create',
    btnText: 'Create Semester',
  },
  academic: {
    title: 'Academic Faculty',
    link: '/admin/academic/faculty/create',
    btnText: 'Create Academic',
  },
  academicDepartment: {
    title: 'Academic Department',
    link: '/admin/academic/department/create',
    btnText: 'Create Academic Department',
  },
  building: {
    title: 'Building List',
    link: '/admin/building/create',
    btnText: 'Create Building',
  },
  course: {
    title: 'Course List',
    link: '/admin/course/create',
    btnText: 'Create Course',
  },
  departmentList: {
    title: 'Department List',
    link: '/admin/department/create',
    btnText: 'Department Create',
  },
  facultyList: {
    title: 'Faculty List',
    link: '/admin/manage-faculty/create',
    btnText: 'Create Faculty',
  },
  studentList: {
    title: 'Student List',
    link: '/admin/manage-student/create',
    btnText: 'Create Student',
  },
  offeredCourseList: {
    title: 'Offered Course List',
    link: '/admin/offered-course/create',
    btnText: 'Create Offered Course',
  },
  courseSectionList: {
    title: 'Course Section List',
    link: '/admin/offered-course-section/create',
    btnText: 'Create Course Section',
  },
  roomList: {
    title: 'Room List',
    link: '/admin/room/create',
    btnText: 'Create Room',
  },
  semesterRegistrationList: {
    title: 'Semester Registration List',
    link: '/admin/semester-registration/create',
    btnText: 'Create Semester Registration',
  },
};

const ActionBar = ({ title, link, btnText }: ActionBarProps) => {
  return (
    <>
      <h1>{title}</h1>
      <Link href={link}>
        <Button variant='default'>{btnText}</Button>
      </Link>
    </>
  );
};

export default ActionBar;
