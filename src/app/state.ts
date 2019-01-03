import { AuthState, LocalAppState, makesAppState } from '@makes-apps/lib';

import { State as BetsState } from '../store/bets';
import { State as GamesState } from '../store/games';
import { State as PoolsState } from '../store/pools';
import { State as ScoresState } from '../store/scores';
import { State as TournamentsState } from '../store/tournaments';
import { State as UsersState, User } from '../store/users';

import APP_LOCAL_KEY from './local_key';

const AppState = makesAppState({
  auth: new AuthState<User>(LocalAppState.read(APP_LOCAL_KEY)),
  users: new UsersState(),
  bets: new BetsState(),
  games: new GamesState(),
  pools: new PoolsState(),
  scores: new ScoresState(),
  tournaments: new TournamentsState(),
});
interface AppState extends ReturnType<typeof AppState> {}

export default AppState;
