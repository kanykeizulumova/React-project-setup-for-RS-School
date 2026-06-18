'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from './navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button type="button" className="switch-btn" onClick={toggleLocale}>
      {locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}
