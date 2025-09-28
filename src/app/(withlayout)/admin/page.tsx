'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Icons } from '@/lib/icons';
import { BarChart, Settings, User } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Header */}
      <header className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Welcome to Admin Profile</h1>
        <p className='text-gray-600 mt-1'>Manage your settings, users, and analytics from here.</p>
      </header>

      {/* Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Example Card: Users */}
        <Card className='hover:shadow-lg transition-shadow'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='w-5 h-5 text-primary' /> Users
            </CardTitle>
            <CardDescription>Manage user accounts and roles</CardDescription>
          </CardHeader>
          <CardContent className='mt-2'>
            <Button size='sm' variant='default'>
              Go to Users
            </Button>
          </CardContent>
        </Card>

        {/* Example Card: Settings */}
        <Card className='hover:shadow-lg transition-shadow'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Settings className='w-5 h-5 text-primary' /> Settings
            </CardTitle>
            <CardDescription>Update system settings</CardDescription>
          </CardHeader>
          <CardContent className='mt-2'>
            <Button size='sm' variant='default'>
              Go to Settings
            </Button>
          </CardContent>
        </Card>

        {/* Example Card: Analytics */}
        <Card className='hover:shadow-lg transition-shadow'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart className='w-5 h-5 text-primary' /> Analytics
            </CardTitle>
            <CardDescription>View system analytics and reports</CardDescription>
          </CardHeader>
          <CardContent className='mt-2'>
            <Button size='sm' variant='default'>
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
