import * as yup from 'yup';

const schema = yup.object({
  fullName: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'The first letter must be uppercase'),
  age: yup
    .number()
    .positive('Возраст должен быть положительным числом')
    .integer()
    .required('Возраст обязателен'),

  email: yup
    .string()
    .email('Некорректный формат email')
    .required('Email обязателен'),

  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select a valid gender option')
    .required('Gender selection is required'),

  terms: yup.boolean(),

  image: yup.mixed(),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/\d/, 'Must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Повторите пароль'),

  country: yup.string(),
});

export default schema;
