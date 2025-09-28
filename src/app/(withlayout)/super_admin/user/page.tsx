'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Icons } from '@/lib/icons';
import { User } from 'lucide-react';

const ManageUsersPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Page Header */}
      <header className='mt-4 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-2'>
            <User className='w-6 h-6 text-primary' />
            Manage Users
          </h1>
          <p className='text-gray-600 mt-1'>View and manage all users in the system.</p>
        </div>
        <Button size='sm' variant='default'>
          Add New User
        </Button>
      </header>

      {/* Users Card */}
      <Card className='max-w-5xl mx-auto hover:shadow-lg transition-shadow'>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            Here is the list of all registered users. You can edit or remove users as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className='mt-4'>
          {/* Example Table Placeholder */}
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border border-gray-200 divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Name</th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Email</th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Role</th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {/* Replace with dynamic rows */}
                <tr>
                  <td className='px-4 py-2 text-gray-600'>John Doe</td>
                  <td className='px-4 py-2 text-gray-600'>john.doe@example.com</td>
                  <td className='px-4 py-2 text-gray-600'>Admin</td>
                  <td className='px-4 py-2 flex gap-2'>
                    <Button variant='outline'>Edit</Button>
                    <Button variant='destructive'>Delete</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersPage;
