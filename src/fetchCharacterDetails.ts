import { FetchError } from './FetchError';

const fetchCharacterDetails = async ({
  queryKey,
}: {
  queryKey: [string, string | null];
}) => {
  const [, id] = queryKey;

  if (!id) return null;

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) {
    throw new FetchError('Network response was not ok', res.status);
  }
  return res.json();
};

export default fetchCharacterDetails;
