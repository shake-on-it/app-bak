import React from 'react';
import { DataTable, Heading, Spacing, Text } from '@makes-apps/lib';

import { NbaFreeAgencyPickemEntry, NbaFreeAgencyPickemGame, NbaFreeAgencyPickemParty } from '../../../../store/pools';

interface Props {
  lastGameRefresh?: Date;
  poolEntries: NbaFreeAgencyPickemEntry[];
  poolGame: NbaFreeAgencyPickemGame;
  poolParty: NbaFreeAgencyPickemParty;
}

const calculateScore = (game: NbaFreeAgencyPickemGame, entry: NbaFreeAgencyPickemEntry) => {
  return entry.picks.reduce((total, { name, team, score }) => {
    const signing = game.signings[name];
    if (signing.team == team) {
      return total + score;
    }
    return total;
  }, 0);
};

const PoolEntry = ({ lastGameRefresh, poolEntries, poolGame, poolParty }: Props) => {
  if (!poolGame.signings || Object.keys(poolGame.signings).length === 0) {
    return <>standings are unavailable at this time</>;
  }

  const entriesById = poolEntries.reduce(
    (acc, entry) => ({
      ...acc,
      [entry._id.toHexString()]: entry,
    }),
    {} as { [key: string]: NbaFreeAgencyPickemEntry }
  );

  let data: { player: string; score: number }[];
  if (poolParty.leaderboard) {
    data = Object.keys(poolParty.leaderboard).map(entryId => ({
      player: entriesById[entryId].name,
      score: poolParty.leaderboard[entryId],
    }));
  } else {
    data = poolEntries.map(entry => ({
      player: entry.name,
      score: calculateScore(poolGame, entry),
    }));
  }

  return (
    <>
      <Text color="secondary">{`last updated: ${(lastGameRefresh || new Date()).toLocaleString()}`}</Text>
      <Spacing top size="mega">
        <Heading color="primary">Standings</Heading>
      </Spacing>
      <DataTable
        fluid
        columns={[{ header: 'player', whiteSpace: 'nowrap' }, { header: 'score', align: 'center' }]}
        data={data}
      />
      <DataTable
        fluid
        columns={[
          { header: 'player', whiteSpace: 'nowrap' },
          ...poolEntries.reduce((arr, { email, name }) => [...arr, { header: name, accessor: email }], [] as any),
        ]}
        data={poolGame.field.map(({ name }) => {
          const picks = poolEntries.reduce(
            (acc, { email, picks }) => {
              const pick = picks.find(pick => pick.name === name) || { team: '', score: 0 };
              return {
                ...acc,
                [email]: `${pick.team} (${pick.score})`,
              };
            },
            {} as { [key: string]: string }
          );
          return {
            player: name,
            ...poolEntries.reduce(
              (acc, { email }) => ({
                ...acc,
                [email]: picks[email],
              }),
              {}
            ),
          };
        })}
      />
    </>
  );
};

export default PoolEntry;
