import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const FacultyPage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Faculty Management</h1>
      <Card className='shadow-md rounded-2xl'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>Faculty List</CardTitle>
          <Button className='flex items-center gap-2'>
            <Plus className='h-4 w-4' />
            Add Faculty
          </Button>
        </CardHeader>

        <CardContent>
          <p className='text-gray-500 text-sm'>
            No faculty members found. Click <b>Add Faculty</b> to create a new entry.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyPage;
