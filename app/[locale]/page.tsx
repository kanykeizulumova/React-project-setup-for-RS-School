import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { setRequestLocale } from 'next-intl/server';
import fetchAllCharacters from '../lib/fetchAllCharacters';
import App from './App';
import { locales } from '../lib/navigation';

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

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['characters', '', 1],
    queryFn: () =>
      fetchAllCharacters({
        queryKey: ['characters', '', 1],
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <App />
    </HydrationBoundary>
  );
}
