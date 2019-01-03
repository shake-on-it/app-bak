import React from 'react';
import { Button, ButtonGroup, DataTable, Heading, StackedPage } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';
import moment from 'moment';

import { PoolEntry, PoolGame, PoolParty } from '../../store/pools';
import { User } from '../../store/users';
import urls from '../../urls';

interface Props {
  createPoolEntry: (entry: PoolEntry) => Promise<any>;
  entries: PoolEntry[];
  games: { [key: string]: { [key: string]: { [key: string]: PoolGame } } };
  gotoPool: (partyId: string) => void;
  parties: PoolParty[];
  removePoolParty: (partyId: BSON.ObjectId) => Promise<any>;
  user: User;
}

const ListPools = ({ createPoolEntry, entries, games, gotoPool, parties, removePoolParty, user }: Props) => {
  const poolEntries = entries.reduce(
    (acc, { party_id, email, name, ...rest }) => {
      const partyId = party_id.toHexString();
      return { ...acc, [partyId]: { ...acc[partyId], [email]: { party_id, email, name, ...rest } } };
    },
    {} as { [key: string]: { [key: string]: PoolEntry } }
  );

  console.log(parties);
  console.log(
    parties.filter(
      ({ type, mode, for: _for }) =>
        user.type === 'me' || !moment(games[type][mode][_for].event_start).isBefore(moment.now())
    )
  );
  return (
    <StackedPage
      title={<Heading color="primary">Join a Pool</Heading>}
      menu={[{ type: 'link', to: urls.pools().new(), display: 'create a pool' }]}
    >
      <DataTable
        columns={[
          {
            header: 'action',
            render: ({ item: { _id: party_id, host, note, private: isPrivate, ...meta } }) => {
              let poolEntry: PoolEntry | undefined = undefined;

              let partyId = party_id.toHexString();
              if (partyId in poolEntries && user.email in poolEntries[partyId]) {
                poolEntry = poolEntries[partyId][user.email];
              }

              const hasStarted = moment(games[meta.type][meta.mode][meta.for].event_start).isBefore(moment.now());

              const cannotJoin = !!poolEntry || hasStarted;

              return (
                <ButtonGroup align="center">
                  <Button
                    as="button"
                    color={cannotJoin ? 'secondary' : 'primary'}
                    variant="ghost"
                    size="milli"
                    padding="s"
                    onClick={() =>
                      cannotJoin
                        ? gotoPool(partyId)
                        : createPoolEntry({
                            ...(meta as any),
                            party_id,
                            email: user.email,
                            name: 'a bracket with no name',
                          }).then(() => gotoPool(partyId))
                    }
                  >
                    {cannotJoin ? 'View' : 'Join'}
                  </Button>
                  {host === user.email && (
                    <Button
                      as="button"
                      color="danger"
                      variant="ghost"
                      size="milli"
                      padding="s"
                      onClick={() => removePoolParty(party_id)}
                    >
                      Delete
                    </Button>
                  )}
                </ButtonGroup>
              );
            },
          },
          // { header: 'type' },
          // { header: 'mode' },
          // { header: 'for' },
          { header: 'name', align: 'center' },
          { header: 'host', align: 'center' },
          // { header: 'private', render: ({ value }) => JSON.stringify(value) },
          { header: 'note', whiteSpace: 'pre-line', width: 50 },
        ]}
        data={parties.filter(party => party.for === 'british_open_2019')}
      />
    </StackedPage>
  );
};

export default ListPools;
