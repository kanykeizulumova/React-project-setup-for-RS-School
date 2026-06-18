import { setRequestLocale } from 'next-intl/server';
import { Link, locales } from '../../lib/navigation';

export function generateStaticParams() {
  return locales.map((loc) => ({
    locale: loc,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="about-page">
      <p>This app was made by Kanykei Zulumova</p>

      <p>
        Other apps you can find in my{' '}
        <a
          href="https://github.com/kanykeizulumova"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>

      <p>
        This app is part of{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS School React course
        </a>
        .
      </p>

      <Link id="backtobtn" href="/">
        ⬅️ To main page
      </Link>
    </div>
  );
}
