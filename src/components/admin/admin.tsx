import React from 'react';
import { StackedPage } from '@makes-apps/lib';

import { User } from '../../store/users';

import { userDisplay } from './util';

interface Props {
  user: User;
}

const AdminControls = ({ user }: Props) => (
  <StackedPage title={`Welcome ${userDisplay(user)}`}>this is the admin page</StackedPage>
);

export default AdminControls;
