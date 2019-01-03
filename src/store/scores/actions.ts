import { makesStitchMongoCrud } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import AppActions from '../../app/actions';
import AppContext from '../../app/context';

import { State, MastersScores } from './types';

const factory = AppActions.forNamespace<State>(State.NAMESPACE);

const { find, findOne, insert, insertOne, update, updateOne, delete: deleteFn, deleteOne } = makesStitchMongoCrud<
  AppContext,
  State,
  MastersScores
>(
  factory,
  stitch =>
    stitch
      .clients()
      .db('mongo', 'app')
      .collection<MastersScores>('scores'),
  bet => (bet ? bet._id.toHexString() : '')
);

export const clearDb = factory
  .withType('clear db')
  .withoutPayload()
  .withReducer(state => ({ ...state, db: {} }));

export { find, findOne, insert, insertOne, update, updateOne, deleteFn as delete, deleteOne };

export const setScores = factory
  .withType('set score')
  .withPayload<MastersScores>()
  .withReducer((state, { payload }) => ({
    ...state,
    db: {
      ...state.db,
      [payload.key]: payload,
    },
  }));

export const watchMasters = factory.withType('watch masters').asThunk(() => async (dispatch, _getState, stitch) => {
  const stream = await stitch
    .clients()
    .db('mongo', 'app')
    .collection<MastersScores>('scores')
    .watch([new BSON.ObjectId('5caf37d8c8b5c9ec8af3756c')]);

  stream.onNext(e => {
    if (e.fullDocument) {
      dispatch(setScores.creator.action(e.fullDocument));
    }
  });
});
