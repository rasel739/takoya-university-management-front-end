'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

type FormTimePickerProps = {
  name: string;
  label?: string;
  index?: number;
  defaultValue?: string; // expected format: "HH:mm"
};

export default function FormTimePicker({ name, label, defaultValue = '' }: FormTimePickerProps) {
  const { control } = useFormContext();

  return (
    <div className='w-full'>
      {label ? <label className='mb-1 text-sm font-medium'>{label}</label> : null}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          // field.value is expected to be a string in "HH:mm" format or empty
          const value = field.value ?? '';

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
                  // focus the input when the icon/button is clicked
                  const el = document.querySelector(
                    `input[name=\"${name}\"]`
                  ) as HTMLInputElement | null;
                  el?.focus();
                }}
              >
                <Clock className='h-4 w-4' />
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
