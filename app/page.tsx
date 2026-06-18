import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import fetchAllCharacters from './lib/fetchAllCharacters';
import App from './App';

export default async function Page() {
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
