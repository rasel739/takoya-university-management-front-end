import Link from 'next/link';
import { USER_ROLE } from './role';
import { Icons } from '@/lib/icons';

export const sidebaritems = (role: string) => {
  const iconProps = { color: 'rgb(255, 0, 255)', size: '1.5rem' };

  const sideBarLink = (label: string, path: string, icon?: React.ReactNode) => ({
    label: <Link href={path}>{label}</Link>,
    key: path,
    ...(icon && { icon }),
  });

  const defaultSidebarItems = [
    {
      label: 'Profile',
      key: `profile`,
      icon: <Icons.Profile {...iconProps} />,
      children: [
        sideBarLink('Account Profile', `/${role}`),
        sideBarLink('Change Password', `/${role}/change-password`),
      ],
    },
  ];

  const commonAdminSidebarItems = [
    sideBarLink(
      'Manage Student',
      `/${role}/manage-student`,
      <Icons.ManageStudent {...iconProps} />
    ),
    sideBarLink(
      'Manage Faculty',
      `/${role}/manage-faculty`,
      <Icons.ManageFaculty {...iconProps} />
    ),
  ];

  const adminSidebarItems = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: 'Manage academic',
      key: 'manage-academic',
      icon: <Icons.ManageAcademic />,
      children: [
        sideBarLink('Faculties', `/${role}/academic/faculty`),
        sideBarLink('Department', `/${role}/academic/department`),
        sideBarLink('Semesters', `/${role}/academic/semester`),
      ],
    },
    {
      label: 'Management',
      key: 'management',
      icon: <Icons.Management />,
      children: [
        sideBarLink('Department', `/${role}/department`),
        sideBarLink('Building', `/${role}/building`),
        sideBarLink('Rooms', `/${role}/room`),
        sideBarLink('Course', `/${role}/course`),
        sideBarLink('Semester registration', `/${role}/semester-registration`),
        sideBarLink('Offered courses', `/${role}/offered-course`),
        sideBarLink('Course sections', `/${role}/offered-course-section`),
      ],
    },
  ];

  const superAdminSidebarItems = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    sideBarLink('Manage Admin', `/${role}/admin`, <Icons.ManageAdmin {...iconProps} />),
    sideBarLink('Manage User', `/${role}/user`, <Icons.ManageUser {...iconProps} />),
    {
      label: 'Management',
      key: 'management',
      icon: <Icons.ManageTableList {...iconProps} />,
      children: [sideBarLink('Department', `/${role}/department`)],
    },
  ];

  const facultySidebarItems = [
    ...defaultSidebarItems,
    sideBarLink('Courses', `/${role}/courses`, <Icons.FacultyCourse {...iconProps} />),
  ];

  const studentSidebarItems = [
    ...defaultSidebarItems,
    sideBarLink('Courses', `/${role}/courses`, <Icons.StudentCourse {...iconProps} />),
    sideBarLink(
      'Course schedules',
      `/${role}/courses/schedule`,
      <Icons.StudentCourseSchedules {...iconProps} />
    ),
    sideBarLink(
      'Registration',
      `/${role}/registration`,
      <Icons.StudentRegistration {...iconProps} />
    ),
    sideBarLink('Payment', `/${role}/payment`, <Icons.StudentPayment {...iconProps} />),
    sideBarLink(
      'Academic report',
      `/${role}/academic-report`,
      <Icons.AcademicReport {...iconProps} />
    ),
  ];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      return superAdminSidebarItems;
    case USER_ROLE.ADMIN:
      return adminSidebarItems;
    case USER_ROLE.FACULTY:
      return facultySidebarItems;
    case USER_ROLE.STUDENT:
      return studentSidebarItems;
    default:
      return defaultSidebarItems;
  }
};
