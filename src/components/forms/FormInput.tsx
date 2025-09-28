'use client';

import { getErrorMessageByPropertyName } from '@/utils/schema-validator';

import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Icons } from '@/lib/icons';
interface IInput {
  name: string;
  type?: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
}

const FormInput = ({ name, type, value, placeholder, label, required }: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? label : null}
      {required ? <span className='text-red-500 ml-0.5'>*</span> : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === 'password' ? (
            <div className='relative'>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
              {passwordVisible ? (
                <Icons.EyeOff
                  className='absolute right-3 top-2 cursor-pointer'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <Icons.Eye
                  className='absolute right-3 top-2 cursor-pointer'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </div>
          ) : (
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
      <small className='text-red-500'>{errorMessage}</small>
    </>
  );
};

export default FormInput;
