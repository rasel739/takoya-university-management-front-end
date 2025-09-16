import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='not_found'>
      <div className='not_found_text'>
        <h1>404!</h1>
        <h2>Not Found</h2>
      </div>
      <div>
        <Link href='/'>
          <Button>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
