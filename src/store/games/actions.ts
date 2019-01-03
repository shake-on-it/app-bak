import { makesStitchMongoCrud } from '@makes-apps/lib';

import AppActions from '../../app/actions';
import AppContext from '../../app/context';

import { State, Entry, Game } from './types';

const factory = AppActions.forNamespace<State>(State.NAMESPACE);

const { find, findOne, insert, insertOne, update, updateOne, delete: deleteFn, deleteOne } = makesStitchMongoCrud<
  AppContext,
  State,
  Game
>(
  factory,
  stitch =>
    stitch
      .clients()
      .db('mongo', 'app')
      .collection<Game>('games'),
  game => (game ? game._id.toHexString() : '')
);

export const clearDb = factory
  .withType('clear db')
  .withoutPayload()
  .withReducer(state => ({ ...state, db: {} }));

export { find, findOne, insert, insertOne, update, updateOne, deleteFn as delete, deleteOne };

export const addEntry = factory
  .withType('add entry')
  .asThunk((_id: string, entry: Entry) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'app')
      .collection<Game>('games')
      .updateOne({ _id }, { $push: { entries: entry } })
  );
