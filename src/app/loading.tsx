import { Flex, Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div>
      <Flex justify='center' align='center' style={{ height: '100vh', width: '100%' }}>
        <Spin size='large' />
      </Flex>
    </div>
  );
};

export default Loading;
