const fetchAllCharacters = async ({
  queryKey,
}: {
  queryKey: [string, string, number];
}) => {
  const [, name, pageNumber] = queryKey;
  const trimmedName = name.trim();

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${trimmedName}&page=${pageNumber}`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default fetchAllCharacters;
