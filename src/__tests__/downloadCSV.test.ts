import downloadCSV from '../utils/downloadCSV';

const mockData = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Citadel', url: '' },
    image: '',
    episode: [],
    url: '',
  },
];

test('should not do anything if data is empty or undefined', () => {
  const mockCreateObjectURL = vi.fn();
  globalThis.URL.createObjectURL = mockCreateObjectURL;

  downloadCSV([], 'test.csv');
  expect(mockCreateObjectURL).not.toHaveBeenCalled();

  downloadCSV(undefined as any, 'test.csv');
  expect(mockCreateObjectURL).not.toHaveBeenCalled();
});

test('should create and trigger a download with correct CSV content', () => {
  const mockCreateObjectURL = vi.fn().mockReturnValue('blob:mock-url');
  const mockRevokeObjectURL = vi.fn();

  globalThis.URL.createObjectURL = mockCreateObjectURL;
  globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

  const appendChildSpy = vi.spyOn(document.body, 'appendChild');
  const removeChildSpy = vi.spyOn(document.body, 'removeChild');

  const realCreateElement = document.createElement.bind(document);
  const createElementSpy = vi
    .spyOn(document, 'createElement')
    .mockImplementation((tagName: string) => {
      const el = realCreateElement(tagName);
      if (tagName === 'a') {
        vi.spyOn(el, 'click').mockImplementation(() => {});
        vi.spyOn(el, 'setAttribute');
      }
      return el;
    });

  downloadCSV(mockData, 'characters.csv');

  expect(mockCreateObjectURL).toHaveBeenCalled();
  const blobArg = mockCreateObjectURL.mock.calls[0][0];
  expect(blobArg).toBeInstanceOf(Blob);

  expect(createElementSpy).toHaveBeenCalledWith('a');

  const createdLink = createElementSpy.mock.results[0]
    .value as HTMLAnchorElement;

  expect(createdLink.href).toContain('blob:mock-url');
  expect(createdLink.setAttribute).toHaveBeenCalledWith(
    'download',
    'characters.csv'
  );
  expect(createdLink.style.visibility).toBe('hidden');

  expect(appendChildSpy).toHaveBeenCalledWith(createdLink);
  expect(createdLink.click).toHaveBeenCalled();
  expect(removeChildSpy).toHaveBeenCalledWith(createdLink);
  expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');

  vi.restoreAllMocks();
});
