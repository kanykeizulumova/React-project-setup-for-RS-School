import { Link, useSearchParams } from 'react-router';
import Card from './Card.tsx';
import type { CardProps } from './Card.tsx';

interface CardListProps {
  items: CardProps[];
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  totalPages: number;
}

const CardList = ({
  items,
  onNext,
  onPrev,
  currentPage,
  totalPages,
}: CardListProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  if (items.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <div className="card-list">
        {items.map((char) => (
          <Link
            to={`/?page=${page}&query=${query}&details=${char.id}`}
            key={char.id}
          >
            <Card
              id={char.id}
              name={char.name}
              species={char.species}
              status={char.status}
              gender={char.gender}
              location={char.location}
              imageUrl={char.imageUrl}
            />
          </Link>
        ))}
      </div>
      <div className="pagination-controls">
        <button type="button" onClick={onPrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardList;
