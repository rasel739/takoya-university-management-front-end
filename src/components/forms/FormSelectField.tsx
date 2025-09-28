'use client';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
};

const FormSelectField = ({ name, options, label, handleChange }: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <div
            className='flex justify-center self-start pt-6 w-full'
            style={{
              all: 'revert',
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              paddingTop: '1.5rem',
              width: '100%',
              fontSize: '14px',
              lineHeight: '1.5',
              letterSpacing: 'normal',
            }}
          >
            <Select onValueChange={handleChange ? handleChange : onChange} value={value}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {options?.map((select) => (
                    <>
                      <SelectItem value={select.value}>{select.label}</SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />
    </>
  );
};

export default FormSelectField;
