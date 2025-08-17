'use client';

import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  children: React.ReactNode | React.ReactElement;
  submitHandler: SubmitHandler<T>;
  options?: UseFormProps<T>;
};

const Form = <T extends FieldValues>({ children, submitHandler, options }: FormProps<T>) => {
  const methods = useForm<T>(options);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
