'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Icons } from '@/lib/icons';
import { User } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Header */}
      <header className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Welcome back!</h1>
        <p className='text-gray-600 mt-1'>Here’s a summary of your profile and activities.</p>
      </header>

      {/* Profile Card */}
      <Card className='max-w-2xl mx-auto hover:shadow-lg transition-shadow'>
        <CardHeader>
          <CardTitle className='text-xl flex items-center gap-2'>
            <User className='w-5 h-5 text-primary' /> Your Profile
          </CardTitle>
          <CardDescription>Manage your information and settings</CardDescription>
        </CardHeader>
        <CardContent className='mt-2 space-y-4'>
          {/* Profile Details */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
            <div>
              <p className='text-gray-700'>
                <span className='font-semibold'>Name:</span> John Doe
              </p>
              <p className='text-gray-700'>
                <span className='font-semibold'>Email:</span> john.doe@example.com
              </p>
              <p className='text-gray-700'>
                <span className='font-semibold'>Role:</span> User
              </p>
            </div>
            <Button variant='default' size='sm' className='mt-4 sm:mt-0'>
              Edit Profile
            </Button>
          </div>

          {/* Actions */}
          <div className='flex flex-wrap gap-2'>
            <Button variant='outline' size='sm'>
              Account Settings
            </Button>
            <Button variant='outline' size='sm'>
              Privacy Settings
            </Button>
            <Button variant='outline' size='sm'>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
