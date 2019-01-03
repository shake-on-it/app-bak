import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Button, ButtonGroup, DataTable, Heading, Spacing } from '@makes-apps/lib';
import moment from 'moment';

import { PoolEntry, PoolGame, PoolParty } from '../../../store/pools';
import { User } from '../../../store/users';

import { poolMeta } from '../utils';

import Entry from './entry';

interface Props extends RouteComponentProps {
  createPoolEntry: (entry: PoolEntry) => Promise<any>;
  gotoEntry: (partyId: string, entryId: string) => void;
  modifyPoolEntry: (entry: PoolEntry) => Promise<any>;
  poolEntries: PoolEntry[];
  poolGame: PoolGame;
  poolParty: PoolParty;
  user: User;
  users: { [key: string]: User };
}

const PoolEntries = ({
  createPoolEntry,
  gotoEntry,
  match,
  modifyPoolEntry,
  poolEntries,
  poolGame,
  poolParty,
  user,
  users,
}: Props) => {
  const userEntries = poolEntries.filter(({ email }) => email === user.email);

  const hasStarted = moment(poolGame.event_start).isBefore(moment.now());

  const onEntryClick = hasStarted
    ? (item: PoolEntry) => gotoEntry(poolParty._id.toHexString(), item._id.toHexString())
    : undefined;

  return (
    <>
      {!hasStarted && userEntries.length !== 0 && (
        <Heading color="primary" noMargin>
          My Entries
        </Heading>
      )}
      <Spacing bottom size="mega">
        <ButtonGroup align="center">
          {userEntries.map(e => (
            <Button
              key={e._id.toHexString()}
              as="button"
              onClick={() => gotoEntry(poolParty._id.toHexString(), e._id.toHexString())}
            >
              {e.name}
            </Button>
          ))}
          {!hasStarted && userEntries.length < poolParty.max_entries && (
            <Button
              as="button"
              color="primary"
              variant="text"
              onClick={() =>
                createPoolEntry({
                  ...poolMeta(poolGame),
                  party_id: poolParty._id,
                  email: user.email,
                  name: `bracket #${userEntries.length + 1}`,
                })
              }
            >
              Add entry
            </Button>
          )}
        </ButtonGroup>
      </Spacing>
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => (
            <>
              <Heading color="primary" noMargin>
                All Entries
              </Heading>
              <DataTable
                columns={[
                  {
                    header: 'name',
                    render: ({ item }) => {
                      const user = users[item.email];
                      if (user) {
                        const { firstName, lastName } = user;
                        if (firstName && lastName) {
                          return `${firstName} ${lastName}`;
                        }
                      }
                      return item.email;
                    },
                  },
                  { header: 'entry', accessor: 'name' },
                ]}
                width="50%"
                data={poolEntries}
                onRowClick={onEntryClick}
              />
            </>
          )}
        />
        <Route
          path={`${match.url}/:entryId`}
          render={props => {
            const entry = poolEntries.find(({ _id }) => _id.toHexString() === props.match.params.entryId)!;
            return (
              <Entry
                key={entry._id.toHexString()}
                modifyPoolEntry={modifyPoolEntry}
                poolGame={poolGame}
                poolParty={poolParty}
                poolEntry={entry}
                user={user}
                {...props}
              />
            );
          }}
        />
      </Switch>
    </>
  );
};

export default PoolEntries;
