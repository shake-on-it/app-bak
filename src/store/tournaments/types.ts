import { BaseCrudState } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

interface BaseTournament<PLAYER extends Player> {
  _id?: BSON.ObjectId;
  field: PLAYER[];
}

export interface MastersTournament extends BaseTournament<MastersPlayer> {
  key: 'masters_2019';
}

export interface BingoballTournament extends BaseTournament<BingoballPlayer> {
  key: 'nba_201819';
}

export type Tournament = MastersTournament | BingoballTournament;

interface BasePlayer {
  id: string;
  first_name: string;
  last_name: string;
}

export interface MastersPlayer extends BasePlayer {
  type: 'masters';
  countryName: string;
  countryCode: string;
  Amateur: string;
  First: string;
  Past: string;
  image: boolean;
}

export interface BingoballPlayer extends BasePlayer {
  type: 'bingoball';
}

export type Player = MastersPlayer | BingoballPlayer;

export class State extends BaseCrudState<Tournament> {
  static NAMESPACE = 'tournaments';

  constructor() {
    super();
  }
}
