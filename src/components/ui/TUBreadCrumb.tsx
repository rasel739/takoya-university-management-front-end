'use client';

import Link from 'next/link';
import { Icons } from '@/lib/icons';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface TUBreadCrumbProps {
  items: BreadcrumbItem[];
}

const TUBreadCrumb: React.FC<TUBreadCrumbProps> = ({ items }) => {
  const allItems = [
    {
      title: <Icons.Home className='w-4 h-4 inline-block mr-1' />,
      href: '/',
    },
    ...items,
  ];

  return (
    <nav className='text-sm text-gray-500 pl-4' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        {allItems.map((item, index) => (
          <li key={index} className='inline-flex items-center'>
            {index > 0 && <span className='mx-1 text-gray-400 select-none'>{'>'}</span>}
            {item.href ? (
              <Link href={item.href} className='hover:text-primary transition-colors'>
                {item.title}
              </Link>
            ) : (
              <span className='text-gray-500'>{item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TUBreadCrumb;
