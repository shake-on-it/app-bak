import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { StackedPage } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { PoolEntry, PoolGame, PoolParty } from '../../store/pools';
import { User } from '../../store/users';
import urls from '../../urls';

// import { PoolEntries } from '../pool';

import { PoolEntries } from './entries';
import { PoolPortal } from './portal';
import { PoolStandings } from './standings';

interface Props extends RouteComponentProps {
  createPoolEntry: (entry: PoolEntry) => Promise<any>;
  gotoEntry: (partyId: string, entryId: string) => void;
  lastGameRefresh?: Date;
  modifyPoolEntry: (entry: PoolEntry) => Promise<BSON.ObjectId>;
  poolGame: PoolGame;
  poolParty: PoolParty;
  poolEntries: { [key: string]: PoolEntry[] };
  removePoolEntry: (id: BSON.ObjectId) => Promise<any>;
  user: User;
  users: { [key: string]: User };
}

type View = 'entries' | 'portal' | 'standings';

const ViewPool = ({
  createPoolEntry,
  gotoEntry,
  lastGameRefresh,
  match,
  modifyPoolEntry,
  poolEntries,
  poolGame,
  poolParty,
  removePoolEntry,
  user,
  users,
}: Props) => {
  const poolPartyId = poolParty._id.toHexString();
  const allEntries = Object.values(poolEntries).reduce((arr, entries) => arr.concat(...entries), []);
  const [view, setView] = React.useState<View>('portal');
  return (
    <StackedPage
      activeView={view}
      setView={(v = 'portal') => setView(v)}
      menu={[
        {
          type: 'link',
          to: urls
            .pools()
            .party(poolPartyId)
            .entries()
            .url(),
          display: 'view entries',
          view: 'entries',
        },
        {
          type: 'link',
          to: urls
            .pools()
            .party(poolPartyId)
            .url(),
          display: 'portal',
          view: 'portal',
        },
        {
          type: 'link',
          to: urls
            .pools()
            .party(poolPartyId)
            .standings()
            .url(),
          display: 'view standings',
          view: 'standings',
        },
      ]}
    >
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => (
            <PoolPortal
              createPoolEntry={createPoolEntry}
              poolGame={poolGame}
              poolParty={poolParty}
              poolEntries={poolEntries}
              removePoolEntry={removePoolEntry}
              user={user}
              users={users}
            />
          )}
        />
        <Route
          path={`${match.url}/entries`}
          render={props => (
            <PoolEntries
              createPoolEntry={createPoolEntry}
              gotoEntry={gotoEntry}
              modifyPoolEntry={modifyPoolEntry}
              poolGame={poolGame}
              poolParty={poolParty}
              poolEntries={allEntries}
              user={user}
              users={users}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${match.url}/standings`}
          component={() => (
            <PoolStandings
              lastGameRefresh={lastGameRefresh}
              poolGame={poolGame}
              poolParty={poolParty}
              poolEntries={allEntries}
              users={users}
            />
          )}
        />
      </Switch>
    </StackedPage>
  );
};

export default ViewPool;
