import { makesAuthReducer } from '@makes-apps/lib';

import { User } from '../users';

import * as actions from './actions';

export default makesAuthReducer<User>(actions);
