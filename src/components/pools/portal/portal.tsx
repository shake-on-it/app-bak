import React from 'react';
import {} from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { PoolEntry, PoolGame, PoolParty } from '../../../store/pools';
import { User } from '../../../store/users';

import Jumbotron from './jumbotron';
import RollCall from './roll_call';
import Rules from './rules';
import Status from './status';

interface Props {
  createPoolEntry: (entry: PoolEntry) => Promise<any>;
  poolGame: PoolGame;
  poolParty: PoolParty;
  poolEntries: { [key: string]: PoolEntry[] };
  removePoolEntry: (id: BSON.ObjectId) => Promise<any>;
  user: User;
  users: { [key: string]: User };
}

const PoolPortal = ({ poolGame, poolParty, users }: Props) => (
  <>
    <Status poolGame={poolGame} />
    <Jumbotron poolGame={poolGame} poolParty={poolParty} />
    <RollCall users={Object.values(users)} />
    <Rules poolGame={poolGame} />
  </>
);

export default PoolPortal;
