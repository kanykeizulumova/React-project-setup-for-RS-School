'use client';

import { useState, useEffect, Suspense } from 'react';
import {
  useSearchParams,
  useRouter,
  usePathname,
  notFound,
} from 'next/navigation';

import { useTranslations } from 'next-intl';
import '../ui/App.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '../lib/navigation';
import CardList from '../lib/Cardlist';
import SearchBar from '../lib/Searchbar';
import useLocalStorage from '../lib/useLocalStorage';
import useCheckboxStore from '../lib/useCheckbox';
import { useTheme } from '../lib/ThemeContext';
import fetchCharacters from '../lib/fetchAllCharacters';
import CACHE_TTL from '../../config';
import FetchError from '../lib/FetchError';
import CharacterDetails from '../CharacterDetails';
import getCsvAction from '../api/actions';
import LocaleSwitcher from '../lib/LocaleSwitcher';

export default function App() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [shouldThrow, setShouldThrow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setSearchParams = (
    callback: (prev: URLSearchParams) => URLSearchParams
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const updated = callback(current);
    router.replace(`${pathname}?${updated.toString()}`);
  };

  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const id = searchParams.get('details');

  const unselectAll = useCheckboxStore((state) => state.unselectAll);
  const countSelectedItems = useCheckboxStore((state) => state.selectedIds);

  const { theme, toggleTheme } = useTheme();

  const t = useTranslations('App');

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', query, Number(page)],
    queryFn: fetchCharacters,
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL * 2,
    retry: (failureCount, queryError) => {
      if (queryError instanceof FetchError && queryError.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (
      !searchParams.has('page') ||
      (!searchParams.has('query') && searchQuery)
    ) {
      setSearchParams((prev) => {
        prev.set('page', prev.get('page') || '1');
        if (searchQuery) {
          prev.set('query', searchQuery);
        }
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToNextPage = () => {
    if (Number(page) < data?.info?.pages || 0) {
      const next = Number(page) + 1;
      setSearchParams((prev) => {
        if (query) {
          prev.set('query', query);
        } else {
          prev.delete('query');
        }
        prev.set('page', String(next));
        return prev;
      });
    }
  };

  const goToPrevPage = () => {
    if (Number(page) > 1) {
      const next = Number(page) - 1;
      setSearchParams((prev) => {
        if (query) {
          prev.set('query', query);
        } else {
          prev.delete('query');
        }
        prev.set('page', String(next));
        return prev;
      });
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = () => {
    setSearchParams((prev) => {
      if (searchQuery.trim()) {
        prev.set('query', searchQuery.trim());
      } else {
        prev.delete('query');
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handleReset = () => {
    setSearchQuery('');
    setSearchParams((prev) => {
      prev.delete('query');
      prev.set('page', '1');
      return prev;
    });
  };

  if (shouldThrow) throw new Error('Critical failure!');
  let mainContent;
  if (error) {
    if (error && typeof error === 'object' && 'status' in error) {
      const fetchError = error as FetchError;
      if (fetchError.status === 404) {
        notFound();
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
    mainContent = <div className="loader">{t('loading')}</div>;
  } else if (data?.results?.length === 0) {
    mainContent = <p>{t('nothingFound')}</p>;
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
              {t('switchTheme')}
            </button>
            <LocaleSwitcher />
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
              {t('refresh')}
            </button>
          </div>
          <div className={id ? 'column-left' : 'card-lists'}>{mainContent}</div>
          <div className="details-side">
            <Suspense fallback={<p>Loading character details</p>}>
              {id && <CharacterDetails />}
            </Suspense>
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
              {t('unselectAll')}
            </button>
            <button
              type="button"
              onClick={async () => {
                const currentOrigin = window.location.origin;
                const csvString = await getCsvAction(
                  countSelectedItems,
                  currentOrigin
                );

                if (csvString) {
                  const blob = new Blob([csvString as unknown as string], {
                    type: 'text/csv',
                  });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${countSelectedItems.length}_items.csv`;
                  a.click();
                  window.URL.revokeObjectURL(url);
                }
              }}
            >
              {t('download')}
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
            <Link href="/about">{t('aboutUs')}</Link>
          </button>
        </footer>
      </div>
    </div>
  );
}
