import { makesSliceReducer } from '@makes-apps/lib';

import * as actions from './actions';
import { NAMESPACE, State } from './types';

export default makesSliceReducer(NAMESPACE, new State(), actions);
