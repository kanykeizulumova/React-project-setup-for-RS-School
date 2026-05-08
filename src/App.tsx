import React from 'react';
import './App.css';
import CardList from './Cardlist.tsx';
import SearchBar from './Searchbar.tsx';

interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
}

interface AppState {
  searchQuery: string;
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      characters: [],
      isLoading: false,
      error: null,
      shouldThrow: false,
    };
  }

  componentDidMount() {
    const { searchQuery } = this.state;
    this.fetchData(searchQuery);
  }

  fetchData = async (name: string) => {
    this.setState({ isLoading: true, error: null });
    const trimmedName = name.trim();

    try {
      localStorage.setItem('searchQuery', trimmedName);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${trimmedName}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          this.setState({ characters: [], isLoading: false });
          return;
        }
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      this.setState({
        characters: data.results,
        isLoading: false,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      this.setState({
        error: errorMessage,
        isLoading: false,
      });
      // eslint-disable-next-line no-console
      console.error('Fetch Error:', errorMessage);
    }
  };

  handleInputChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  handleSearchSubmit = () => {
    const { searchQuery } = this.state;
    this.fetchData(searchQuery);
  };

  handleReset = () => {
    this.setState({ searchQuery: '' }, () => this.fetchData(''));
  };

  render() {
    const { searchQuery, characters, isLoading, error, shouldThrow } =
      this.state;

    if (shouldThrow) throw new Error('Critical failure!');

    let mainContent;
    if (error) {
      mainContent = <div className="error-msg">{error}</div>;
    } else if (isLoading) {
      mainContent = <div className="loader">Загрузка...</div>;
    } else if (characters.length === 0) {
      mainContent = <p>Ничего не найдено</p>;
    } else {
      const mappedItems = characters.map((c) => ({
        id: String(c.id),
        name: c.name,
        species: c.species,
        gender: c.gender,
        status: c.status,
        location: c.location.name,
        imageUrl: c.image,
      }));
      mainContent = <CardList items={mappedItems} />;
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
          className="crash-button"
          onClick={() => this.setState({ shouldThrow: true })}
        >
          Simulate Crash 💣
        </button>
      </div>
    );
  }
}

export default App;
