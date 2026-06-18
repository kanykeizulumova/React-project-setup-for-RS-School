'use client';

import { NextIntlClientProvider, useTranslations } from 'next-intl';

import { Link } from './lib/navigation';

function NotFoundContent() {
  const t = useTranslations('NotFound');
  return (
    <div className="not-found">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link id="backtobtn" href="/">
        ⬅️
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <NextIntlClientProvider locale="en">
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}
