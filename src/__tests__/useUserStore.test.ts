import { test, expect, afterEach } from 'vitest';
import useUserStore from '../store/useUserStore';

afterEach(() => {
  useUserStore.setState({ users: [] });
});

test('Adds a new user', () => {
  const { addUser } = useUserStore.getState();

  addUser({ fullName: 'Kanykei', email: 'test@test.com' });

  const { users } = useUserStore.getState();
  expect(users).toHaveLength(1);
  expect(users[0].fullName).toBe('Kanykei');
  expect(users[0].id).toBeDefined();
});

test('Removes user by id', () => {
  const { addUser, removeUser } = useUserStore.getState();

  addUser({ fullName: 'John' });
  const user = useUserStore.getState().users[0];

  removeUser(user.id);

  const usersAfterDelete = useUserStore.getState().users;
  expect(usersAfterDelete).toHaveLength(0);
});
