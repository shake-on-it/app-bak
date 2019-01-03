import { BSON } from 'mongodb-stitch-browser-sdk';

import {
  FreeAgencyPlayer,
  FreeAgencyResult,
  Golfer,
  GolferPayout,
  GolferResult,
  GolfMajorPickemFor,
  NbaBingoballFor,
  NbaFreeAgencyPickemFor,
  NflBoxesFor,
} from './meta';

interface BasePoolGame {
  _id?: BSON.ObjectId;
  event_start: Date;
  event_done?: boolean;
}

interface BasePickemPoolGame extends BasePoolGame {
  type: 'pickem';
}

export interface NbaFreeAgencyPickemGame extends BasePickemPoolGame {
  mode: 'nba_free_agency';
  for: NbaFreeAgencyPickemFor;
  field: FreeAgencyPlayer[];
  signings: { [key: string]: FreeAgencyResult };
}

export interface GolfMajorPickemGame extends BasePickemPoolGame {
  mode: 'golf_major';
  for: GolfMajorPickemFor;
  field: Golfer[];
  results: { [key: string]: GolferResult };
  payouts?: GolferPayout[];
}

interface BaseBingoballPoolGame extends BasePoolGame {
  type: 'bingoball';
}

export interface NbaBingoballGame extends BaseBingoballPoolGame {
  mode: 'nba';
  for: NbaBingoballFor;
}

interface BaseBoxesPoolGame extends BasePoolGame {
  type: 'boxes';
}

export interface NflBoxesGame extends BaseBoxesPoolGame {
  mode: 'nfl';
  for: NflBoxesFor;
}

export type PoolGame = NbaFreeAgencyPickemGame | GolfMajorPickemGame | NbaBingoballGame | NflBoxesGame;
