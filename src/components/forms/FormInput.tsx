'use client';

import { Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

interface IInput {
  id?: string;
  name: string;
  label?: string;
  type: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  placeholder?: string;
  validation?: object;
  disabled?: boolean;
}

const FormInput = ({
  id,
  name,
  type,
  size,
  value,
  placeholder,
  label,
  validation,
  disabled,
}: IInput) => {
  const { control } = useForm();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            type={type}
            size={size}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
    </>
  );
};

export default FormInput;
