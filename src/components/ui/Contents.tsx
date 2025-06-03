import { Content } from 'antd/es/layout/layout';

const Contents: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Content style={{ minHeight: '100vh', color: 'black' }}>{children}</Content>;
};

export default Contents;
