'use client';

import { Button } from '@/components/ui/button';
import UMCollapse, { ItemProps } from '@/components/ui/UMCollapse';
import { TuToastify } from '@/lib/reactToastify';
import {
  useConfirmMyRegistrationMutation,
  useEnrollIntoCourseMutation,
  useMySemesterRegistrationCoursesQuery,
  useWithdrawFromCourseMutation,
} from '@/redux/api/semesterRegistrationApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ISchedule {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface ISection {
  id: string;
  title: string;
  currentlyEnrolledStudent: number;
  maxCapacity: number;
  isTaken: boolean;
  offeredCourseClassSchedules: ISchedule[];
}

interface ICourse {
  id: string;
  course: {
    title: string;
  };
  isTaken: boolean;
  offeredCourseSections: ISection[];
}

const ViewPreregistrationPage = () => {
  const { data } = useMySemesterRegistrationCoursesQuery({});
  const [enrollIntoCourse] = useEnrollIntoCourseMutation();
  const [withdrawFromCourse] = useWithdrawFromCourseMutation();
  const [confirmMyRegistration] = useConfirmMyRegistrationMutation();

  const handleEnroll = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }) => {
    try {
      await enrollIntoCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
      TuToastify('Enrolled successfully', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const handleWithdraw = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }) => {
    try {
      await withdrawFromCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
      TuToastify('Withdrawn successfully', 'success');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const handleConfirmRegistration = async () => {
    try {
      const res = await confirmMyRegistration({}).unwrap();
      if (res) {
        TuToastify('Successfully registered', 'success');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error';
      TuToastify(errorMessage, 'error');
    }
  };

  const availableCourses: ItemProps[] =
    data?.map((availableCourse: ICourse, index: number) => {
      return {
        key: index,
        label: availableCourse?.course?.title,
        isTaken: availableCourse.isTaken,
        children: (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-1/4'>Section</TableHead>
                  <TableHead className='w-1/4'>Capacity</TableHead>
                  <TableHead className='w-1/3'>Class Schedule</TableHead>
                  <TableHead className='w-1/6 text-right'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableCourse?.offeredCourseSections?.map((section: ISection) => (
                  <TableRow key={section.id}>
                    <TableCell>
                      <span className='font-medium'>Sec - {section?.title}</span>
                    </TableCell>
                    <TableCell>
                      Enrolled:{' '}
                      <b>
                        {section?.currentlyEnrolledStudent}/{section?.maxCapacity}
                      </b>
                    </TableCell>
                    <TableCell>
                      <div className='space-y-1'>
                        {section?.offeredCourseClassSchedules?.map((el: ISchedule) => (
                          <div key={el.id} className='flex justify-between text-sm'>
                            <span className='font-semibold capitalize'>{el?.dayOfWeek}</span>
                            <span>
                              {el?.startTime} - {el?.endTime}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      {availableCourse?.isTaken && section?.isTaken ? (
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() =>
                            handleWithdraw({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Withdraw
                        </Button>
                      ) : (
                        <Button
                          variant='default'
                          size='sm'
                          onClick={() =>
                            handleEnroll({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Enroll
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
      };
    }) ?? [];

  const isAtLeastOneCourseTaken =
    availableCourses?.filter((el: ItemProps) => el.isTaken === true).length > 0;

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold tracking-tight'>Course Pre-registration</h1>

      <UMCollapse
        items={availableCourses}
        defaultActiveKey={availableCourses?.map((item) => item.key)}
      />

      {isAtLeastOneCourseTaken && (
        <div className='pt-4'>
          <Button onClick={handleConfirmRegistration} className='w-full md:w-auto'>
            Confirm Registration
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewPreregistrationPage;
