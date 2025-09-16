'use client';
import { isLoggedIn } from '@/service/auth.service';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push('/login');
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
