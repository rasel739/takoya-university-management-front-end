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
};

const Form = <T extends FieldValues>({
  children,
  submitHandler,
  options,
  resolver,
}: FormProps<T>) => {
  const methods = useForm<T>({ ...options, resolver });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
