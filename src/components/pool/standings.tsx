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
} from '../../store/pools';

import GolfMajorPoolStandings from './golf_major_standings';
import NbaFreeAgencyPoolStandings from './nba_free_agency_standings';

interface Props {
  poolEntries: PoolEntry[];
  poolGame: PoolGame;
  poolParty: PoolParty;
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

const PoolStandings = ({ poolEntries, poolGame, poolParty }: Props) => {
  if (isGolfGame(poolGame) && isGolfParty(poolParty) && isGolfEntries(poolEntries)) {
    return <GolfMajorPoolStandings poolGame={poolGame} poolParty={poolParty} poolEntries={poolEntries} />;
  }
  if (isNbaFaGame(poolGame) && isNbaFaParty(poolParty) && isNbaFaEntries(poolEntries)) {
    return <NbaFreeAgencyPoolStandings poolGame={poolGame} poolParty={poolParty} poolEntries={poolEntries} />;
  }
  return <>unable to determine what to show here</>;
};

export default PoolStandings;
