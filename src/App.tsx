import React from 'react';
import './App.css';
import characters from './data/characters.ts';
import Card from './Card.tsx';
import SearchBar from './Searchbar.tsx';

interface AppState {
  searchQuery: string;
  appliedQuery: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      appliedQuery: localStorage.getItem('appliedQuery') || '',
    };
  }

  handleInputChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  handleSearchSubmit = () => {
    const { searchQuery } = this.state;
    this.setState({ appliedQuery: searchQuery });
  };

  handleReset = () => {
    this.setState({
      searchQuery: '',
      appliedQuery: '',
    });
  };

  render() {
    const { searchQuery, appliedQuery } = this.state;

    const filteredCharacters = characters.filter((char) =>
      char.name.toLowerCase().includes(appliedQuery.toLowerCase())
    );

    return (
      <div>
        <div className="search-area">
          <SearchBar
            value={searchQuery}
            onChange={this.handleInputChange}
            onSearchClick={this.handleSearchSubmit}
            onHandleClick={this.handleReset}
          />
        </div>
        <div className="result-area">
          {filteredCharacters.length === 0 ? (
            <p>No results found for &apos;{searchQuery}&apos;</p>
          ) : (
            filteredCharacters.map((char) => (
              <Card
                key={char.id}
                name={char.name}
                species={char.species}
                age={char.age}
                abilities={char.abilities}
                imageUrl={char.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
