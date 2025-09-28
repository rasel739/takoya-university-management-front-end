'use client';

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  Resolver,
} from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  children: React.ReactNode | React.ReactElement;
  submitHandler: SubmitHandler<T>;
  options?: UseFormProps<T>;
  resolver?: Resolver<T>;
  defaultValues?: import('react-hook-form').DefaultValues<T>;
};

const Form = <T extends FieldValues>({
  children,
  submitHandler,
  options,
  resolver,
  defaultValues,
}: FormProps<T>) => {
  const methods = useForm<T>({
    ...options,
    resolver,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler as SubmitHandler<FieldValues>)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
