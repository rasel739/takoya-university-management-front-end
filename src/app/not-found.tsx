import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
const NotFoundPage = () => {
  return (
    <div className='not_found'>
      <div className='not_found_text'>
        <h1>404!</h1>
        <h2>Not Found</h2>
      </div>
      <div>
        <Link href='/'>
          <Button type='primary' size='large'>
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
