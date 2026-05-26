export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
  origin: { name: string; url: string };
  episode: string[];
  url: string;
}

const fetchSelectedCharacters = async ({
  queryKey,
}: {
  queryKey: [string, string[]];
}): Promise<Character[]> => {
  const [, ids] = queryKey;
  if (ids.length === 0) return [];

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(',')}`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};

export default fetchSelectedCharacters;
