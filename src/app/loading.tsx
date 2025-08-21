import { Row, Space, Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div>
      <Row justify='center' align='middle' style={{ height: '100vh', width: '100%' }}>
        <Space>
          <Spin tip='Loading' size='large' />
        </Space>
      </Row>
    </div>
  );
};

export default Loading;
