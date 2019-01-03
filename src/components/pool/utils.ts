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

export const poolMeta = (game: PoolGame): any => ({
  type: game.type,
  mode: game.mode,
  for: game.for,
});

const golfMetaComparator = <META extends { type: string; mode: string }>(meta: META) =>
  meta.type === 'pickem' && meta.mode === 'golf_major';

const nbaFaMetaComparator = <META extends { type: string; mode: string }>(meta: META) =>
  meta.type === 'pickem' && meta.mode === 'nba_free_agency';

const isGolfEntry = (entry: PoolEntry): entry is GolfMajorPickemEntry => golfMetaComparator(entry);

const isGolfGame = (game: PoolGame): game is GolfMajorPickemGame => golfMetaComparator(game);

const isGolfParty = (party: PoolParty): party is GolfMajorPickemParty => golfMetaComparator(party);

export const isGolf = (
  tuple: [PoolGame, PoolParty, PoolEntry]
): tuple is [GolfMajorPickemGame, GolfMajorPickemParty, GolfMajorPickemEntry] =>
  isGolfGame(tuple[0]) && isGolfParty(tuple[1]) && isGolfEntry(tuple[2]);

const isNbaFaEntry = (entry: PoolEntry): entry is NbaFreeAgencyPickemEntry => nbaFaMetaComparator(entry);

const isNbaFaGame = (game: PoolGame): game is NbaFreeAgencyPickemGame => nbaFaMetaComparator(game);

const isNbaFaParty = (party: PoolParty): party is NbaFreeAgencyPickemParty => nbaFaMetaComparator(party);

export const isNbaFa = (
  tuple: [PoolGame, PoolParty, PoolEntry]
): tuple is [NbaFreeAgencyPickemGame, NbaFreeAgencyPickemParty, NbaFreeAgencyPickemEntry] =>
  isNbaFaGame(tuple[0]) && isNbaFaParty(tuple[1]) && isNbaFaEntry(tuple[2]);
