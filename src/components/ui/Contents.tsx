import { Content } from 'antd/es/layout/layout';
import TUBreadCrumb from './TUBreadCrumb';
import Header from './Header';
import { getUserInfo } from '@/service/auth.service';
import { usePathname } from 'next/navigation';

const Contents: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = getUserInfo() as { role: string };
  const pathname = usePathname();

  return (
    <Content style={{ minHeight: '100vh', color: 'black' }}>
      <Header />
      <TUBreadCrumb
        items={[
          {
            title: `${role?.split('_')?.join(' ')}`,
            href: `/${role}`,
          },
          {
            title: pathname.split('/')[2]
              ? `${pathname?.split('/')[2]?.split('-')?.join(' ')}`
              : '',
            href: pathname?.split('/')[3]
              ? `/${role}${pathname?.split('/')[3] ? '/' : ''}${pathname?.split('/')[2]}`
              : '',
          },
          {
            title: pathname.split('/')[3]
              ? `${pathname?.split('/')[3]?.split('-')?.join(' ')}`
              : '',
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
