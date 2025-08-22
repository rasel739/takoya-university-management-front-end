import { Layout, Menu, Dropdown, MenuProps, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Icons } from '@/lib/icons';
import { getUserInfo, removeUserInfo } from '@/service/auth.service';
import { authKey } from '@/constants/storageKey';
import { useRouter } from 'next/navigation';
import { toastifyMessage, TuToastify } from '@/lib/reactToastify';

const { Header: AntHeader } = Layout;

const navItems = [
  {
    key: '1',
    label: 'Dashboard',
  },
  {
    key: '2',
    label: 'Students',
  },
  {
    key: '3',
    label: 'Courses',
  },
  {
    key: '4',
    label: 'Settings',
  },
];

const Headers = () => {
  const router = useRouter();
  const { role } = getUserInfo() as { role: string };

  const handleLogout = () => {
    removeUserInfo(authKey);
    TuToastify(toastifyMessage.logoutSuccess, 'success');
    router.push('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
    },
    {
      key: '3',
      label: 'Billing',
    },
    {
      key: '4',
      label: (
        <Button onClick={handleLogout} type='text' danger icon={<Icons.Logout />}>
          LogOut
        </Button>
      ),
    },
  ];
  return (
    <div>
      {' '}
      <AntHeader style={{ display: 'flex', alignItems: 'center' }}>
        <div className='demo-logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          items={navItems}
          style={{ flex: 1, minWidth: 0 }}
        />
        <span style={{ color: 'white' }}>{role}</span>
        <Dropdown menu={{ items }}>
          <Avatar size={50} icon={<UserOutlined />} />
        </Dropdown>
      </AntHeader>
    </div>
  );
};

export default Headers;
