import { AuthTypes, BaseCrudState } from '@makes-apps/lib';

const NAMESPACE = 'users';

interface User extends AuthTypes.BaseUser {
  firstName: string;
  lastName: string;
  credit: number;
  debit: number;
  skill: number;
  coin: number;
  reputation: number;
  games: string[];
  bets: string[];
}

export const userId = (user: User): string =>
  user._id ? (typeof user._id === 'string' ? user._id : user._id.toHexString()) : undefined;

class State extends BaseCrudState<User> {}

export { NAMESPACE, User, State };
