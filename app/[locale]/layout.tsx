import type { Metadata } from 'next';
import '../ui/App.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '../lib/navigation';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'My React App',
  description: 'My App is a RS School project',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
