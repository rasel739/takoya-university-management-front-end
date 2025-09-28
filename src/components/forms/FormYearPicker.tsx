'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

type FormYearPickerProps = {
  name: string;
  label?: string;
  picker: 'year' | 'time';
  defaultValue?: string;
};

export default function FormYearPicker({ name, label, picker, defaultValue }: FormYearPickerProps) {
  const { control } = useFormContext();
  const currentYear = dayjs().year();

  return (
    <div className='w-full'>
      {label ? <label className='mb-1 text-sm font-medium'>{label}</label> : null}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
        render={({ field }) => {
          const value = field.value ?? '';

          if (picker === 'year') {
            // show a number input for year selection
            const numeric = value ? String(value) : '';

            return (
              <Input
                type='number'
                min={1900}
                max={currentYear + 10}
                value={numeric}
                onChange={(e) => {
                  const v = e.target.value;
                  // keep it as string year (e.g. '2025')
                  field.onChange(v === '' ? '' : v);
                }}
                placeholder='YYYY'
                style={{ width: '100%' }}
              />
            );
          }

          // fallback/time picker
          return (
            <div className='relative'>
              <Input
                type='time'
                value={value}
                onChange={(e) => field.onChange(e.target.value)}
                className='pr-10'
              />
              <Button
                variant='ghost'
                size='icon'
                aria-label='time-icon'
                className='absolute right-1 top-1/2 -translate-y-1/2 p-1'
                onClick={() => {
                  const el = document.querySelector(
                    `input[name=\"${name}\"]`
                  ) as HTMLInputElement | null;
                  el?.focus();
                }}
              >
                <Calendar className='h-4 w-4' />
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
