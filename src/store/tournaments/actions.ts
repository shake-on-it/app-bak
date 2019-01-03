import { makesStitchMongoCrud } from '@makes-apps/lib';

import AppActions from '../../app/actions';
import AppContext from '../../app/context';

import { State, Tournament } from './types';

const factory = AppActions.forNamespace<State>(State.NAMESPACE);

const { find, findOne, insert, insertOne, update, updateOne, delete: deleteFn, deleteOne } = makesStitchMongoCrud<
  AppContext,
  State,
  Tournament
>(
  factory,
  stitch =>
    stitch
      .clients()
      .db('mongo', 'app')
      .collection<Tournament>('tournaments'),
  bet => (bet ? bet._id.toHexString() : '')
);

export const clearDb = factory
  .withType('clear db')
  .withoutPayload()
  .withReducer(state => ({ ...state, db: {} }));

export { find, findOne, insert, insertOne, update, updateOne, deleteFn as delete, deleteOne };
