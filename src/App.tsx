import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, Outlet } from 'react-router';
import './App.css';
import CardList from './components/Cardlist.tsx';
import SearchBar from './components/Searchbar.tsx';
import useLocalStorage from './hooks/useLocalStorage.tsx';

interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
}

const App = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const id = searchParams.get('details');

  const fetchData = useCallback(async (name: string, pageNumber = 1) => {
    setIsLoading(true);
    setError(null);

    const trimmedName = name.trim();

    try {
      localStorage.setItem('searchQuery', trimmedName);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${trimmedName}&page=${pageNumber}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setCharacters([]);
          setIsLoading(false);
          return;
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setCharacters(data.results);
      setIsLoading(false);
      setTotalPages(data.info.pages);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.error('Fetch Error:', errorMessage);
    }
  }, []);

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams(
        (prev) => {
          prev.set('page', '1');
          return prev;
        },
        { replace: true }
      );
    }
    if (!query && searchQuery !== '') {
      setSearchParams({ query: searchQuery, page });
    }
  }, [query, page, searchQuery, setSearchParams, searchParams]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(query, Number(page));
  }, [query, page, fetchData]);

  const goToNextPage = () => {
    if (Number(page) < totalPages) {
      const next = Number(page) + 1;
      setSearchParams({ query, page: String(next) });
    }
  };

  const goToPrevPage = () => {
    if (Number(page) > 1) {
      const next = Number(page) - 1;
      setSearchParams({ query, page: String(next) });
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = () => {
    setSearchParams({ query: searchQuery, page: '1' });
  };

  const handleReset = () => {
    setSearchQuery('');
    setSearchParams({ query: '', page: '1' });
  };

  if (shouldThrow) throw new Error('Critical failure!');
  let mainContent;
  if (error) {
    mainContent = <div className="error-msg">{error}</div>;
  } else if (isLoading) {
    mainContent = <div className="loader">Loading...</div>;
  } else if (characters.length === 0) {
    mainContent = <p>Nothing found</p>;
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
    mainContent = (
      <CardList
        items={mappedItems}
        onNext={goToNextPage}
        onPrev={goToPrevPage}
        currentPage={Number(page)}
        totalPages={totalPages}
      />
    );
  }

  return (
    <div className="app-container">
      <header className="search-area">
        <SearchBar
          value={searchQuery}
          onChange={handleInputChange}
          onSearchClick={handleSearchSubmit}
          onReset={handleReset}
        />
      </header>

      <main className="result-area">
        <div className={id ? 'column-left' : 'card-lists'}>{mainContent}</div>
        <div className="details-side">
          <Outlet />
        </div>
      </main>

      <button
        type="button"
        className="crash-button"
        onClick={() => setShouldThrow(true)}
      >
        Simulate Crash
      </button>
      <footer>
        <button type="button" className="about-us">
          <Link to="/about">About Us</Link>
        </button>
      </footer>
    </div>
  );
};

export default App;
