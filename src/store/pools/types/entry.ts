import { BSON } from 'mongodb-stitch-browser-sdk';

import {
  FreeAgencyPick,
  Golfer,
  GolfMajorPickemFor,
  NbaBingoballFor,
  NbaFreeAgencyPickemFor,
  NflBoxesFor,
} from './meta';

interface BasePoolEntry {
  _id?: BSON.ObjectId;
  party_id: BSON.ObjectId;
  email: string;
  name: string;
}

interface BasePickemPoolEntry extends BasePoolEntry {
  type: 'pickem';
}

export interface NbaFreeAgencyPickemEntry extends BasePickemPoolEntry {
  mode: 'nba_free_agency';
  for: NbaFreeAgencyPickemFor;
  picks: FreeAgencyPick[];
}

export interface GolfMajorPickemEntry extends BasePickemPoolEntry {
  mode: 'golf_major';
  for: GolfMajorPickemFor;
  picks: Golfer[];
}

interface BaseBingoballPoolEntry extends BasePoolEntry {
  type: 'bingoball';
}

export interface NbaBingoballEntry extends BaseBingoballPoolEntry {
  mode: 'nba';
  for: NbaBingoballFor;
}

interface BaseBoxesPoolEntry extends BasePoolEntry {
  type: 'boxes';
}

export interface NflBoxesEntry extends BaseBoxesPoolEntry {
  mode: 'nfl';
  for: NflBoxesFor;
}

export type PoolEntry = NbaFreeAgencyPickemEntry | GolfMajorPickemEntry | NbaBingoballEntry | NflBoxesEntry;
