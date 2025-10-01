import DepartmentEdit from '@/components/ui/department-edit';

interface EditDepartmentPageProps {
  params: { id: string };
}

const EditDepartmentPage = async ({ params }: EditDepartmentPageProps) => {
  const id = params?.id;

  return <DepartmentEdit id={id} />;
};

export default EditDepartmentPage;
