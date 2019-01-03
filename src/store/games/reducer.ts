import { makesSliceReducer } from '@makes-apps/lib';

import * as actions from './actions';
import { State } from './types';

export default makesSliceReducer(State.NAMESPACE, new State(), actions);
