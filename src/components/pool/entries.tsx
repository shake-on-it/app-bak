import React from 'react';
import { Tabs } from '@makes-apps/lib';

import { PoolEntry, PoolGame, PoolParty } from '../../store/pools';

import Entry from './entry';

interface Props {
  modifyPoolEntry: (entry: PoolEntry) => Promise<any>;
  poolEntries: PoolEntry[];
  poolGame: PoolGame;
  poolParty: PoolParty;
}

const PoolEntries = ({ modifyPoolEntry, poolEntries, poolGame, poolParty }: Props) => {
  if (poolEntries.length === 0) {
    return <>you have no entries in this pool</>;
  }

  if (poolEntries.length === 1) {
    return (
      <Entry modifyPoolEntry={modifyPoolEntry} poolGame={poolGame} poolParty={poolParty} poolEntry={poolEntries[0]} />
    );
  }

  return (
    <Tabs
      items={poolEntries.map(entry => ({
        id: entry._id.toHexString(),
        tab: <>{entry.name}</>,
        panel: <Entry modifyPoolEntry={modifyPoolEntry} poolGame={poolGame} poolParty={poolParty} poolEntry={entry} />,
      }))}
    />
  );
};

export default PoolEntries;
