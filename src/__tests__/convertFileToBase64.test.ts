import { test, expect } from 'vitest';
import convertFileToBase64 from '../hooks/convertFileToBase64';

test('Converts file to base64 string', async () => {
  const fileContent = 'Hello, World!';
  const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

  const result = await convertFileToBase64(file);

  expect(result).toContain('data:text/plain');
  expect(typeof result).toBe('string');
});

test('Returns different base64 for different files', async () => {
  const file1 = new File(['Content 1'], 'file1.txt', { type: 'text/plain' });
  const file2 = new File(['Content 2'], 'file2.txt', { type: 'text/plain' });

  const result1 = await convertFileToBase64(file1);
  const result2 = await convertFileToBase64(file2);

  expect(result1).not.toBe(result2);
});

test('Handles empty file', async () => {
  const file = new File([], 'empty.txt', { type: 'text/plain' });

  const result = await convertFileToBase64(file);

  expect(result).toContain('data:text/plain');
  expect(typeof result).toBe('string');
});
