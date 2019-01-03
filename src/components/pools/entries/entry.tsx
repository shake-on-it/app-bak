import React from 'react';
import { Heading, Spacing, Subheading } from '@makes-apps/lib';

import { PoolEntry, PoolGame, PoolParty } from '../../../store/pools';
import { User } from '../../../store/users';

import { isGolf, isNbaFa } from '../utils';

import GolfMajorPoolEntry from './golf_major/entry';
import NbaFreeAgencyPoolEntry from './nba_free_agency/entry';

interface Props {
  modifyPoolEntry: (entry: PoolEntry) => Promise<any>;
  poolEntry: PoolEntry;
  poolGame: PoolGame;
  poolParty: PoolParty;
  user: User;
}

const View = ({ modifyPoolEntry, poolEntry, poolGame, poolParty, user }: Props) => {
  const tuple: [PoolGame, PoolParty, PoolEntry] = [poolGame, poolParty, poolEntry];

  if (isGolf(tuple)) {
    const [game, party, entry] = tuple;
    return <GolfMajorPoolEntry modifyPoolEntry={modifyPoolEntry} poolGame={game} poolParty={party} poolEntry={entry} user={user} />;
  }

  if (isNbaFa(tuple)) {
    const [game, party, entry] = tuple;
    return (
      <NbaFreeAgencyPoolEntry modifyPoolEntry={modifyPoolEntry} poolGame={game} poolParty={party} poolEntry={entry} />
    );
  }

  return <>unable to determine what to show here</>;
};

const Entry = (props: Props) => (
  <>
    <Heading as="h2" color="secondary" noMargin>
      {props.poolEntry.name}
    </Heading>
    <Subheading as="h3" color="natural">
      {props.poolEntry.email}
    </Subheading>
    <Spacing top size="mega">
      <View {...props} />
    </Spacing>
  </>
);

export default Entry;
