import React from 'react';
import {} from '@makes-apps/lib';

import {
  GolfMajorPickemEntry,
  GolfMajorPickemGame,
  GolfMajorPickemParty,
  NbaFreeAgencyPickemEntry,
  NbaFreeAgencyPickemGame,
  NbaFreeAgencyPickemParty,
  PoolEntry,
  PoolGame,
  PoolParty,
} from '../../../store/pools';
import { User } from '../../../store/users';

import GolfMajorPoolStandings from './golf_major/standings';
import NbaFreeAgencyPoolStandings from './nba_free_agency/standings';

interface Props {
  lastGameRefresh?: Date;
  poolEntries: PoolEntry[];
  poolGame: PoolGame;
  poolParty: PoolParty;
  users: { [key: string]: User };
}

const golfMetaComparator = <META extends { type: string; mode: string }>(meta: META) =>
  meta.type === 'pickem' && meta.mode === 'golf_major';

const nbaFaMetaComparator = <META extends { type: string; mode: string }>(meta: META) =>
  meta.type === 'pickem' && meta.mode === 'nba_free_agency';

const isGolfEntries = (entries: PoolEntry[]): entries is GolfMajorPickemEntry[] => entries.every(golfMetaComparator);

const isGolfGame = (game: PoolGame): game is GolfMajorPickemGame => golfMetaComparator(game);

const isGolfParty = (party: PoolParty): party is GolfMajorPickemParty => golfMetaComparator(party);

const isNbaFaEntries = (entries: PoolEntry[]): entries is NbaFreeAgencyPickemEntry[] =>
  entries.every(nbaFaMetaComparator);

const isNbaFaGame = (game: PoolGame): game is NbaFreeAgencyPickemGame => nbaFaMetaComparator(game);

const isNbaFaParty = (party: PoolParty): party is NbaFreeAgencyPickemParty => nbaFaMetaComparator(party);

const PoolStandings = ({ lastGameRefresh, poolEntries, poolGame, poolParty, users }: Props) => {
  if (isGolfGame(poolGame) && isGolfParty(poolParty) && isGolfEntries(poolEntries)) {
    return (
      <GolfMajorPoolStandings
        lastGameRefresh={lastGameRefresh}
        poolGame={poolGame}
        poolParty={poolParty}
        poolEntries={poolEntries}
        users={users}
      />
    );
  }
  if (isNbaFaGame(poolGame) && isNbaFaParty(poolParty) && isNbaFaEntries(poolEntries)) {
    return (
      <NbaFreeAgencyPoolStandings
        lastGameRefresh={lastGameRefresh}
        poolGame={poolGame}
        poolParty={poolParty}
        poolEntries={poolEntries}
      />
    );
  }
  return <>unable to determine what to show here</>;
};

export default PoolStandings;
