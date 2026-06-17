interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
  origin: { name: string; url: string };
  episode: string[];
  url: string;
}

const escapeCSV = (val: string): string => {
  if (!val) return '""';
  const escaped = val.replace(/"/g, '""');
  return `"${escaped}"`;
};

const downloadCSV = (data: Character[], fileName: string): void => {
  if (!data || data.length === 0) return;

  const headers = [
    'Name',
    'Description',
    'Details URL',
    'Status',
    'Species',
    'Gender',
    'Origin',
    'Location',
  ];

  const rows = data.map((char) => {
    const description = `A ${char.status.toLowerCase()} ${char.gender.toLowerCase()} ${char.species.toLowerCase()} from ${char.origin.name}`;
    const detailsURL = `${window.location.origin}/?details=${char.id}`;

    return [
      escapeCSV(char.name),
      escapeCSV(description),
      escapeCSV(detailsURL),
      escapeCSV(char.status),
      escapeCSV(char.species),
      escapeCSV(char.gender),
      escapeCSV(char.origin.name),
      escapeCSV(char.location.name),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export default downloadCSV;
