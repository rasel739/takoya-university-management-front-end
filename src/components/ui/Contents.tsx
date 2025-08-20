import { Content } from 'antd/es/layout/layout';
import TUBreadCrumb from './TUBreadCrumb';

const Contents: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const base = 'admin';

  return (
    <Content style={{ minHeight: '100vh', color: 'black' }}>
      <TUBreadCrumb
        items={[
          {
            title: `${base}`,
            href: `/${base}`,
          },
          {
            title: `${base}`,
            href: `/${base}/student`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
