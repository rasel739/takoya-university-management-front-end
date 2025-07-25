'use client';
// import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from 'react-hook-form';

// type FormConfig = {
//   defaultValue?: Record<string, any>;
// };

// type FormProps = {
//   children: React.ReactNode | React.ReactElement;
//   submitHandler: SubmitHandler<any>;
// } & FormConfig;

// const Form = ({ children, submitHandler, defaultValue }: FormProps) => {
//   const formConfig: FormConfig = {};
//   const methods = useForm<FormProps>(formConfig);

//   const { handleSubmit, reset } = methods;
//   const onSubmit = (data: any) => {
//     submitHandler(data);
//     reset(); // Reset the form after submission
//   };

//   if (!!defaultValue) formConfig['defaultValue'] = defaultValue;

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {children}
//         <input type='submit' value='Submit' />
//       </form>
//     </FormProvider>
//   );
// };

// export default Form;

type FormProps<T extends FieldValues> = {
  children: React.ReactNode | React.ReactElement;
  onSubmit: SubmitHandler<T>;
  options?: UseFormProps<T>;
};

const Form = <T extends FieldValues>({ children, onSubmit, options }: FormProps<T>) => {
  const methods = useForm<T>(options);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
