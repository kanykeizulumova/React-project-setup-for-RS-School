import { useState, useEffect } from 'react';
import { useSearchParams, Link, Outlet } from 'react-router';
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from '@tanstack/react-query-devtools';
import './App.css';
import { QueryClient, useQuery } from '@tanstack/react-query';
import CardList from './components/Cardlist.tsx';
import SearchBar from './components/Searchbar.tsx';
import useLocalStorage from './hooks/useLocalStorage.tsx';
import useCheckboxStore from './store/useCheckbox.tsx';
import downloadCSV from './utils/downloadCSV.ts';
import { useTheme } from './ThemeContext';
import fetchCharacters from './fetchAllCharacters.ts';

export const queryClient = new QueryClient();

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

const App = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [shouldThrow, setShouldThrow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const id = searchParams.get('details');

  const unselectAll = useCheckboxStore((state) => state.unselectAll);
  const countSelectedItems = useCheckboxStore((state) => state.selectedIds);

  const getSelectedCards = useCheckboxStore((state) => state.getSelectedCards);
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', query, Number(page)],
    queryFn: fetchCharacters,
  });

  useEffect(() => {
    if (
      !searchParams.has('page') ||
      (!searchParams.has('query') && searchQuery)
    ) {
      setSearchParams(
        (prev) => {
          prev.set('page', prev.get('page') || '1');
          if (searchQuery) {
            prev.set('query', searchQuery);
          }
          return prev;
        },
        { replace: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToNextPage = () => {
    if (Number(page) < data?.info?.pages || 0) {
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
    mainContent = <div className="error-msg">{(error as Error)?.message}</div>;
  } else if (isLoading) {
    mainContent = <div className="loader">Loading...</div>;
  } else if (data?.results?.length === 0) {
    mainContent = <p>Nothing found</p>;
  } else {
    const mappedItems = data.results.map((c) => ({
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
        totalPages={data?.info?.pages || 0}
      />
    );
  }

  return (
    <div>
      <div className={`app-container ${theme}`}>
        <header className="search-area">
          <SearchBar
            value={searchQuery}
            onChange={handleInputChange}
            onSearchClick={handleSearchSubmit}
            onReset={handleReset}
          />
          <div className="theme-context">
            <button type="button" className="switch-btn" onClick={toggleTheme}>
              Switch Theme
            </button>
          </div>
        </header>

        <main className="result-area">
          <div className={id ? 'column-left' : 'card-lists'}>{mainContent}</div>
          <div className="details-side">
            <Outlet />
          </div>
          <div
            className={
              countSelectedItems.length > 0
                ? 'check-buttons'
                : 'check-buttons-close'
            }
          >
            <p className="flyout">
              Selected: {countSelectedItems.length} cards
            </p>
            <button
              type="button"
              className="unsellect"
              onClick={() => unselectAll()}
            >
              Unselect all
            </button>
            <button
              type="button"
              onClick={async () => {
                const selectedData = await getSelectedCards();
                downloadCSV(selectedData, `${selectedData.length}_items.csv`);
              }}
            >
              Download
            </button>
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
      <ReactQueryDevtools initialIsOpen={false} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default App;
