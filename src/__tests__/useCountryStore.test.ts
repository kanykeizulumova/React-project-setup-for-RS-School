import { test, expect, afterEach } from 'vitest';
import useCountryStore from '../store/useCountryStore';

afterEach(() => {
  useCountryStore.setState({
    countries: useCountryStore.getInitialState().countries,
  });
});

test('Countries list is populated', () => {
  const { countries } = useCountryStore.getState();

  expect(countries).toBeDefined();
  expect(countries.length).toBeGreaterThan(0);
});

test('Contains Kyrgyzstan', () => {
  const { countries } = useCountryStore.getState();

  const Kyrgyzstan = countries.find((c) => c.name === 'Kyrgyzstan');
  expect(Kyrgyzstan).toBeDefined();
  expect(Kyrgyzstan?.code).toBe('KG');
});

test('Contains multiple countries', () => {
  const { countries } = useCountryStore.getState();

  const requiredCountries = ['Kyrgyzstan', 'Canada', 'Australia'];
  requiredCountries.forEach((country) => {
    expect(countries.some((c) => c.name === country)).toBe(true);
  });
});
