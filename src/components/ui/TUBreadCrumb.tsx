import { Icons } from '@/lib/icons';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';

const TUBreadCrumb = ({
  items,
}: {
  items: {
    title: string;
    href?: string;
  }[];
}) => {
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
        title: item.href ? <Link href={item.href}>{item.title}</Link> : <span>{item.title}</span>,
      };
    }),
  ];

  return <Breadcrumb items={breadCrumbItems} />;
};

export default TUBreadCrumb;
