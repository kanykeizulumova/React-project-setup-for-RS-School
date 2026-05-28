import { useState, useEffect } from 'react';
import { useSearchParams, Link, Outlet } from 'react-router';
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from '@tanstack/react-query-devtools';
import './App.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CardList from './components/Cardlist.tsx';
import SearchBar from './components/Searchbar.tsx';
import useLocalStorage from './hooks/useLocalStorage.tsx';
import useCheckboxStore from './store/useCheckbox.tsx';
import downloadCSV from './utils/downloadCSV.ts';
import { useTheme } from './ThemeContext';
import fetchCharacters from './fetchAllCharacters.ts';
import fetchSelectedCharacters from './fetchSelectedCharacters.ts';
import CACHE_TTL from './config';
import FetchError from './FetchError';

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

const App = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [shouldThrow, setShouldThrow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const id = searchParams.get('details');

  const unselectAll = useCheckboxStore((state) => state.unselectAll);
  const countSelectedItems = useCheckboxStore((state) => state.selectedIds);

  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', query, Number(page)],
    queryFn: fetchCharacters,
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
  });

  const { refetch: refetchSelected } = useQuery({
    queryKey: ['selectedCharacters', countSelectedItems],
    queryFn: fetchSelectedCharacters,
    enabled: false,
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
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
    if (error && typeof error === 'object' && 'status' in error) {
      const fetchError = error as FetchError;
      if (fetchError.status === 404) {
        mainContent = (
          <div className="error-msg">
            Nothing found (Error 404). Try changing your search query.
          </div>
        );
      } else if (fetchError.status === 429) {
        mainContent = (
          <div className="error-msg">
            Too many requests (Error 429). Please wait a moment and try again.
          </div>
        );
      } else if (fetchError.status >= 500) {
        mainContent = (
          <div className="error-msg">
            The server is temporarily unavailable (Error {fetchError.status}).
            Please try again later.
          </div>
        );
      } else {
        mainContent = (
          <div className="error-msg">
            An unexpected API error occurred (Code: {fetchError.status}).
          </div>
        );
      }
    } else {
      mainContent = (
        <div className="error-msg">
          Network problem. Please check your internet connection.
        </div>
      );
    }
  } else if (isLoading) {
    mainContent = <div className="loader">Loading...</div>;
  } else if (data?.results?.length === 0) {
    mainContent = <p>Nothing found</p>;
  } else {
    const mappedItems = data.results.map(
      (c: {
        id: string | number;
        name: string;
        species: string;
        gender: string;
        status: string;
        location: { name: string };
        image: string;
      }) => ({
        id: String(c.id),
        name: c.name,
        species: c.species,
        gender: c.gender,
        status: c.status,
        location: c.location.name,
        imageUrl: c.image,
      })
    );
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
          <div className="refresh-area">
            <button
              className="refresh-button"
              type="button"
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ['characters'] });
              }}
            >
              Refresh
            </button>
          </div>
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
                const { data: selectedData } = await refetchSelected();

                if (selectedData && selectedData.length > 0) {
                  downloadCSV(selectedData, `${selectedData.length}_items.csv`);
                }
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
