'use client';

import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

type UMDatePickerProps = {
  onChange?: (date: Date | null, monthIso: string | null) => void;
  name: string;
  label?: string;
  value?: Date | null;
  size?: 'large' | 'small';
};

export default function FormDatePicker({
  name,
  label,
  onChange,
  size = 'large',
}: UMDatePickerProps) {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full'>
      {label ? <label className='block text-sm font-medium mb-1'>{label}</label> : null}

      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => {
          const selectedDate: Date | null = field.value ?? null;
          const display = selectedDate ? format(selectedDate, 'yyyy-MM') : '';

          const handleSelect = (date: Date | undefined) => {
            const d = date ?? null;
            setValue(name, d, { shouldValidate: true, shouldDirty: true });
            onChange?.(d, d ? format(d, 'yyyy-MM') : null);
            setOpen(false);
          };

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`w-full justify-between ${size === 'small' ? 'py-1' : 'py-2'}`}
                >
                  <div className='flex-1 text-left'>
                    <Input
                      readOnly
                      value={display}
                      placeholder='Select month (YYYY-MM)'
                      onClick={() => setOpen(true)}
                      className='pointer-events-none bg-transparent border-0 p-0'
                    />
                  </div>
                  <CalendarIcon className='ml-2' />
                </Button>
              </PopoverTrigger>

              <PopoverContent side='bottom' align='start' className='w-auto p-2'>
                <Calendar
                  mode='single'
                  selected={selectedDate ?? undefined}
                  onSelect={handleSelect}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
