'use client';

import { Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

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
  const { control } = useFormContext();
  return (
    <>
      <div style={{ marginBottom: '10px' }}>{label && <label htmlFor={id}>{label}</label>}</div>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) =>
          type === 'password' ? (
            <Input.Password
              type={type}
              size={size}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              value={value ?? field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              value={value ?? field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
