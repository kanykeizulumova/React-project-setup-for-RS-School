import React from 'react';
import './App.css';
import characters from './data/characters.ts';
import Card from './Card.tsx';
import SearchBar from './Searchbar.tsx';

interface AppState {
  searchQuery: string;
  appliedQuery: string;
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      appliedQuery: localStorage.getItem('appliedQuery') || '',
      isLoading: false,
      error: null,
      shouldThrow: false,
    };
  }

  componentDidMount() {
    this.handleSearchSubmit();
  }

  handleInputChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  handleSearchSubmit = () => {
    const { searchQuery, appliedQuery } = this.state;
    const trimmedQuery = searchQuery.trim();

    this.setState({ isLoading: true });
    setTimeout(() => {
      if (trimmedQuery !== appliedQuery) {
        this.setState({
          appliedQuery: trimmedQuery,
          isLoading: false,
        });
        localStorage.setItem('searchQuery', trimmedQuery);
      } else {
        this.setState({ isLoading: false });
      }
    }, 1500);
  };

  handleReset = () => {
    this.setState({
      searchQuery: '',
      appliedQuery: '',
    });
  };

  render() {
    const { searchQuery, appliedQuery, error, isLoading, shouldThrow } =
      this.state;

    const filteredCharacters = characters.filter((char) =>
      char.name.toLowerCase().includes(appliedQuery.toLowerCase())
    );

    if (shouldThrow) {
      throw new Error('Test Crash!');
    }

    let resultsContent;

    if (error) {
      resultsContent = (
        <div className="error-message">
          <h2>Oops, something went wrong! 😭</h2>
          <p>{error}</p>
        </div>
      );
    } else if (isLoading) {
      resultsContent = <div className="spinner">Загрузка...</div>;
    } else {
      resultsContent = (
        <div>
          <div className="results-list">
            {filteredCharacters.length === 0 ? (
              <p>
                No results found for &apos;
                {searchQuery}
                &apos;
              </p>
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
          <div className="error-btn">
            <button
              type="button"
              onClick={() => this.setState({ shouldThrow: true })}
              style={{ marginTop: '20px' }}
            >
              Simulate Crash 💣
            </button>
          </div>
        </div>
      );
    }

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

        <div className="result-area">{resultsContent}</div>
      </div>
    );
  }
}

export default App;
