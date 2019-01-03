import React from 'react';
import { connect } from 'react-redux';
import { RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import { AppState } from '../app';

import { findAllGames, savePoolGame, PoolGame } from '../store/pools';
import { User } from '../store/users';

import { MeControls, AdminControls, UserControls } from '../components';

interface StateProps {
  games: PoolGame[];
  user?: User;
}

interface DispatchProps {
  findAllGames: () => Promise<PoolGame[]>;
  savePoolGame: (game: PoolGame) => Promise<RemoteUpdateResult>;
}

type Props = StateProps & DispatchProps;

class AdminPage extends React.Component<Props> {
  componentDidMount() {
    this.props.findAllGames();
  }

  render() {
    const { games, savePoolGame, user } = this.props;

    if (!user) {
      return 'loading...';
    }

    switch (user.type) {
      case 'me':
        return <MeControls games={games} savePoolGame={savePoolGame} user={user} />;
      case 'admin':
        return <AdminControls user={user} />;
      case 'user':
        return <UserControls user={user} />;
    }

    return 'reading user permissions';
  }
}

const mapStateToProps = ({ auth, pools }: AppState) => ({
  games: Object.values(pools.games),
  user: auth.user,
});

const mapDispatchToProps = {
  findAllGames: findAllGames.creator.worker,
  savePoolGame: savePoolGame.creator.worker,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
