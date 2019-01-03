import React from 'react';
import {} from '@makes-apps/lib';

import { GolfMajorPickemEntry, GolfMajorPickemGame, GolfMajorPickemParty } from '../../store/pools';

interface Props {
  poolEntries: GolfMajorPickemEntry[];
  poolGame: GolfMajorPickemGame;
  poolParty: GolfMajorPickemParty;
}

const PoolEntry = ({  }: Props) => {
  return <>this will have golf major related stuff with it</>;
};

export default PoolEntry;
