import { BaseCrudState } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

interface BaseBet {
  _id?: BSON.ObjectId;
  proposer: string;
  acceptor?: string;
  note?: string;
}

export interface MatchupBet extends BaseBet {
  type: 'matchup';
}

export interface OddsBet extends BaseBet {
  type: 'odds';
}

export type Bet = MatchupBet | OddsBet;

export class State extends BaseCrudState<Bet> {
  static NAMESPACE = 'bets';

  constructor() {
    super();
  }
}
