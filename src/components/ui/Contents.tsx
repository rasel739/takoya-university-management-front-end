import { Content } from 'antd/es/layout/layout';
import TUBreadCrumb from './TUBreadCrumb';
import Header from './Header';
import { getUserInfo } from '@/service/auth.service';

const Contents: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = getUserInfo() as { role: string };

  return (
    <Content style={{ minHeight: '100vh', color: 'black' }}>
      <Header />
      <TUBreadCrumb
        items={[
          {
            title: `${role.split('_').join(' ')}`,
            href: `/${role}`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
