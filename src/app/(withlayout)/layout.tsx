'use client';
import AppSidebar from '@/components/ui/AppSidebar';
import Contents from '@/components/ui/Contents';
import Header from '@/components/ui/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { isLoggedIn } from '@/service/auth.service';
import { ThemeProvider } from 'next-themes';

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

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>
          <Header />
          <div>
            <Contents />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
