import { User } from '../../store/users';

export const userDisplay = (user: User) =>
  user.firstName ? (user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName) : user.name;
