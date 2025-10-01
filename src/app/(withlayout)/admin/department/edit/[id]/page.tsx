import DepartmentEdit from '@/components/ui/department-edit';

const EditDepartmentPage = async ({ params }: { params: { id: string } }) => {
  return <DepartmentEdit id={params.id} />;
};

export default EditDepartmentPage;
