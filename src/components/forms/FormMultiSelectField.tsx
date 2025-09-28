'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: 'large' | 'small';
  value?: string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: string[];
};

export default function FormMultiSelectField({
  name,
  size = 'large',
  placeholder = 'Select...',
  options,
  label,
  defaultValue = [],
}: SelectFieldProps) {
  const { control } = useFormContext();

  return (
    <div className='w-full'>
      {label ? <label className='block text-sm font-medium mb-1'>{label}</label> : null}

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value = [], onChange } }) => {
          const selected: string[] = Array.isArray(value) ? value : value ? [value] : [];

          const toggle = (val: string) => {
            const exists = selected.includes(val);
            const next = exists ? selected.filter((v) => v !== val) : [...selected, val];
            onChange(next);
          };

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`w-full justify-between ${size === 'small' ? 'py-1' : 'py-2'}`}
                >
                  <div className='flex-1 text-left'>
                    {selected.length > 0 ? (
                      <div className='flex flex-wrap gap-1'>
                        {selected.map((val) => {
                          const opt = options.find((o) => o.value === val);
                          return (
                            <Badge key={val} variant='secondary' className='text-xs'>
                              {opt ? opt.label : val}
                            </Badge>
                          );
                        })}
                      </div>
                    ) : (
                      <span className='text-muted-foreground'>{placeholder}</span>
                    )}
                  </div>

                  <ChevronDown />
                </Button>
              </PopoverTrigger>

              <PopoverContent side='bottom' align='start' className='w-[260px] p-2'>
                <ScrollArea style={{ height: 200 }}>
                  <div className='space-y-2'>
                    {options.map((opt) => (
                      <label key={opt.value} className='flex items-center space-x-2'>
                        <Checkbox
                          checked={selected.includes(opt.value)}
                          onCheckedChange={() => toggle(opt.value)}
                        />
                        <span className='text-sm'>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
