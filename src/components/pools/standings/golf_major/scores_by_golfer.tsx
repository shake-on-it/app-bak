import React from 'react';
import { DataTable } from '@makes-apps/lib';

import { Golfer, GolferResult, GolfMajorPickemEntry } from '../../../../store/pools';

import { calculateWinnings, parseRank } from './utils';

interface Props {
  eventDone?: boolean;
  golfersByKey: { [key: string]: Golfer };
  payouts: { [key: string]: number };
  poolEntriesByGolfer: { [key: string]: GolfMajorPickemEntry[] };
  results: { [key: string]: GolferResult };
}

const ScoresByGolfer = ({ eventDone, golfersByKey, payouts, poolEntriesByGolfer, results }: Props) => {
  if (!results) {
    return <>results are not yet available</>;
  }

  const data = Object.entries(results)
    .map(([key, { rank = '', score, today, rounds, winnings }]) => {
      const { name, amateur } = golfersByKey[key];
      return {
        name: `${name}${amateur ? ' (a)' : ''}`,
        winnings: amateur ? '$0.00' : calculateWinnings(winnings || payouts[rank], (poolEntriesByGolfer[key] || []).length),
        rank,
        score,
        today: today.score ? `${today.score}${today.thru.indexOf('F') < 0 ? ` (${today.thru})` : ''}` : '--',
        r1: rounds[1],
        r2: rounds[2],
        r3: rounds[3] || '--',
        r4: rounds[4] || '--',
      };
    })
    .sort((o1, o2) => {
      if (o1.rank && o2.rank) {
        const rank1 = parseRank(o1.rank);
        const rank2 = parseRank(o2.rank);
        return rank1 - rank2;
      }
      if (o1.rank) {
        return -1;
      }
      if (o2.rank) {
        return 1;
      }

      return o1.r1 + o1.r2 - (o2.r1 + o2.r2);
    });

  return (
    <DataTable
      columns={[
        { header: eventDone ? 'winnings' : 'projected winnings', accessor: 'winnings' },
        { header: 'rank', width: 10 },
        { header: 'name' },
        { header: 'score', width: 10 },
        { header: 'today', width: 10 },
        { header: 'r1', width: 10 },
        { header: 'r2', width: 10 },
        { header: 'r3', width: 10 },
        { header: 'r4', width: 10 },
      ]}
      data={data}
    />
  );
};

export default ScoresByGolfer;
