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

const transformToCSVString = (data: Character[], origin: string): string => {
  if (!data || data.length === 0) return '';
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
    const detailsURL = `${origin}/?details=${char.id}`;

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
  return csvContent;
};

export default transformToCSVString;
