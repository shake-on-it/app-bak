import React from 'react';
import { styled, styles, Heading, Spacing, Text } from '@makes-apps/lib';
import moment from 'moment';

import { Golfer, GolfMajorPickemEntry, GolfMajorPickemGame, GolfMajorPickemParty } from '../../../../store/pools';
import { User } from '../../../../store/users';

import ScoresByGolfer from './scores_by_golfer';
import ScoresByUser from './scores_by_user';
import WinningsByUser from './winnings_by_user';
import { parseRank } from './utils';

interface Props {
  lastGameRefresh?: Date;
  poolEntries: GolfMajorPickemEntry[];
  poolGame: GolfMajorPickemGame;
  poolParty: GolfMajorPickemParty;
  users: { [key: string]: User };
}

const Headline = styled(Spacing)<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    })
  )
);

const PoolEntry = ({ lastGameRefresh, poolEntries, poolGame, users }: Props) => {
  const hasStarted = moment(poolGame.event_start).isBefore(moment.now());

  if (!poolGame || !poolEntries || poolEntries.length === 0) {
    return <>loading...</>;
  }
  const golfersByKey = poolGame.field.reduce(
    (acc, golfer) => ({
      ...acc,
      [golfer.key]: golfer,
    }),
    {} as { [key: string]: Golfer }
  );

  const poolEntriesByGolfer = poolEntries.reduce(
    (outer, entry) => {
      return {
        ...outer,
        ...(entry.picks || []).reduce(
          (inner, golfer) => ({
            ...inner,
            [golfer.key]: (outer[golfer.key] || []).concat(entry),
          }),
          {} as { [key: string]: GolfMajorPickemEntry[] }
        ),
      };
    },
    {} as { [key: string]: GolfMajorPickemEntry[] }
  );
  const rankAmateurs = Object.keys(poolGame.results).reduce(
    (acc, key) => {
      const { amateur } = golfersByKey[key];
      const { rank = '' } = poolGame.results[key];
      return { ...acc, [rank]: (acc[rank] || 0) + (amateur ? 1 : 0) };
    },
    {} as { [key: string]: number }
  );
  const rankCounts = Object.keys(poolGame.results).reduce(
    (acc, key) => {
      const { rank = '' } = poolGame.results[key];
      return { ...acc, [rank]: (acc[rank] || 0) + 1 };
    },
    {} as { [key: string]: number }
  );

  let passedCutLine = false;
  let passedCutFirst10Line = false;
  let passedCutNext20Line = false;
  let madeCutCount = 0;
  let first10MissedCutCount = 0;
  let next20MissedCutCount = 0;
  let restMissedCutCount = 0;
  let cutLine = '';

  const payouts = Object.keys(rankCounts)
    .map(rank => ({ rank, place: parseRank(rank) }))
    .sort((o1, o2) => o1.place - o2.place)
    .reduce(
      (acc, { rank, place }) => {
        const count = rankCounts[rank];

        const extraPayouts: { place: number; amount: number }[] = [];

        if (passedCutLine) {
          if (!passedCutFirst10Line) {
            first10MissedCutCount += count;
          }

          if (passedCutFirst10Line && !passedCutNext20Line) {
            next20MissedCutCount += count;
          }

          if (passedCutFirst10Line && passedCutNext20Line) {
            restMissedCutCount += count;
          }

          for (let i = 1; i <= count; i++) {
            extraPayouts.push({
              place: madeCutCount + first10MissedCutCount + next20MissedCutCount + restMissedCutCount - count + i,
              amount: !passedCutFirst10Line ? 7500 : !passedCutNext20Line ? 6000 : 5000,
            });
          }

          if (first10MissedCutCount >= 10) {
            passedCutFirst10Line = true;
          }

          if (next20MissedCutCount >= 20) {
            passedCutNext20Line = true;
          }
        }

        if (!passedCutLine) {
          madeCutCount += count;

          if (madeCutCount >= 70) {
            passedCutLine = true;
            cutLine = rank;

            for (let i = 1; i < madeCutCount - 69; i++) {
              extraPayouts.push({ place: 70 + i, amount: Math.max(13500, 24750 - 125 * i) });
            }
          }
        }

        const places: { [key: number]: boolean } = {};
        for (let i = place; i < place + count; i++) {
          places[i] = true;
        }

        const effPayouts = poolGame.payouts ? [...poolGame.payouts, ...extraPayouts] : [{ place: 0, amount: 0 }];

        const totalPayout = effPayouts
          .filter(payout => places[payout.place])
          .reduce((tot, { amount }) => tot + amount, 0);

        return { ...acc, [rank]: totalPayout / (count - (passedCutLine ? 0 : rankAmateurs[rank])) };
      },
      {} as { [key: string]: number }
    );

  return (
    <>
      <Headline top size="mega" bottom={false}>
        <Heading color="primary" noMargin>
          The Pool Leaderboard
        </Heading>
        <Text color="secondary" noMargin>
          {`Last Update: ${(lastGameRefresh || new Date()).toLocaleString()}`}
        </Text>
      </Headline>
      {!hasStarted && <Text>once the tournament begins, this page will be updated</Text>}
      {hasStarted && (
        <>
          {poolGame.event_done && (
            <WinningsByUser
              eventDone={poolGame.event_done}
              poolEntries={poolEntries}
              poolEntriesByGolfer={poolEntriesByGolfer}
              results={poolGame.results}
              users={users}
            />
          )}
          {!poolGame.event_done && (
            <ScoresByUser
              eventDone={poolGame.event_done}
              payouts={payouts}
              poolEntries={poolEntries}
              poolEntriesByGolfer={poolEntriesByGolfer}
              results={poolGame.results}
              users={users}
            />
          )}
          <Headline top size="mega" bottom={false}>
            <Heading color="primary" noMargin>
              The Open Leaderboard
            </Heading>
            <Text color="secondary" noMargin>
              {`Projected Cut: ${cutLine}`}
            </Text>
          </Headline>
          <ScoresByGolfer
            eventDone={poolGame.event_done}
            golfersByKey={golfersByKey}
            payouts={payouts}
            poolEntriesByGolfer={poolEntriesByGolfer}
            results={poolGame.results}
          />
        </>
      )}
    </>
  );
};

export default PoolEntry;
