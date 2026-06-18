'use server'
import transformToCSVString from '../lib/downloadCSV';
import FetchError from '../lib/FetchError';

async function getCsvAction(ids: string[], origin: string) {
  if (ids.length === 0) return [];

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(',')}`
  );
  if (!res.ok) {
    throw new FetchError('Network response was not ok', res.status);
  }

  const data = await res.json();
  const charactersArray = Array.isArray(data) ? data : [data];

  const csvTextString = transformToCSVString(charactersArray, origin);
  return csvTextString;
}

export default getCsvAction;
