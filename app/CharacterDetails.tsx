import { useNavigate, useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchCharacter from './lib/fetchCharacterDetails';
import CACHE_TTL from '../config';

export default function CharacterDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['character', id],
    queryFn: fetchCharacter,
    enabled: !!id,
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
  });

  const closeCharacter = () => {
    navigate(`/?page=${page}&query=${query}`);
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error)
    return <div className="error-msg">{(error as Error)?.message}</div>;
  if (!data) return <div />;

  return (
    <div className="details">
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <h2>Species:</h2>
      <p>{data.species}</p>
      <h2>Gender:</h2>
      <p>{data.gender}</p>
      <p>
        Status:{' '}
        <span className={`status-pill ${data.status.toLowerCase()}`}>
          {data.status}
        </span>
      </p>
      <h2>Location:</h2>
      <p>{data.location.name}</p>
      <h2>origin: </h2>
      <p>{data.origin.name}</p>
      <h2>Total episode count: </h2>
      <p>{data.episode.length}</p>
      <h3>URL: </h3>
      <a href={data.url} target="_blank" rel="noreferrer">
        {data.url}
      </a>
      <button className="close-btn" type="button" onClick={closeCharacter}>
        X
      </button>
      <button
        className="refresh-button"
        type="button"
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ['character'] });
        }}
      >
        Refresh
      </button>
    </div>
  );
}
