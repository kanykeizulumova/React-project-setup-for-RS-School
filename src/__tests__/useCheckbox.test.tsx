import useCheckboxStore from '../store/useCheckbox';

test('add new ids to, delete ids from, and unselect all selectedIds', () => {
  useCheckboxStore.getState().handleCheckboxChange('1');
  expect(useCheckboxStore.getState().selectedIds).toContain('1');

  useCheckboxStore.getState().handleCheckboxChange('1');
  expect(useCheckboxStore.getState().selectedIds).not.toContain('1');

  useCheckboxStore.getState().unselectAll();
  expect(useCheckboxStore.getState().selectedIds).toEqual([]);
});
