'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// import { Icons } from '@/lib/icons';
import { Shield } from 'lucide-react';

const SuperAdminPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='mt-4 mb-6'>
        <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-2'>
          <Shield className='w-6 h-6 text-primary' />
          Super Admin Dashboard
        </h1>
        <p className='text-gray-600 mt-1'>
          Manage all users, roles, and system-wide settings from this page.
        </p>
      </header>

      {/* Main Card */}
      <Card className='max-w-3xl mx-auto hover:shadow-lg transition-shadow'>
        <CardHeader>
          <CardTitle>Super Admin Controls</CardTitle>
          <CardDescription>
            This section contains all administrative controls and settings for the system.
          </CardDescription>
        </CardHeader>
        <CardContent className='mt-4'>
          <p className='text-gray-700'>
            Only super admins have access to this dashboard. Here you can manage users, view
            analytics, and configure system-wide settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminPage;
