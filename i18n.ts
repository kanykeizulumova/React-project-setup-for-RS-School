import { getRequestConfig } from 'next-intl/server';
import { locales, Locale } from './app/lib/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  const isValidLocale = (value: string | undefined): value is Locale =>
    !!value && locales.includes(value as Locale);

  if (!isValidLocale(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
