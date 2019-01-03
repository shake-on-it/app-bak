import React from 'react';
import { StackedPage } from '@makes-apps/lib';

import { PoolGame } from '../../store/pools';
import { User } from '../../store/users';

import BritishOpen2019 from './british_open_2019';
import GameManager from './game_manager';
import Masters2019 from './masters_2019';

interface Props {
  games: PoolGame[];
  savePoolGame: (game: PoolGame) => any;
  user: User;
}

type View = 'games' | 'british_open_2019' | 'masters_2019';

const MeControls = ({ games, savePoolGame, user }: Props) => {
  const [view, setView] = React.useState('masters_2019' as View);

  const britishOpenGame: any = games.find(game => game.for === 'british_open_2019');
  const mastersGame: any = games.find(game => game.for === 'masters_2019');

  return (
    <StackedPage
      title="Welcome me"
      menu={[
        { type: 'view', display: 'game manager', view: 'games' },
        { type: 'view', display: 'masters 2019', view: 'masters_2019' },
        { type: 'view', display: 'british open 2019', view: 'british_open_2019' },
      ]}
      activeView={view}
      setView={(view = 'games') => setView(view)}
    >
      {view === 'british_open_2019' && <BritishOpen2019 game={britishOpenGame} savePoolGame={savePoolGame} />}
      {view === 'games' && <GameManager games={games} savePoolGame={savePoolGame} user={user} />}
      {view === 'masters_2019' && <Masters2019 game={mastersGame} savePoolGame={savePoolGame} />}
    </StackedPage>
  );
};

export default MeControls;
