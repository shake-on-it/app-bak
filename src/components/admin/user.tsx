import React from 'react';
import { StackedPage, Text, YogiFactory } from '@makes-apps/lib';

import { User } from '../../store/users';

import { userDisplay } from './util';

interface Props {
  user: User;
}

const UserControls = ({ user }: Props) => (
  <StackedPage title={YogiFactory()}>
    <Text>{`nice try ${userDisplay(user)}...`}</Text>
  </StackedPage>
);

export default UserControls;
