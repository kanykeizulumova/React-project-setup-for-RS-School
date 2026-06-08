import { test, expect, vi, afterEach } from 'vitest';
import schema from '../schema';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Rejects invalid name format', async () => {
  const invalidData = {
    fullName: 'john Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects negative age', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: -5,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects invalid email format', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'invalid-email',
    gender: 'male',
    terms: true,
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects invalid gender', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'other',
    terms: true,
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects password without uppercase letter', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'securepass123!',
    confirmPassword: 'securepass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects password without lowercase letter', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'SECUREPASS123!',
    confirmPassword: 'SECUREPASS123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects password without number', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'SecurePass!',
    confirmPassword: 'SecurePass!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects password without special character', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'SecurePass123',
    confirmPassword: 'SecurePass123',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects short password', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'Pass1!',
    confirmPassword: 'Pass1!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects mismatched passwords', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: true,
    password: 'SecurePass123!',
    confirmPassword: 'DifferentPass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});

test('Rejects when terms not accepted', async () => {
  const invalidData = {
    fullName: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    terms: false,
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    country: 'Kyrgyzstan',
  };

  await expect(
    schema.validate(invalidData, { abortEarly: false })
  ).rejects.toThrow();
});
