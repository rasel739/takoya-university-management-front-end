import DepartmentEdit from '@/components/ui/department-edit';

const EditDepartmentPage = async ({ params }: { params: { [key: string]: string | string[] } }) => {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  return <DepartmentEdit id={id} />;
};

export default EditDepartmentPage;
