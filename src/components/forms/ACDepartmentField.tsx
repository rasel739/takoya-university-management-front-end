import { useAcademicDepartmentsQuery } from '@/redux/api/academic/departmentApi';
import FormSelectField, { SelectOptions } from './FormSelectField';

type ACDepartmentFieldProps = {
  name: string;
  label?: string;
};

const ACDepartmentField = ({ name, label }: ACDepartmentFieldProps) => {
  const { data } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const academicDepartments = data?.academicDepartments;
  interface AcademicDepartment {
    id: string;
    title: string;
  }

  const acDepartmentOptions = academicDepartments?.map((acDepartment: AcademicDepartment) => {
    console.log(acDepartment?.id);
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  return (
    <FormSelectField name={name} label={label} options={acDepartmentOptions as SelectOptions[]} />
  );
};

export default ACDepartmentField;
