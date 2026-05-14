import '../App.css';

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
}: CardProps) => (
  <div className="card" id={id}>
    <img src={imageUrl} alt={name} />
    <h3>{name}</h3>
    <p className="species">Species: {species}</p>
    <p>
      Status:{' '}
      <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>
    </p>
    <p className={gender.toLowerCase()}> Gender: {gender}</p>
    <p>
      <b>Last location:</b> {location}
    </p>
  </div>
);

export default Card;
