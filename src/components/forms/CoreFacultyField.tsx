import { useFacultiesQuery } from '@/redux/api/facultyApi';
import FormSelectField, { SelectOptions } from './FormSelectField';
import { IFaculty } from '@/types';

type FacultyProps = {
  name: string;
  label?: string;
};

const CoreFacultyField = ({ name, label = 'Faculty' }: FacultyProps) => {
  const { data } = useFacultiesQuery({
    limit: 100,
    page: 1,
  });

  const faculties: IFaculty[] = data?.faculties || [];

  const facultiesOptions: SelectOptions[] = faculties.map((faculty) => ({
    label: `${faculty.firstName} ${faculty.middleName || ''} ${faculty.lastName}`,
    value: faculty.id,
  }));

  return <FormSelectField name={name} label={label} options={facultiesOptions} />;
};

export default CoreFacultyField;
