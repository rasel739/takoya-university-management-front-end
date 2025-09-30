import { useAcademicDepartmentsQuery } from '@/redux/api/academic/departmentApi';
import FormSelectField, { SelectOptions } from './FormSelectField';

type ACDepartmentIDFieldProps = {
  name: string;
  label?: string;
  onChange: (value: string) => void;
};

const ACDepartmentIDField = ({ name, label, onChange }: ACDepartmentIDFieldProps) => {
  const { data } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  const academicDepartments = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment) => ({
    label: acDepartment?.title,
    value: acDepartment?.id,
  }));

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
      handleChange={(value: string) => onChange(value)}
    />
  );
};

export default ACDepartmentIDField;
