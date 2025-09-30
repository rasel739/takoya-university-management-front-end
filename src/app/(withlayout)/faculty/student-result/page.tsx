'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import UMTable from '@/components/ui/UMTable';
import BaseRow from '@/components/ui/BaseRow';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Repeat, Tag } from 'lucide-react';
import { useDebounced } from '@/redux/hooks';
import { TuToastify } from '@/lib/reactToastify';
import { ExamType } from '@/constants/global';
import {
  useStudentEnrolledCourseMarksQuery,
  useUpdateFinalMarksMutation,
} from '@/redux/api/studentEnrollCourseMarkApi';
import { IStudentEnrolledCourseMark } from '@/types';

interface StudentResultPageProps {
  searchParams: {
    studentId: string;
    courseId: string;
    offeredCourseSectionId: string;
  };
}

const StudentResultPage = ({ searchParams }: StudentResultPageProps) => {
  const { studentId, courseId, offeredCourseSectionId } = searchParams;

  const [updateFinalMarks] = useUpdateFinalMarksMutation();
  const [academicSemesterId, setAcademicSemesterId] = useState<string>();
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
    studentId,
    courseId,
    offeredCourseSectionId,
  };

  const debouncedSearchTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  if (debouncedSearchTerm) query['searchTerm'] = debouncedSearchTerm;

  const { data, isLoading } = useStudentEnrolledCourseMarksQuery(query);
  const studentEnrolledCourseMarks = data?.studentEnrolledCourseMarks;
  const meta = data?.meta;

  const handleUpdateFinalMarks = async (values: {
    studentId: string;
    courseId: string;
    academicSemesterId: string | undefined;
  }) => {
    try {
      await updateFinalMarks(values).unwrap();
      TuToastify('Final Marks Updated', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const columns = [
    {
      title: 'Student Info',
      dataIndex: 'student',
      render: (data: IStudentEnrolledCourseMark['student']) => (
        <div className='space-y-1'>
          <BaseRow title='Name'>
            {data?.firstName} {data?.middleName} {data?.lastName}
          </BaseRow>
          <BaseRow title='Student ID'>{data?.studentId}</BaseRow>
        </div>
      ),
    },
    {
      title: 'Grade Info',
      render: (data: IStudentEnrolledCourseMark) => (
        <div className='space-y-1'>
          <BaseRow title='Grade'>{data?.grade || '-'}</BaseRow>
          <BaseRow title='Total Marks'>{data?.marks}</BaseRow>
        </div>
      ),
    },
    {
      title: 'Exam Type',
      dataIndex: 'examType',
      sorter: true,
      render: (data: ExamType) => (
        <Tag color={data === ExamType.MIDTERM ? 'magenta' : 'blue'}>{data}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
      render: (data: string) => data && dayjs(data).format('MMM D, YYYY hh:mm A'),
    },
    {
      title: 'Action',
      render: (data: IStudentEnrolledCourseMark) => {
        setAcademicSemesterId(data?.academicSemesterId);
        return (
          <Link
            href={`/faculty/update-mark?examType=${data?.examType}&marks=${data?.marks}&academicSemesterId=${data?.academicSemesterId}&studentId=${studentId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`}
          >
            <Button variant='default'>Update Marks</Button>
          </Link>
        );
      },
    },
  ];

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
        <h1 className='text-2xl font-bold'>Student Marks</h1>
        <div className='flex items-center space-x-2'>
          <Input
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full md:w-64'
          />
          {(sortBy || sortOrder || searchTerm) && (
            <Button variant='default' onClick={resetFilters}>
              <Repeat />
            </Button>
          )}
        </div>
      </div>

      {studentEnrolledCourseMarks?.some((el) => el.examType === ExamType.FINAL && el.marks > 0) && (
        <div className='flex justify-end'>
          <Button
            variant='default'
            onClick={() =>
              handleUpdateFinalMarks({
                studentId,
                courseId,
                academicSemesterId,
              })
            }
          >
            Update Final Marks
          </Button>
        </div>
      )}

      <UMTable
        loading={isLoading}
        columns={columns as []}
        dataSource={studentEnrolledCourseMarks as []}
        pageSize={size}
        totalRecords={meta?.total}
        showSizeChanger
        onPaginationChange={(page, pageSize) => {
          setPage(page);
          setSize(pageSize);
        }}
        onTableChange={(_, __, sorter) => {
          setSortBy(sorter.field || '');
          setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
        }}
        showPagination
      />
    </div>
  );
};

export default StudentResultPage;
