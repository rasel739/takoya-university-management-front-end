'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from './shadcn-io/spinner';

export type Column<T> = {
  title: string | React.ReactNode;
  key: string;
  dataIndex?: keyof T;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
};

export type UMTableProps<T> = {
  loading?: boolean;
  columns: Column<T>[];
  dataSource?: T[];
  pageSize?: number;
  totalRecords?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (sortColumn?: string, sortOrder?: 'asc' | 'desc') => void;
  showPagination?: boolean;
};

const UMTable = <T extends Record<string, never>>({
  loading = false,
  columns,
  dataSource,
  pageSize = 10,
  totalRecords,
  showSizeChanger = true,
  onPaginationChange,
  showPagination = true,
}: UMTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const total = totalRecords ?? dataSource?.length;
  const totalPages = Math.ceil((total as number) / currentPageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPaginationChange?.(page, currentPageSize);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    setCurrentPageSize(size);
    setCurrentPage(1);
    onPaginationChange?.(1, size);
  };

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * currentPageSize;
    return dataSource?.slice(start, start + currentPageSize);
  }, [currentPage, currentPageSize, dataSource]);

  return (
    <div className='w-full overflow-x-auto'>
      {loading && (
        <div className='flex justify-center py-6'>
          <Spinner className='w-8 h-8 text-primary' />
        </div>
      )}

      <table className='min-w-full border border-gray-200 divide-y divide-gray-200 table-auto'>
        <thead className='bg-gray-50'>
          <tr>
            {columns?.map((col) => (
              <th
                key={col.key + 45}
                className='px-4 py-2 text-left text-sm font-medium text-gray-700'
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {paginatedData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((col) => (
                <td key={col.key} className='px-4 py-2 text-sm text-gray-600'>
                  {col.render
                    ? col.render(row[col.dataIndex as keyof T], row, rowIndex)
                    : col.dataIndex
                    ? row[col.dataIndex]
                    : null}
                </td>
              ))}
            </tr>
          ))}
          {paginatedData?.length === 0 && (
            <tr>
              <td colSpan={columns.length} className='px-4 py-6 text-center text-gray-400'>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPagination && totalPages > 1 && (
        <div className='flex flex-col sm:flex-row items-center justify-between mt-4 gap-2'>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size='sm'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          {showSizeChanger && (
            <div className='flex items-center gap-2'>
              <span>Rows per page:</span>
              <select
                value={currentPageSize}
                onChange={handlePageSizeChange}
                className='border border-gray-300 rounded-md px-2 py-1 text-sm'
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UMTable;
