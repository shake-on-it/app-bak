import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouterActions, StackedPage } from '@makes-apps/lib';
import { Location } from 'history';
import { AppState } from '../app';
import { FileCabinet, Id, UsersPageList, UsersPageProfile } from '../components';
import { find as findUsers, update as updateUsers, User, userId } from '../store/users';
import urls from '../urls';

const PATH_PREFIX = '/users/';

interface Props {
  location: Location;
  user?: User;
  users: { [key: string]: User };
  goto: (path: string) => void;
  listUsers: () => Promise<User[]>;
  updateUser: (filter: {}, update: {}, options: {}) => Promise<void>;
}

type View = 'list' | 'single';

const initialState = {
  view: 'list' as View,
};
type State = typeof initialState;

class UsersPage extends React.Component<Props, State> {
  readonly state = initialState;

  componentDidMount() {
    this.props.listUsers();
  }

  setView = (view: View = 'list') => this.setState(() => ({ view }));

  render() {
    const { goto, location, user, users, updateUser } = this.props;
    const { view } = this.state;
    const viewUser = location.pathname.indexOf(PATH_PREFIX) >= 0;
    return (
      <StackedPage
        menu={[
          { type: 'link', view: 'list', to: urls.users().url(), display: <FileCabinet /> },
          {
            type: 'link',
            view: 'single',
            to: user
              ? urls
                  .users()
                  .profile(userId(user))
                  .url()
              : urls.users().url(),
            display: <Id />,
          },
        ]}
        activeView={view}
        setView={this.setView}
      >
        {!viewUser && <UsersPageList user={user} users={users} goto={goto} />}
        {viewUser && <UsersPageProfile location={location} users={users} updateUser={updateUser} />}
      </StackedPage>
    );
  }
}

const mapStateToProps = ({ auth, users, router }: AppState) => ({
  location: router.location,
  user: auth.user,
  users: users.db,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  goto: (path: string) => dispatch(RouterActions.goto.creator.worker(path)),
  listUsers: () => dispatch(findUsers.creator.worker({})),
  updateUser: (filter: {}, update: {}, options: {}) => dispatch(updateUsers.creator.worker(filter, update, options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
