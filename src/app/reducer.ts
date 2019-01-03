import { makesRootReducer } from '@makes-apps/lib';

import AuthReducer from '../store/auth';
import BetsReducer from '../store/bets';
import GamesReducer from '../store/games';
import PoolsReducer from '../store/pools';
import ScoresReducer from '../store/scores';
import TournamentsReducer from '../store/tournaments';
import UsersReducer from '../store/users';

export default makesRootReducer({
  auth: AuthReducer,
  bets: BetsReducer,
  games: GamesReducer,
  pools: PoolsReducer,
  scores: ScoresReducer,
  tournaments: TournamentsReducer,
  users: UsersReducer,
});
