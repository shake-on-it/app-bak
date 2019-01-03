import { default as auth } from './auth';
import { default as pools } from './pools';
import { default as users } from './users';

export default {
  admin: () => '/admin',
  home: () => '/',
  welcome: () => '/welcome',
  pools,
  users,
  auth,
};
