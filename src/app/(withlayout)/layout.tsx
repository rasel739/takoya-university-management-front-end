import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/SideBar';

import { Layout } from 'antd';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
