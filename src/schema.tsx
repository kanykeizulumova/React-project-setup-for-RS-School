import * as yup from 'yup';
import useCountryStore from './store/useCountryStore';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

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
      .defined()
      .required('Email is required')
      .test('custom-email-validation', 'Incorrect email format', (value) => {
        if (!value) return false;

        const parts = value.split('@');
        if (parts.length !== 2) return false;

        const localPart = parts[0];
        const domainPart = parts[1];

        if (localPart.trim().length === 0) return false;

        if (!domainPart.includes('.')) return false;

        const domainSubParts = domainPart.split('.');
        return domainSubParts.every((subPart) => subPart.trim().length > 0);
      }),

    gender: yup
      .string<'male' | 'female'>()
      .oneOf(['male', 'female'], 'Please select a valid gender option')
      .defined()
      .required('Gender selection is required'),

    terms: yup.boolean().defined().required(),

    image: yup
      .mixed()
      .required('An image is required')
      .test(
        'fileRequired',
        'Please upload your photo',
        (value) => value instanceof FileList && value.length > 0
      )
      .test('fileSize', 'File size is too large (max 2MB)', (value) => {
        if (!(value instanceof FileList) || value.length === 0) return false;
        const file = value[0];
        return file.size <= MAX_FILE_SIZE;
      })
      .test(
        'fileType',
        'Unsupported file format (allowed JPEG, PNG)',
        (value) => {
          if (!(value instanceof FileList) || value.length === 0) return false;
          const file = value[0];
          return SUPPORTED_FORMATS.includes(file.type);
        }
      ),

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
      .required('Repeat password')
      .test('passwords-match', 'Password must match', function (value) {
        if (!value) return true;

        return value === this.parent.password;
      }),

    country: yup
      .string()
      .defined()
      .required()
      .test(
        'valid-country',
        'Please select a country from the list',
        (value) => {
          const { countries } = useCountryStore.getState();
          return countries.some((c) => c.name === value);
        }
      ),
  })
  .required();

export default schema;
