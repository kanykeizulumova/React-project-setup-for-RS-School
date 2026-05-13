import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function CharacterDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setCharacter(data);
      setIsLoading(false);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setError(errorMessage);
      // eslint-disable-next-line no-console
      console.error('Fetch Error:', errorMessage);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!character) return <div>Выберите персонажа</div>;
  return (
    <div className="details">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <h2>Species:</h2>
      <p>{character.species}</p>
      <h2>Gender:</h2>
      <p>{character.gender}</p>
      <h2>Status:</h2>
      <p>{character.status}</p>
      <h2>Location:</h2>
      <p>{character.location.name}</p>
      <p>origin: {character.origin.name}</p>
      <p>Total episode count: {character.episode.length}</p>
      <p>url: {character.url}</p>
    </div>
  );
}
