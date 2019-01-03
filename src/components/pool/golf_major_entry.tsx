import React from 'react';
import { Text } from '@makes-apps/lib';

import { GolfMajorPickemEntry, GolfMajorPickemGame, GolfMajorPickemParty } from '../../store/pools';

interface Props {
  modifyPoolEntry: (entry: GolfMajorPickemEntry) => Promise<any>;
  poolEntry: GolfMajorPickemEntry;
  poolGame: GolfMajorPickemGame;
  poolParty: GolfMajorPickemParty;
}

const PoolEntry = ({ poolEntry }: Props) => {
  return <Text as="pre">{JSON.stringify(poolEntry, null, 2)}</Text>;
};

export default PoolEntry;
