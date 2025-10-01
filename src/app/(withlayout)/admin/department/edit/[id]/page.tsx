import DepartmentEdit from '@/components/ui/department-edit';
import { Params } from 'next/dist/server/request/params';

interface PageProps {
  params: Params;
}

const EditDepartmentPage = async ({ params }: PageProps) => {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <DepartmentEdit id={id || ''} />;
};

export default EditDepartmentPage;
