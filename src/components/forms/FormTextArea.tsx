'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  className?: string;
};

export default function FormTextArea({
  name,
  label,
  rows = 4,
  value,
  placeholder,
  className = '',
}: TextAreaProps) {
  const { control } = useFormContext();

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label ? <label className='mb-1 text-sm font-medium'>{label}</label> : null}

      <Controller
        name={name}
        control={control}
        defaultValue={value ?? ''}
        render={({ field }) => <Textarea {...field} rows={rows} placeholder={placeholder} />}
      />
    </div>
  );
}
