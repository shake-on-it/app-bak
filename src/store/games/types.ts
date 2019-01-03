import { BaseCrudState } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

interface BaseGame<ENTRY extends BaseEntry<any>> {
  _id?: BSON.ObjectId;
  type: 'golf_pickem' | 'bingoball';
  key: string;
  host: string;
  name: string;
  note?: string;
  entries: ENTRY[];
}

interface BaseEntry<PICK> {
  owner: string;
  score: number;
  picks: PICK[];
}

export interface GolfPickemEntry extends BaseEntry<string> {}

export interface BingoballEntry extends BaseEntry<never> {}

export type Entry = GolfPickemEntry | BingoballEntry;

export interface GolfPickemGame extends BaseGame<GolfPickemEntry> {
  type: 'golf_pickem';
}

export interface BingoballGame extends BaseGame<BingoballEntry> {
  type: 'bingoball';
}

export type Game = GolfPickemGame | BingoballGame;

export class State extends BaseCrudState<Game> {
  static NAMESPACE = 'games';

  constructor() {
    super();
  }
}
