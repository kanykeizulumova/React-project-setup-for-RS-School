import useCheckboxStore from '../store/useCheckbox';

test('add new ids to, delete ids from, and unselect all selectedIds', () => {
  useCheckboxStore.getState().handleCheckboxChange('1');
  expect(useCheckboxStore.getState().selectedIds).toContain('1');

  useCheckboxStore.getState().handleCheckboxChange('1');
  expect(useCheckboxStore.getState().selectedIds).not.toContain('1');

  useCheckboxStore.getState().unselectAll();
  expect(useCheckboxStore.getState().selectedIds).toEqual([]);
});

test('getselectedcards', async () => {
  const mockCharacters = [{ id: 1, name: 'Rick Sanchez' }];

  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockCharacters,
  });
  useCheckboxStore.getState().handleCheckboxChange('1');
  await useCheckboxStore.getState().getSelectedCards();

  expect(globalThis.fetch).toHaveBeenCalledWith(
    'https://rickandmortyapi.com/api/character/1'
  );

  useCheckboxStore.getState().unselectAll();
});

test('getselectedcards error', async () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
  });

  useCheckboxStore.getState().handleCheckboxChange('2');
  const result = await useCheckboxStore.getState().getSelectedCards();

  expect(result).toEqual([]);
  expect(consoleSpy).toHaveBeenCalledWith(
    'Fetch selected cards error:',
    new Error('Server error: 500')
  );

  consoleSpy.mockRestore();
  useCheckboxStore.getState().unselectAll();
});

test('should return an empty array if selectedIds is empty', async () => {
  useCheckboxStore.getState().unselectAll();
  globalThis.fetch = vi.fn();

  const result = await useCheckboxStore.getState().getSelectedCards();

  expect(result).toEqual([]);
  expect(globalThis.fetch).not.toHaveBeenCalled();
});
