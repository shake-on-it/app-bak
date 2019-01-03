import React from 'react';
import { DataTable } from '@makes-apps/lib';

import { GolferResult, GolfMajorPickemEntry } from '../../../../store/pools';
import { User } from '../../../../store/users';

import { calculateWinnings } from './utils';

interface Props {
  eventDone?: boolean;
  poolEntries: GolfMajorPickemEntry[];
  poolEntriesByGolfer: { [key: string]: GolfMajorPickemEntry[] };
  results: { [key: string]: GolferResult };
  users: { [key: string]: User };
}

const ScoresByUser = ({ eventDone, poolEntries, poolEntriesByGolfer, results, users }: Props) => {
  if (!results) {
    return <>results are not yet available</>;
  }

  const calculatePayout = (key: string) => (results[key].winnings || 0) / poolEntriesByGolfer[key].length;

  return (
    <DataTable
      columns={[
        { header: 'name' },
        { header: eventDone ? 'score' : 'projected score', accessor: 'score', align: 'center' }, // { header: poolGame.event_done ? 'winnings' : 'projected winnings', accessor: 'winnings' },
        { header: 'golfer #1', accessor: 'g0', whiteSpace: 'pre-line' },
        { header: 'golfer #2', accessor: 'g1', whiteSpace: 'pre-line' },
        { header: 'golfer #3', accessor: 'g2', whiteSpace: 'pre-line' },
        { header: 'golfer #4', accessor: 'g3', whiteSpace: 'pre-line' },
        { header: 'golfer #5', accessor: 'g4', whiteSpace: 'pre-line' },
      ]}
      data={poolEntries
        .map(({ email, picks = [] }) => {
          const user = users[email];
          return {
            name: `${user.firstName} ${user.lastName}`,
            score: picks.map(({ key }) => calculatePayout(key)).reduce((tot, winnings) => tot + winnings, 0),
            ...picks
              .sort((p1, p2) => calculatePayout(p2.key) - calculatePayout(p1.key))
              .reduce(
                (acc, pick, i) => ({
                  ...acc,
                  [`g${i}`]: `${pick.name}\n${calculateWinnings(
                    results[pick.key].winnings || 0,
                    poolEntriesByGolfer[pick.key].length
                  )}`,
                }),
                {} as { [key: string]: string }
              ),
          };
        })
        .sort((o1, o2) => o2.score - o1.score)
        .map(({ score, ...rest }) => ({
          ...rest,
          score: `$${score.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        }))}
    />
  );
};

export default ScoresByUser;
