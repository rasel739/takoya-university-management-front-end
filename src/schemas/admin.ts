import * as yup from 'yup';

export const adminSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters')
    .required('Password is required'),
  file: yup.mixed().required('Profile image is required'),
  admin: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required('First name is required'),
      middleName: yup.string().optional(),
      lastName: yup.string().required('Last name is required'),
    }),
    email: yup.string().email('Invalid email').required('Email is required'),
    contactNo: yup.string().optional(),
    emergencyContactNo: yup.string().optional(),
    designation: yup.string().required('Designation is required'),
    dateOfBirth: yup.string().required('Date of Birth is required'),
    bloodGroup: yup.string().optional(),
    gender: yup.string().optional(),
    managementDepartment: yup.string().optional(),
    presentAddress: yup.string().optional(),
    permanentAddress: yup.string().optional(),
  }),
});
