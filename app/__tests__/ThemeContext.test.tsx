import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import { ThemeProvider, useTheme } from '../lib/ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

test('provides default theme and toggles it', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  const themeValue = screen.getByTestId('theme-value');
  const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });

  expect(themeValue).toHaveTextContent('dark');
  expect(document.documentElement.className).toBe('dark');

  await user.click(toggleBtn);
  expect(themeValue).toHaveTextContent('light');
  expect(document.documentElement.className).toBe('light');

  await user.click(toggleBtn);
  expect(themeValue).toHaveTextContent('dark');
});

test('throws error when useTheme is used outside of ThemeProvider', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  const TestComponentOutsideProvider = () => {
    useTheme();
    return null;
  };

  expect(() => render(<TestComponentOutsideProvider />)).toThrow(
    'useTheme must be used within a ThemeProvider'
  );

  consoleSpy.mockRestore();
});
