import React from 'react';
import { Card } from './Card.tsx';
import type { CardProps } from './Card.tsx';

interface CardListProps {
  items: CardProps[];
}

class CardList extends React.Component<CardListProps> {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return <p>No results found.</p>;
    }

    return (
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
    );
  }
}

export default CardList;
