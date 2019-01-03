import { BSON } from 'mongodb-stitch-browser-sdk';

import { GolfMajorPickemFor, NbaBingoballFor, NbaFreeAgencyPickemFor, NflBoxesFor } from './meta';

interface BasePoolParty {
  _id?: BSON.ObjectId;
  host: string;
  name: string;
  note: string;
  private: boolean;
  max_entries: number;
}

interface BasePickemPoolParty extends BasePoolParty {
  type: 'pickem';
}

export interface NbaFreeAgencyPickemParty extends BasePickemPoolParty {
  mode: 'nba_free_agency';
  for: NbaFreeAgencyPickemFor;
  leaderboard: { [key: string]: number }
}

export interface GolfMajorPickemParty extends BasePickemPoolParty {
  mode: 'golf_major';
  for: GolfMajorPickemFor;
}

interface BaseBingoballPoolParty extends BasePoolParty {
  type: 'bingoball';
}

export interface NbaBingoballParty extends BaseBingoballPoolParty {
  mode: 'nba';
  for: NbaBingoballFor;
}

interface BaseBoxesPoolParty extends BasePoolParty {
  type: 'boxes';
}

export interface NflBoxesParty extends BaseBoxesPoolParty {
  mode: 'nfl';
  for: NflBoxesFor;
}

export type PoolParty = NbaFreeAgencyPickemParty | GolfMajorPickemParty | NbaBingoballParty | NflBoxesParty;
