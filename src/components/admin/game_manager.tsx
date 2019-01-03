import React from 'react';
import { Button, ButtonGroup, DataTable, Heading, Spacing, Subheading, Text, Wrapping } from '@makes-apps/lib';

import { PoolGame } from '../../store/pools';
import { User } from '../../store/users';

import GameForm from './game_form';
import { userDisplay } from './util';

interface Props {
  games: PoolGame[];
  savePoolGame: (game: PoolGame) => any;
  user: User;
}

const GameManager = ({ games, savePoolGame, user }: Props) => {
  const [game, setGame] = React.useState(undefined as Partial<PoolGame> | undefined);
  return (
    <>
      <Subheading color="secondary">game manager</Subheading>
      <ButtonGroup align="center">
        <Button as="button" onClick={() => setGame({})}>
          New Game
        </Button>
        <Button as="button" onClick={() => setGame(undefined)} disabled={!game}>
          Clear
        </Button>
      </ButtonGroup>
      <DataTable
        columns={[
          { header: 'type' },
          { header: 'mode' },
          { header: 'for' },
          { header: 'open', render: ({ value }) => JSON.stringify(value) },
          { header: 'active', render: ({ value }) => JSON.stringify(value) },
        ]}
        data={games}
        onRowClick={game => setGame(game)}
      />
      {game && <GameForm game={game} savePoolGame={savePoolGame} />}
      <Spacing top size="mega">
        <Wrapping>
          <Heading as="h6">{`User Info: ${userDisplay(user)}`}</Heading>
          <Text as="pre">{JSON.stringify(user, null, 2)}</Text>
        </Wrapping>
      </Spacing>
    </>
  );
};

export default GameManager;
