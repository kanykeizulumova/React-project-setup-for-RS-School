import React from 'react';
import './App.css';
import characters from './data/characters.ts';
import CardList from './Cardlist.tsx';
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

    if (trimmedQuery === appliedQuery && appliedQuery !== '') return;

    this.setState({ isLoading: true, error: null });

    setTimeout(() => {
      try {
        if (Math.random() > 0.8) {
          throw new Error(
            'The server is temporarily unavailable. Please try again later.'
          );
        }

        this.setState({
          appliedQuery: trimmedQuery,
          isLoading: false,
        });

        localStorage.setItem('searchQuery', trimmedQuery);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        this.setState({
          error: errorMessage,
          isLoading: false,
        });
        console.error('Search Error:', errorMessage);
      }
    }, 1000);
  };

  handleReset = () => {
    this.setState({
      searchQuery: '',
      appliedQuery: '',
    });
  };

  render() {
    const { searchQuery, appliedQuery, isLoading, error, shouldThrow } =
      this.state;

    if (shouldThrow) throw new Error('Critical failure!');

    const filteredCharacters = characters.filter((char) =>
      char.name.toLowerCase().includes(appliedQuery.toLowerCase())
    );

    let mainContent;
    if (error) {
      mainContent = <div className="error-msg">{error}</div>;
    } else if (isLoading) {
      mainContent = <div className="loader">Загрузка...</div>;
    } else {
      mainContent = <CardList items={filteredCharacters} />;
    }

    return (
      <div className="app-container">
        <header className="search-area">
          <SearchBar
            value={searchQuery}
            onChange={this.handleInputChange}
            onSearchClick={this.handleSearchSubmit}
            onReset={this.handleReset}
          />
        </header>

        <main className="result-area">{mainContent}</main>

        <button
          type="button"
          onClick={() => this.setState({ shouldThrow: true })}
        >
          Simulate Crash 💣
        </button>
      </div>
    );
  }
}

export default App;
