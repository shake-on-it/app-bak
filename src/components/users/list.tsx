import React from 'react';
import { DataTable } from '@makes-apps/lib';

import { User, userId } from '../../store/users';
import urls from '../../urls';

interface Props {
  user?: User;
  users: { [key: string]: User };
  goto: (path: string) => void;
}

const UsersList = ({ goto, user, users }: Props) => (
  <DataTable
    fluid
    columns={[{ header: 'firstName' }, { header: 'lastName' }]}
    data={Object.keys(users).map(userId => users[userId])}
    onRowClick={(u, e) => {
      e.preventDefault();
      if (user && userId(u) === userId(user)) {
        goto(
          urls
            .users()
            .profile(userId(u))
            .url()
        );
      }
    }}
  />
);

export default UsersList;
