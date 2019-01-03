import { PoolEntry } from './entry';
import { PoolGame } from './game';
import { PoolParty } from './party';

export class State {
  static NAMESPACE = 'pools';

  constructor(
    public entries: { [key: string]: PoolEntry } = {},
    public games: { [key: string]: PoolGame } = {},
    public parties: { [key: string]: PoolParty } = {},
    public lastGameRefresh: Date | undefined = undefined
  ) {}
}
