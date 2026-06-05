import * as yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

const schema = yup
  .object({
    fullName: yup
      .string()
      .defined()
      .required('Name is required')
      .matches(/^[A-Z]/, 'The first letter must be uppercase'),
    age: yup
      .number()
      .positive('Age must be a positive number')
      .integer()
      .defined()
      .required('Age is required'),

    email: yup
      .string()
      .email('Incorrect email format')
      .defined()
      .required('Email is required'),

    gender: yup
      .string<'male' | 'female'>()
      .oneOf(['male', 'female'], 'Please select a valid gender option')
      .defined()
      .required('Gender selection is required'),

    terms: yup.boolean().defined().required(),

    image: yup
      .mixed<File>()

      .test(
        'fileSize',
        'File size is too large (max 2MB)',
        (value) => value && value.size <= MAX_FILE_SIZE
      )

      .test(
        'fileType',
        'Unsupported file format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      )
      .defined()
      .required('An image is required'),

    password: yup
      .string()
      .min(8, 'Must be at least 8 characters')
      .matches(/[a-z]/, 'Must contain a lowercase letter')
      .matches(/[A-Z]/, 'Must contain an uppercase letter')
      .matches(/\d/, 'Must contain a number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character')
      .defined()
      .required('Password is required'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password must match')
      .defined()
      .nonNullable()
      .required('Repeat password'),

    country: yup.string().defined().required(),
  })
  .required();

export default schema;
