import { BSON } from 'mongodb-stitch-browser-sdk';

import AppActions from '../../app/actions';

import { State, PoolEntry, PoolGame, PoolParty } from './types';

const factory = AppActions.forNamespace<State>(State.NAMESPACE);

const objectId = (id: string | BSON.ObjectId) => (typeof id === 'string' ? id : id.toHexString());

export const watchGame = factory.withType('watch pool game').asThunk((id: string) => (dispatch, _getState, stitch) =>
  stitch
    .clients()
    .db('mongo', 'pools')
    .collection<PoolGame>('games')
    .watch([new BSON.ObjectId(id)])
    .then(stream =>
      stream.onNext(({ fullDocument }) => {
        if (fullDocument) {
          dispatch(setGame.creator.action(fullDocument));
          dispatch(setGameRefresh.creator.action(undefined));
        }
      })
    )
);

export const setGame = factory
  .withType('set pool game')
  .withPayload<PoolGame>()
  .withReducer((state, { payload }) => ({ ...state, [payload._id.toHexString()]: payload }));

export const setGameRefresh = factory
  .withType('set last pool game refresh')
  .withPayload<Date | undefined>()
  .withReducer((state, { payload = new Date() }) => ({ ...state, lastGameRefresh: payload }));

export const findAllParties = factory
  .withType('find all pool parties')
  .asThunk(() => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolParty>('parties')
      .find({})
      .toArray()
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      return {
        ...state,
        parties: action.payload.reduce((acc, party) => ({ ...acc, [party._id.toHexString()]: party }), {}),
      };
    }
    return state;
  });

export const savePoolParty = factory
  .withType('save pool party')
  .asThunk((poolParty: PoolParty) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolParty>('parties')
      .updateOne({ _id: poolParty._id || new BSON.ObjectId() }, poolParty, { upsert: true })
      .then(({ upsertedId }) => upsertedId || poolParty._id)
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      const party = action.meta.args[0];
      return {
        ...state,
        parties: {
          ...state.parties,
          [action.payload.toHexString()]: { _id: action.payload, ...party },
        },
      };
    }
    return state;
  });

export const removePoolParty = factory
  .withType('remove pool party')
  .asThunk((_id: BSON.ObjectId) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolParty>('parties')
      .deleteOne({ _id })
  )
  .withReducer((state, action) => {
    if (action.status === 'success' && action.payload.deletedCount === 1) {
      const newState = { ...state };
      delete newState.parties[objectId(action.meta.args[0])];
      return newState;
    }
    return state;
  });

export const findAllGames = factory
  .withType('find all pool games')
  .asThunk(() => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolGame>('games')
      .find({})
      .toArray()
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      return {
        ...state,
        games: action.payload.reduce((acc, game) => ({ ...acc, [game._id.toHexString()]: game }), {}),
      };
    }
    return state;
  });

export const savePoolGame = factory
  .withType('save pool game')
  .asThunk((poolGame: PoolGame) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolGame>('games')
      .updateOne({ type: poolGame.type, mode: poolGame.mode, for: poolGame.for }, poolGame, { upsert: true })
      .then(({ upsertedId }) => upsertedId || poolGame._id)
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      const game = action.meta.args[0];
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.toHexString()]: { _id: action.payload, ...game },
        },
      };
    }
    return state;
  });

export const removePoolGame = factory
  .withType('remove pool game')
  .asThunk((_id: BSON.ObjectId) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolGame>('games')
      .deleteOne({ _id })
  )
  .withReducer((state, action) => {
    if (action.status === 'success' && action.payload.deletedCount === 1) {
      const newState = { ...state };
      delete newState.games[objectId(action.meta.args[0])];
      return newState;
    }
    return state;
  });

export const findAllEntries = factory
  .withType('find all pool entries')
  .asThunk(() => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolEntry>('entries')
      .find({})
      .toArray()
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      return {
        ...state,
        entries: action.payload.reduce((acc, entry) => ({ ...acc, [entry._id.toHexString()]: entry }), {}),
      };
    }
    return state;
  });

export const savePoolEntry = factory
  .withType('save pool entry')
  .asThunk((poolEntry: PoolEntry) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection('entries')
      .updateOne(
        {
          type: poolEntry.type,
          mode: poolEntry.mode,
          for: poolEntry.for,
          email: poolEntry.email,
          name: poolEntry.name,
        },
        poolEntry,
        { upsert: true }
      )
      .then(({ upsertedId }) => upsertedId || poolEntry._id)
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      const entry = action.meta.args[0];
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.toHexString()]: { _id: action.payload, ...entry },
        },
      };
    }
    return state;
  });

export const modifyPoolEntry = factory
  .withType('modify pool entry')
  .asThunk(
    (poolEntry: PoolEntry) => (_dispatch, _getState, stitch) =>
      stitch
        .clients()
        .db('mongo', 'pools')
        .collection('entries')
        .updateOne({ _id: poolEntry._id }, poolEntry)
        .then(() => {}),
    'we have successfully updated your entry'
  )
  .withReducer((state, action) => {
    if (action.status === 'success') {
      const entry = action.meta.args[0];
      return {
        ...state,
        entries: {
          ...state.entries,
          [entry._id.toHexString()]: entry,
        },
      };
    }
    return state;
  });

export const removePoolEntry = factory
  .withType('remove pool entry')
  .asThunk((_id: BSON.ObjectId) => (_dispatch, _getState, stitch) =>
    stitch
      .clients()
      .db('mongo', 'pools')
      .collection<PoolEntry>('entries')
      .deleteOne({ _id })
  )
  .withReducer((state, action) => {
    if (action.status === 'success' && action.payload.deletedCount === 1) {
      const newState = { ...state };
      delete newState.entries[objectId(action.meta.args[0])];
      return newState;
    }
    return state;
  });
