import { test, expect } from 'vitest';
import checkPasswordStrength from '../checkPasswordStrength';

test('Returns Too short for empty password', () => {
  const result = checkPasswordStrength('');
  expect(result.label).toBe('Too short');
  expect(result.score).toBe(0);
});

test('Returns Weak for simple passwords', () => {
  const result = checkPasswordStrength('abc');
  expect(result.label).toBe('Weak');
});

test('Returns Medium for medium complexity password', () => {
  const result = checkPasswordStrength('Password123');
  expect(result.label).toBe('Medium');
});

test('Returns Strong for complex password', () => {
  const result = checkPasswordStrength('StrongP@ss1!');
  expect(result.label).toBe('Strong');
  expect(result.score).toBe(5);
});
