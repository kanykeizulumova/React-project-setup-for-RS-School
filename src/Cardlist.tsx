import React from 'react';
import { Card } from './Card.tsx';
import type { CardProps } from './Card.tsx';

interface CardListProps {
  items: CardProps[];
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  totalPages: number;
}

class CardList extends React.Component<CardListProps> {
  render() {
    const { items, onNext, onPrev, currentPage, totalPages } = this.props;

    if (items.length === 0) {
      return <p>No results found.</p>;
    }

    return (
      <div>
        <div className="card-list">
          {items.map((char) => (
            <Card
              key={char.id}
              id={char.id}
              name={char.name}
              species={char.species}
              status={char.status}
              gender={char.gender}
              location={char.location}
              imageUrl={char.imageUrl}
            />
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
  }
}

export default CardList;
