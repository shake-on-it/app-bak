export type PoolType = 'pickem' | 'bingoball' | 'boxes';

export type PickemMode = 'nba_free_agency' | 'golf_major';

export type NbaFreeAgencyPickemFor = 'nba_2019';

export type GolfMajorPickemFor = 'masters_2019' | 'british_open_2019';

export type BingoballMode = 'nba';

export type NbaBingoballFor = 'nba_2018_19';

export type BoxesMode = 'nfl';

export type NflBoxesFor = 'super_bowl_2018_19';

export interface NbaFreeAgencyPickemMeta {
  type: 'pickem';
  mode: 'nba_free_agency';
  for: NbaFreeAgencyPickemFor;
}

export interface FreeAgencyPick {
  name: string;
  team: string;
  score: number;
}

export interface FreeAgencyPlayer {
  name: string;
  team: string;
  note?: string;
}

export interface FreeAgencyResult {
  team: string;
  contract?: string;
}

export interface GolfMajorPickemMeta {
  type: 'pickem';
  mode: 'golf_major';
  for: GolfMajorPickemFor;
}

export interface Golfer {
  key: string;
  name: string;
  country: string;
  amateur?: boolean;
}

export interface GolferPayout {
  place: number;
  amount: number;
}

export interface GolferResult {
  rank?: string;
  score: string;
  today: { score: string; thru: string };
  rounds: { 1: number; 2: number; 3?: number; 4?: number };
  winnings?: number;
}

export interface NbaBingoballMeta {
  type: 'bingoball';
  mode: 'nba';
  for: NbaBingoballFor;
}

export interface NflBoxesMeta {
  type: 'boxes';
  mode: 'nfl';
  for: NflBoxesFor;
}

export type PoolMeta = NbaFreeAgencyPickemMeta | GolfMajorPickemMeta | NbaBingoballMeta | NflBoxesMeta;

export const poolMeta: {
  pickem: {
    nba_free_agency: (_for: NbaFreeAgencyPickemFor) => NbaFreeAgencyPickemMeta;
    golf_major: (_for: GolfMajorPickemFor) => GolfMajorPickemMeta;
  };
  bingoball: {
    nba: (_for: NbaBingoballFor) => NbaBingoballMeta;
  };
  boxes: {
    nfl: (_for: NflBoxesFor) => NflBoxesMeta;
  };
} = {
  pickem: {
    nba_free_agency: (_for: NbaFreeAgencyPickemFor) => ({ type: 'pickem', mode: 'nba_free_agency', for: _for }),
    golf_major: (_for: GolfMajorPickemFor) => ({ type: 'pickem', mode: 'golf_major', for: _for }),
  },
  bingoball: {
    nba: (_for: NbaBingoballFor) => ({ type: 'bingoball', mode: 'nba', for: _for }),
  },
  boxes: {
    nfl: (_for: NflBoxesFor) => ({ type: 'boxes', mode: 'nfl', for: _for }),
  },
};

export const poolFors: {
  pickem: {
    nba_free_agency: NbaFreeAgencyPickemFor[];
    golf_major: GolfMajorPickemFor[];
  };
  bingoball: {
    nba: NbaBingoballFor[];
  };
  boxes: {
    nfl: NflBoxesFor[];
  };
} = {
  pickem: {
    nba_free_agency: ['nba_2019'],
    golf_major: ['masters_2019', 'british_open_2019'],
  },
  bingoball: {
    nba: ['nba_2018_19'],
  },
  boxes: {
    nfl: ['super_bowl_2018_19'],
  },
};
