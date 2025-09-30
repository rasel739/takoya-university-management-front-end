'use client';

import React, { useMemo } from 'react';
import TUBreadCrumb from './TUBreadCrumb';
import { getUserInfo } from '@/service/auth.service';
import { usePathname } from 'next/navigation';

type User = {
  id: string;
  name: string;
  role?: string;
};

function formatSegment(seg?: string) {
  if (!seg) return '';
  try {
    const decoded = decodeURIComponent(seg);
    return decoded.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

const Contents = () => {
  const user = (typeof window !== 'undefined' && getUserInfo && getUserInfo()) || {};
  const roleRaw = (user as User)?.role ?? '';
  const pathname = usePathname() ?? '/';

  const crumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const items: { title: string; href?: string }[] = [];

    if (roleRaw) {
      if (segments[0] === roleRaw) {
        items.push({ title: formatSegment(roleRaw), href: `/${roleRaw}` });
      } else {
        items.push({ title: formatSegment(roleRaw), href: `/${roleRaw}` });
      }
    }

    const startIndex = segments[0] === roleRaw ? 1 : 0;

    for (let i = startIndex; i < segments.length; i++) {
      const segTitle = formatSegment(segments[i]);
      const pathParts = segments.slice(startIndex, i + 1);
      const href = roleRaw ? `/${roleRaw}/${pathParts.join('/')}` : `/${pathParts.join('/')}`;
      items.push({ title: segTitle, href });
    }

    return items;
  }, [pathname, roleRaw]);

  return <TUBreadCrumb items={crumbs} />;
};

export default Contents;
