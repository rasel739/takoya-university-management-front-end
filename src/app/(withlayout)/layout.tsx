'use client';
import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/SideBar';
import { isLoggedIn } from '@/service/auth.service';

import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../loading';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userIsLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userIsLoggedIn) {
      router.push('/login');
    }
    setIsLoading(true);
  }, [userIsLoggedIn, router]);

  if (!isLoading) {
    return <Loading />;
  }
  return (
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
