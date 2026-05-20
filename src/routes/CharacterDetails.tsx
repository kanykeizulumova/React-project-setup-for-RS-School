import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useCharacterStore from '../store/useCharacters';

export default function CharacterDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const character = useCharacterStore((state) => state.selectedCharacter);
  const isLoading = useCharacterStore((state) => state.isDetailsLoading);
  const loadData = useCharacterStore((state) => state.fetchCharacterDetails);
  const error = useCharacterStore((state) => state.detailsError);
  const clearSelectedCharacter = useCharacterStore(
    (state) => state.clearSelectedCharacter
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadData(id);
    }

    return () => {
      clearSelectedCharacter();
    };
  }, [id, loadData, clearSelectedCharacter]);

  const closeCharacter = () => {
    clearSelectedCharacter();
    navigate(`/?page=${page}&query=${query}`);
  };

  if (isLoading) return <div className="loader">Loading...</div>;
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
      <p>
        Status:{' '}
        <span className={`status-pill ${character.status.toLowerCase()}`}>
          {character.status}
        </span>
      </p>
      <h2>Location:</h2>
      <p>{character.location.name}</p>
      <h2>origin: </h2>
      <p>{character.origin.name}</p>
      <h2>Total episode count: </h2>
      <p>{character.episode.length}</p>
      <h3>URL: </h3>
      <a href={character.url} target="_blank" rel="noreferrer">
        {character.url}
      </a>
      <button className="close-btn" type="button" onClick={closeCharacter}>
        X
      </button>
    </div>
  );
}
