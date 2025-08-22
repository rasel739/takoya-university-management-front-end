import { Icons } from '@/lib/icons';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const TUBreadCrumb = ({
  items,
}: {
  items: {
    title: string;
    href?: string;
  }[];
}) => {
  const pathname = usePathname();
  const breadCrumbItems = [
    {
      title: (
        <Link href='/'>
          <Icons.Home />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.href ? (
          <>
            <Link href={item.href}>{item.title}</Link>
            {`${pathname.split('/')[2] ? ' / ' : ''}`}
            <span>{pathname.split('/')[2]}</span>
          </>
        ) : (
          <span>{item.title}</span>
        ),
      };
    }),
  ];

  return <Breadcrumb items={breadCrumbItems} />;
};

export default TUBreadCrumb;
