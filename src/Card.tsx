import React from 'react';
import './App.css';

interface CardProps {
  name: string;
  species: string;
  age: number;
  abilities: string[];
  imageUrl: string;
}

class Card extends React.Component<CardProps> {
  render() {
    const { imageUrl, name, species, age, abilities } = this.props;
    return (
      <div className="card">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>{species}</p>
        <p>{age}</p>
        <ul>
          {abilities.map((ability) => (
            <li key={`${name}-${ability}`}>{ability}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Card;
