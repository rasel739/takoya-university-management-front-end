'use client';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

import { sidebaritems } from '@/constants/sidebaritems';
import { USER_ROLE } from '@/constants/role';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = USER_ROLE.STUDENT;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className='sidebar'
    >
      <div className='sidebar_title'>{collapsed ? 'TU' : <h1>Takoya University</h1>}</div>
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={sidebaritems(role)} />
    </Sider>
  );
};

export default SideBar;
