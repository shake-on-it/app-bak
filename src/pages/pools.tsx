import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { RouterActions } from '@makes-apps/lib';
import { BSON, RemoteDeleteResult, RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import { AppState } from '../app';
import urls from '../urls';

import { ListPools, NewPool, ViewPool } from '../components/pools';
import {
  findAllEntries,
  findAllGames,
  findAllParties,
  modifyPoolEntry,
  removePoolEntry,
  removePoolParty,
  savePoolEntry,
  savePoolParty,
  watchGame,
  PoolEntry,
  PoolGame,
  PoolParty,
} from '../store/pools';
import { find as findAllUsers, User } from '../store/users';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  lastGameRefresh?: Date;
  poolEntries: PoolEntry[];
  poolGames: { [key: string]: { [key: string]: { [key: string]: PoolGame } } };
  poolParties: PoolParty[];
  user?: User;
  users: { [key: string]: User };
}

interface DispatchProps {
  findAllEntries: () => Promise<PoolEntry[]>;
  findAllGames: () => Promise<PoolGame[]>;
  findAllParties: () => Promise<PoolParty[]>;
  findAllUsers: () => Promise<User[]>;
  gotoEntry: (partyId: string, entryId: string) => void;
  gotoPool: (partyId: string) => void;
  modifyPoolEntry: (entry: PoolEntry) => Promise<BSON.ObjectId>;
  savePoolEntry: (entry: PoolEntry) => Promise<BSON.ObjectId>;
  removePoolEntry: (partyId: BSON.ObjectId) => Promise<RemoteDeleteResult>;
  removePoolParty: (partyId: BSON.ObjectId) => Promise<RemoteDeleteResult>;
  savePoolParty: (party: PoolParty) => Promise<RemoteUpdateResult>;
  watchGame: (id: string) => Promise<void>;
}

type Props = OwnProps & StateProps & DispatchProps;

class PoolsPage extends React.Component<Props> {
  componentDidMount() {
    const { findAllEntries, findAllGames, findAllParties, findAllUsers, watchGame } = this.props;
    findAllUsers()
      .then(findAllGames)
      .then(findAllParties)
      .then(findAllEntries)
      .then(() => watchGame('5d268e33a66336efeef04c69'));
  }

  render() {
    const {
      gotoEntry,
      gotoPool,
      lastGameRefresh,
      match,
      modifyPoolEntry,
      poolEntries,
      poolGames,
      poolParties,
      removePoolEntry,
      removePoolParty,
      savePoolEntry,
      savePoolParty,
      user,
      users,
    } = this.props;

    if (!user || poolParties.length === 0 || poolEntries.length === 0) {
      return 'loading...';
    }

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => (
            <ListPools
              createPoolEntry={savePoolEntry}
              entries={poolEntries}
              games={poolGames}
              gotoPool={gotoPool}
              parties={poolParties}
              removePoolParty={removePoolParty}
              user={user}
            />
          )}
        />
        <Route
          exact
          path={`${match.url}/new`}
          component={() => (
            <NewPool
              createPoolEntry={savePoolEntry}
              createPoolParty={savePoolParty}
              games={poolGames}
              gotoPool={gotoPool}
              user={user}
            />
          )}
        />
        <Route
          path={`${match.url}/:partyId`}
          render={props => {
            const poolParty = poolParties.find(({ _id }) => _id.toHexString() === props.match.params.partyId)!;

            const poolGame = poolGames[poolParty.type][poolParty.mode][poolParty.for];

            const entriesByEmail = poolEntries
              .filter(({ party_id }) => party_id.toHexString() === poolParty._id.toHexString())
              .reduce((acc, entry) => ({ ...acc, [entry.email]: (acc[entry.email] || []).concat(entry) }), {} as any);

            const poolUsers = Object.keys(entriesByEmail).reduce(
              (acc, email) => ({ ...acc, [email]: users[email] }),
              {} as { [key: string]: User }
            );

            return (
              <ViewPool
                createPoolEntry={savePoolEntry}
                gotoEntry={gotoEntry}
                lastGameRefresh={lastGameRefresh}
                modifyPoolEntry={modifyPoolEntry}
                poolGame={poolGame}
                poolParty={poolParty}
                poolEntries={entriesByEmail}
                removePoolEntry={removePoolEntry}
                user={user}
                users={poolUsers}
                {...props}
              />
            );
          }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ auth, pools, users }: AppState) => ({
  lastGameRefresh: pools.lastGameRefresh,
  poolEntries: Object.values(pools.entries),
  poolGames: Object.values(pools.games).reduce(
    (acc, game) => {
      const types = acc[game.type] || {};
      const modes = types[game.mode] || {};
      return {
        ...acc,
        [game.type]: {
          ...types,
          [game.mode]: {
            ...modes,
            [game.for]: game,
          },
        },
      };
    },
    {} as { [key: string]: { [key: string]: { [key: string]: PoolGame } } }
  ),
  poolParties: Object.values(pools.parties),
  user: auth.user,
  users: Object.values(users.db).reduce(
    (acc, user) => ({
      ...acc,
      [user.email]: user,
    }),
    {} as { [key: string]: User }
  ),
});

const mapDispatchToProps = {
  findAllEntries: findAllEntries.creator.worker,
  findAllGames: findAllGames.creator.worker,
  findAllParties: findAllParties.creator.worker,
  findAllUsers: () => findAllUsers.creator.worker({}),
  gotoEntry: (partyId: string, entryId: string) =>
    RouterActions.goto.creator.worker(
      urls
        .pools()
        .party(partyId)
        .entries()
        .entry(entryId)
    ),
  gotoPool: (partyId: string) =>
    RouterActions.goto.creator.worker(
      urls
        .pools()
        .party(partyId)
        .url()
    ),
  modifyPoolEntry: modifyPoolEntry.creator.worker,
  removePoolEntry: removePoolEntry.creator.worker,
  removePoolParty: removePoolParty.creator.worker,
  savePoolEntry: savePoolEntry.creator.worker,
  savePoolParty: savePoolParty.creator.worker,
  watchGame: watchGame.creator.worker,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolsPage);
