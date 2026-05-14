import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function CharacterDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          navigate('/404');
          return;
        }
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
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData, id]);

  const closeCharacter = () => {
    setCharacter(null);
    navigate(`/?page=${page}&query=${query}`);
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!character) return <div />;
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
      <h2>origin: </h2>
      <p>{character.origin.name}</p>
      <h2>Total episode count: </h2>
      <p>{character.episode.length}</p>
      <h3>URL: </h3>
      <p>{character.url}</p>
      <button className="close-btn" type="button" onClick={closeCharacter}>
        X
      </button>
    </div>
  );
}
