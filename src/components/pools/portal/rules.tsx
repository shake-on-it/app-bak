import React from 'react';

import { Heading, Spacing, Text } from '@makes-apps/lib';

import { PoolGame } from '../../../store/pools';

import { isGolfGame, isNbaFaGame } from '../utils';

interface Props {
  poolGame: PoolGame;
}

const rules = (game: PoolGame) => {
  if (isGolfGame(game)) {
    return (
      <>
        <Text>Fill out an entry by picking 5 golfers who are competing in the tournament</Text>
        <Text>
          The goal of the game is to accrue the most combined winnings amongst your 5 golfers at the end of the
          tournament
        </Text>
        <Text>
          If you have picked the same golfer as any other entrant, then you must share the total winnings for that
          golfer evenly
        </Text>
      </>
    );
  }

  if (isNbaFaGame(game)) {
    return (
      <>
        <Text>Fill out an entry by predicting the NBA team where each free agent will sign with</Text>
        <Text>
          Assign a "confidence score" to each prediction ... these scores can only be used once across all of your picks
        </Text>
        <Text>
          If your prediction is correct you will the number of points equivalent to your assigned confidence value
        </Text>
        <Text>The entry with the most combined points wins</Text>
      </>
    );
  }

  return 'here be the rules...';
};

const Rules = ({ poolGame }: Props) => (
  <Spacing top size="mega">
    <Heading as="h2" color="secondary" align="center" noMargin>
      How Do I Play?
    </Heading>
    {rules(poolGame)}
  </Spacing>
);

export default Rules;
