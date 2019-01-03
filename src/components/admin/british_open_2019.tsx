import React from 'react';
import { Form, FormControl, FormInput, FormLabel } from '@makes-apps/lib';

import { Golfer, GolfMajorPickemGame } from '../../store/pools';

interface Props {
  game: GolfMajorPickemGame;
  savePoolGame: (game: GolfMajorPickemGame) => Promise<any>;
}

const BritishOpen2019 = ({ game, savePoolGame }: Props) => {
  if (!game) {
    return <>loading...</>;
  }

  const golfers = game.field.reduce(
    (acc, golfer) => ({
      ...acc,
      [golfer.key]: golfer,
    }),
    {} as { [key: string]: Golfer }
  );

  const scores = Object.entries(game.results)
    .map(([key, { rank, score, today, rounds, winnings }]) => ({
      key,
      name: golfers[key].name,
      winnings,
      rank,
      score,
      today: today.score ? `${today.score}${today.thru.indexOf('F') < 0 ? ` (${today.thru})` : ''}` : '--',
      r1: rounds[1],
      r2: rounds[2],
      r3: rounds[3] || '--',
      r4: rounds[4] || '--',
    }))
    .sort((o1, o2) => {
      if (o1.rank && o2.rank) {
        const rank1 = o1.rank.indexOf('T') < 0 ? parseInt(o1.rank) : parseInt(o1.rank.substring(1));
        const rank2 = o2.rank.indexOf('T') < 0 ? parseInt(o2.rank) : parseInt(o2.rank.substring(1));
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
    <Form
      initialForm={scores.reduce((acc, { key }) => ({ ...acc, [key]: 0 }), {} as any)}
      onSubmit={({ data }) =>
        savePoolGame({
          ...game,
          results: Object.keys(game.results).reduce(
            (acc, key) => ({ ...acc, [key]: { ...game.results[key], winnings: data[key] } }),
            {}
          ),
        })
      }
      footer={{ primary: {} }}
    >
      {({ data, setFormField }) => (
        <>
          {scores.map(({ key, name }) => (
            <FormControl key={key}>
              <FormLabel>{name}</FormLabel>
              <FormInput value={data[key]} onChange={e => setFormField(key, e.target.value)} />
            </FormControl>
          ))}
        </>
      )}
    </Form>
  );
}

export default BritishOpen2019;
