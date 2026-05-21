import { useNavigate, useSearchParams } from 'react-router';
import '../App.css';
import useCheckboxStore from '../store/useCheckbox.tsx';

export interface CardProps {
  id: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: string;
  imageUrl: string;
}

const Card = ({
  id,
  imageUrl,
  name,
  species,
  status,
  gender,
  location,
}: CardProps) => {
  const selectedIds = useCheckboxStore((state) => state.selectedIds);
  const handleCheckboxChange = useCheckboxStore(
    (state) => state.handleCheckboxChange
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCardClick = () => {
    searchParams.set('details', id);
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="card-container">
      <input
        type="checkbox"
        className="checkbox"
        checked={selectedIds.includes(id)}
        onChange={() => handleCheckboxChange(id)}
        onClick={() => {}}
      />
      <div
        role="button"
        tabIndex={0}
        className="card"
        id={id}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p className="species">Species: {species}</p>
        <p>
          Status:{' '}
          <span className={`status-pill ${status.toLowerCase()}`}>
            {status}
          </span>
        </p>
        <p className={gender.toLowerCase()}> Gender: {gender}</p>
        <p>
          <b>Last location:</b> {location}
        </p>
      </div>
    </div>
  );
};

export default Card;
