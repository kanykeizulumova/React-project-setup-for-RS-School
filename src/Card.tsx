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
    const { id, imageUrl, name, status, gender, location, species } =
      this.props;
    return (
      <div className="card" data-id={id}>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p className="species">Species: {species}</p>
        <p className={status.toLowerCase()}> Status: {status}</p>
        <p className={gender.toLowerCase()}> Gender: {gender}</p>
        <p>
          <b>Last location:</b> {location}
        </p>
      </div>
    );
  }
}

export default Card;
