import { makesStitchMongoCrud } from '@makes-apps/lib';

import AppActions from '../../app/actions';
import AppContext from '../../app/context';

import { NAMESPACE, State, User } from './types';

const factory = AppActions.forNamespace<State>(NAMESPACE);

const { find, findOne, insert, insertOne, update, updateOne, delete: deleteFn, deleteOne } = makesStitchMongoCrud<
  AppContext,
  State,
  User
>(
  factory,
  stitch =>
    stitch
      .clients()
      .db('mongo', 'auth')
      .collection<User>('users'),
  user => (user ? user._id : '')
);

export { find, findOne, insert, insertOne, update, updateOne, deleteFn as delete, deleteOne };

export const addBet = factory
  .withType('add bet')
  .asThunk((email: string, betId: string) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'auth')
      .collection<User>('users')
      .updateOne({ email }, { $push: { bets: betId } })
  );

export const addGame = factory
  .withType('add game')
  .asThunk((email: string, gameId: string) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'auth')
      .collection<User>('users')
      .updateOne({ email }, { $push: { games: gameId } })
  );

export const adjustMeta = factory
  .withType('adjust meta')
  .asThunk(
    (email: string, meta: { coin?: number; skill?: number; reputation?: number }) => (_dispatch, _getState, stitch) =>
      stitch
        .clients()
        .db('mongo', 'auth')
        .collection<User>('users')
        .updateOne({ email }, { $inc: meta })
  );

export const clearDb = factory
  .withType('clear db')
  .withoutPayload()
  .withReducer(state => ({ ...state, db: {} }));
