import { BaseCrudState } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

export interface MastersScores {
  _id?: BSON.ObjectId;
  key: string;
  currentRound: string;
  cutLine?: string;
  yardages: {
    round1: number[];
    round2: number[];
    round3: number[];
    round4: number[];
  },
  pars: {
    round1: number[];
    round2: number[];
    round3: number[];
    round4: number[];
  },
  player: MastersPlayerScore[];
}

export interface MastersPlayerScore {
  id: string;
  display_name: string;
  display_name2: string;
  first_name: string;
  last_name: string;
  countryName: string;
  countryCode: string;
  live?: string;
  video: boolean;
  pos?: string;
  image: boolean;
  amateur: boolean;
  past: boolean;
  firsttimer: boolean;
  status: string;
  active: boolean;
  us: boolean;
  teetime: string;
  tee_order: string;
  sort_order: string;
  start: string;
  group: string;
  today?: string;
  thru?: string;
  groupHistory: string;
  thruHistory: string;
  lastHoleWithShot: string;
  holeProgress: number;
  topar?: string;
  total?: string;
  totalUnderPar: string;
  movement?: string;
  r1: string;
  round1: MastersPlayerRound;
  r2: string;
  round2: MastersPlayerRound;
  r3: string;
  round3: MastersPlayerRound;
  r4: string;
  round4: MastersPlayerRound;
}

export interface MastersPlayerRound {
  prior?: any;
  total?: any;
  scores: any[];
  video: any[]
}

export class State extends BaseCrudState<MastersScores> {
  static NAMESPACE = 'scores';

  constructor() {
    super();
  }
}
