import React from 'react';
import './App.css';

export interface CardProps {
  id: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: string;
  imageUrl: string;
}

export class Card extends React.Component<CardProps> {
  render() {
    const { imageUrl, name, species, status, gender, location } = this.props;
    return (
      <div className="card">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>
          <b>Status:</b> {status} — {species}
        </p>
        <p>
          <b>Gender:</b> {gender}
        </p>
        <p>
          <b>Last location:</b> {location}
        </p>
      </div>
    );
  }
}

export default Card;
